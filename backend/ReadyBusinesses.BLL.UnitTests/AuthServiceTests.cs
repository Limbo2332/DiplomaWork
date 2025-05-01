using Microsoft.Extensions.Configuration;
using Moq;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Auth;
using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DAL.UnitTests;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock = new();
    private readonly Mock<IRefreshTokenRepository> _refreshTokenRepoMock = new();
    private readonly Mock<IJwtService> _jwtServiceMock = new();
    private readonly Mock<IUserIdGetter> _userIdGetterMock = new();
    private readonly Mock<IConfiguration> _configMock = new();
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _authService = new AuthService(
            _userIdGetterMock.Object,
            _jwtServiceMock.Object,
            _configMock.Object,
            _userRepositoryMock.Object,
            _refreshTokenRepoMock.Object
        );
    }

    [Fact]
    public async Task LoginAsync_ValidCredentials_ReturnsAuthUserDto()
    {
        // Arrange
        var userDto = new UserLoginDto { Email = "test@example.com", Password = "password123" };
        var salt = Convert.ToBase64String(SecurityHelper.GetRandomBytes());
        var hashed = SecurityHelper.HashPassword("password123", Convert.FromBase64String(salt));

        var userEntity = new User
        {
            Id = Guid.NewGuid(),
            FullName = "Test User",
            Email = userDto.Email,
            Password = hashed,
            Salt = salt
        };

        _userRepositoryMock.Setup(r => r.GetByEmailAsync(userDto.Email)).ReturnsAsync(userEntity);
        _jwtServiceMock.Setup(s => s.GenerateAccessToken(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<string>())).Returns("access_token");
        _refreshTokenRepoMock.Setup(r => r.GetRefreshTokenByUserIdAsync(It.IsAny<Guid>())).ReturnsAsync((RefreshToken?)null);
        _refreshTokenRepoMock.Setup(r => r.AddRefreshTokenAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);

        // Act
        var result = await _authService.LoginAsync(userDto);

        // Assert
        Assert.Equal("access_token", result.Token.AccessToken);
        Assert.Equal(userEntity.Email, result.User.Email);
    }

    [Fact]
    public async Task RegisterAsync_ValidData_ReturnsAuthUserDto()
    {
        // Arrange
        var userDto = new UserRegisterDto
        {
            Email = "newuser@example.com",
            FullName = "New User",
            Password = "password123"
        };

        _userRepositoryMock.Setup(r => r.AddAsync(It.IsAny<User>())).Returns(Task.CompletedTask);
        _refreshTokenRepoMock.Setup(r => r.GetRefreshTokenByUserIdAsync(It.IsAny<Guid>())).ReturnsAsync((RefreshToken?)null);
        _refreshTokenRepoMock.Setup(r => r.AddRefreshTokenAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);
        _jwtServiceMock.Setup(s => s.GenerateAccessToken(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<string>())).Returns("access_token");

        // Act
        var result = await _authService.RegisterAsync(userDto);

        // Assert
        Assert.Equal("access_token", result.Token.AccessToken);
        Assert.Equal(userDto.Email, result.User.Email);
    }

    [Fact]
    public async Task RefreshTokenAsync_ValidToken_ReturnsNewAccessTokenDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var refreshToken = "refresh_token";
        var tokenDto = new AccessTokenDto { AccessToken = "old_token", RefreshToken = refreshToken };

        var user = new User { Id = userId, Email = "user@example.com", FullName = "User" };
        var rToken = new RefreshToken { Id = 1, Token = refreshToken, UserId = userId };

        _configMock.Setup(c => c.GetSection("JWT:SigningKey").Value).Returns("signing_key");
        _jwtServiceMock.Setup(s => s.GetUserIdFromToken(tokenDto.AccessToken, "signing_key")).Returns(userId);
        _userRepositoryMock.Setup(r => r.GetByIdAsync(userId)).ReturnsAsync(user);
        _refreshTokenRepoMock.Setup(r => r.GetRefreshTokenByUserIdAndTokenAsync(userId, refreshToken)).ReturnsAsync(rToken);
        _jwtServiceMock.Setup(s => s.GenerateAccessToken(userId, user.FullName, user.Email)).Returns("new_access_token");
        _jwtServiceMock.Setup(s => s.GenerateRefreshToken()).Returns("new_refresh_token");
        _refreshTokenRepoMock.Setup(r => r.DeleteAsync(rToken.Id)).Returns(Task.CompletedTask);
        _refreshTokenRepoMock.Setup(r => r.AddRefreshTokenAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);

        // Act
        var result = await _authService.RefreshTokenAsync(tokenDto);

        // Assert
        Assert.Equal("new_access_token", result.AccessToken);
        Assert.Equal("new_refresh_token", result.RefreshToken);
    }

    [Fact]
    public async Task ResetPasswordAsync_UserExists_UpdatesPassword()
    {
        // Arrange
        var email = "reset@example.com";
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            Salt = Convert.ToBase64String(SecurityHelper.GetRandomBytes())
        };

        var dto = new ResetPasswordDto
        {
            Email = email,
            NewPassword = "new_password"
        };

        _userRepositoryMock.Setup(r => r.GetByEmailAsync(email)).ReturnsAsync(user);
        _userRepositoryMock.Setup(r => r.UpdateAsync(user)).Returns(Task.CompletedTask);

        // Act
        await _authService.ResetPasswordAsync(dto);

        // Assert
        _userRepositoryMock.Verify(r => r.UpdateAsync(user), Times.Once);
    }
}