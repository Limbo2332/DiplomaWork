using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Moq;
using ReadyBusinesses.BLL.Services;

namespace ReadyBusinesses.DAL.UnitTests;

public class JwtServiceTests
{
    private readonly IConfiguration _config;
    private readonly JwtService _jwtService;

    public JwtServiceTests()
    {
        var configMock = new Mock<IConfiguration>();
        configMock.Setup(x => x["JWT:SigningKey"]).Returns("your-256-bit-secret");
        configMock.Setup(x => x["JWT:Issuer"]).Returns("testIssuer");
        configMock.Setup(x => x["JWT:Audience"]).Returns("testAudience");
        _config = configMock.Object;

        _jwtService = new JwtService(_config);
    }

    [Fact]
    public void GenerateRefreshToken_ReturnsBase64String()
    {
        // Act
        var refreshToken = _jwtService.GenerateRefreshToken();

        // Assert
        Assert.NotNull(refreshToken);
        Assert.NotEmpty(refreshToken);
        Assert.True(IsBase64String(refreshToken));
    }

    private bool IsBase64String(string base64)
    {
        if (string.IsNullOrEmpty(base64) || base64.Length % 4 != 0
                                         || base64.Contains(" ", StringComparison.Ordinal))
            return false;

        try
        {
            Convert.FromBase64String(base64);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}