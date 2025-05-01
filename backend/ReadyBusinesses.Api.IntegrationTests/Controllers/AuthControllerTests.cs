using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Auth;
using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class AuthControllerTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    private HttpClient CreateClientWithMockService(Mock<IAuthService> authServiceMock)
    {
        var client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.Single(
                    d => d.ServiceType == typeof(IAuthService));

                services.Remove(descriptor);

                services.AddSingleton(authServiceMock.Object);
            });
        }).CreateClient();

        return client;
    }

    [Fact]
    public async Task RefreshAsync_Returns_NewAccessToken()
    {
        var authServiceMock = new Mock<IAuthService>();
        var client = CreateClientWithMockService(authServiceMock);
        var tokenDto = new AccessTokenDto { AccessToken = "old_token", RefreshToken = "refresh_token" };

        authServiceMock.Setup(s => s.RefreshTokenAsync(It.IsAny<AccessTokenDto>()))
            .ReturnsAsync(new AccessTokenDto { AccessToken = "new_token", RefreshToken = "new_refresh_token" });

        var response = await client.PostAsJsonAsync("/Auth/refresh", tokenDto);
        var result = await response.Content.ReadFromJsonAsync<AccessTokenDto>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("new_token", result?.AccessToken);
    }

    [Fact]
    public async Task ResetPasswordAsync_Returns_Ok()
    {
        var authServiceMock = new Mock<IAuthService>();
        var client = CreateClientWithMockService(authServiceMock);
        var resetDto = new ResetPasswordDto { Email = "reset@example.com", NewPassword = "NewPass123!" };

        authServiceMock.Setup(s => s.ResetPasswordAsync(It.IsAny<ResetPasswordDto>()))
            .Returns(Task.CompletedTask);

        var response = await client.PostAsJsonAsync("/Auth/reset", resetDto);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}