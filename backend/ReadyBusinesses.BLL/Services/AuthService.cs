using Microsoft.Extensions.Configuration;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Auth;
using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Exceptions;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserIdGetter _userIdGetter;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthService(
            IUserIdGetter userIdGetter,
            IJwtService jwtService,
            IConfiguration config,
            IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _userIdGetter = userIdGetter;
            _jwtService = jwtService;
            _config = config;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<AuthUserDto> LoginAsync(UserLoginDto userDto)
        {
            var userEntity = await _userRepository.GetByEmailAsync(userDto.Email)
                ?? throw new NotFoundException(nameof(User));

            if (!SecurityHelper.ValidatePassword(userDto.Password, userEntity.Password, userEntity.Salt))
            {
                throw new InvalidEmailUsernameOrPasswordException();
            }

            var token = await GenerateAccessToken(userEntity.Id, userEntity.FullName, userEntity.Email);

            var user = UserToUserDto.Map(userEntity);

            return new AuthUserDto
            {
                Token = token,
                User = user
            };
        }

        public async Task<AuthUserDto> RegisterAsync(UserRegisterDto userDto)
        {
            var userEntity = UserRegisterDtoToUser.Map(userDto);
            var salt = SecurityHelper.GetRandomBytes();

            userEntity.Salt = Convert.ToBase64String(salt);
            userEntity.Password = SecurityHelper.HashPassword(userDto.Password, salt);

            await _userRepository.AddAsync(userEntity);

            var token = await GenerateAccessToken(userEntity.Id, userEntity.FullName, userEntity.Email);
            var user = UserToUserDto.Map(userEntity);

            return new AuthUserDto
            {
                Token = token,
                User = user
            };
        }

        public async Task<AccessTokenDto> RefreshTokenAsync(AccessTokenDto tokenDto)
        {
            var userId = _jwtService.GetUserIdFromToken(tokenDto.AccessToken, _config.GetSection("JWT:SigningKey").Value!);
            var userEntity = await _userRepository.GetByIdAsync(userId)
                ?? throw new NotFoundException(nameof(User));

            var refreshToken = await _refreshTokenRepository
                .GetRefreshTokenByUserIdAndTokenAsync(userId, tokenDto.RefreshToken)
                ?? throw new InvalidTokenException(nameof(tokenDto.RefreshToken));

            if (!refreshToken.IsActive)
            {
                throw new ExpiredRefreshTokenException();
            }

            var jwtToken = _jwtService.GenerateAccessToken(userEntity.Id, userEntity.FullName, userEntity.Email);
            var rToken = _jwtService.GenerateRefreshToken();

            await _refreshTokenRepository.DeleteAsync(refreshToken.Id);

            var newRefreshToken = new RefreshToken
            {
                Token = rToken,
                UserId = userEntity.Id
            };

            await _refreshTokenRepository.AddRefreshTokenAsync(newRefreshToken);

            return new AccessTokenDto
            {
                AccessToken = jwtToken,
                RefreshToken = rToken
            };
        }

        public async Task RemoveRefreshTokenAsync(string token)
        {
            var currentUserId = _userIdGetter.CurrentUserId;
            var refreshToken = await _refreshTokenRepository
                                   .GetRefreshTokenByUserIdAndTokenAsync(currentUserId, token)
                ?? throw new InvalidTokenException(nameof(RefreshToken));

            await _refreshTokenRepository.DeleteAsync(refreshToken.Id);
        }

        private async Task<AccessTokenDto> GenerateAccessToken(Guid userId, string userName, string email)
        {
            var refreshTokenEntity = await _refreshTokenRepository
                .GetRefreshTokenByUserIdAsync(userId);

            var refreshToken = _jwtService.GenerateRefreshToken();

            if (refreshTokenEntity is null)
            {
                var newRefreshToken = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = userId,
                };

                await _refreshTokenRepository.AddRefreshTokenAsync(newRefreshToken);
            }

            var accessToken = _jwtService.GenerateAccessToken(userId, userName, email);

            return new AccessTokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshTokenEntity?.Token ?? refreshToken,
            };
        }
        
        public async Task ResetPasswordAsync(ResetPasswordDto newInfo)
        {
            var user = await _userRepository.GetByEmailAsync(newInfo.Email)
                       ?? throw new BadRequestException($"User with email {newInfo.Email} doesn't exist");

            user.Password = SecurityHelper.HashPassword(newInfo.NewPassword, Convert.FromBase64String(user.Salt));

            await _userRepository.UpdateAsync(user);
        }
    }
}
