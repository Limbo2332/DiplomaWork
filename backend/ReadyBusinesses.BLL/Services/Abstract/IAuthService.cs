using ReadyBusinesses.Common.Dto.Auth;
using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IAuthService
{
    Task<AuthUserDto> LoginAsync(UserLoginDto userDto);

    Task<AuthUserDto> RegisterAsync(UserRegisterDto userDto);

    Task<AccessTokenDto> RefreshTokenAsync(AccessTokenDto tokenDto);

    Task RemoveRefreshTokenAsync(string token);

    Task ResetPasswordAsync(ResetPasswordDto newInfo);
}