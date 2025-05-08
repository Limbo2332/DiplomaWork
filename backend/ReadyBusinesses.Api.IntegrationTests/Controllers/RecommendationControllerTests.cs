using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Recommendation;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class RecommendationControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly Mock<IRecommendationService> _mockService;

    public RecommendationControllerTests(WebApplicationFactory<Program> factory)
    {
        _mockService = new Mock<IRecommendationService>();

        var customizedFactory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureAppConfiguration((context, configBuilder) =>
            {
                configBuilder.AddInMemoryCollection(new Dictionary<string, string>
                {
                    {"OpenAIKey", "OpenAIKey"}
                }!);
            });
            
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(_mockService.Object);
            });
        });

        _client = customizedFactory.CreateClient();
    }

    [Fact]
    public async Task StartAiRecommendation_ReturnsRecommendationDto()
    {
        // Arrange
        var request = new StartRecommendationDto
        {
            BusinessId = Guid.NewGuid()
        };

        var expected = new RecommendationDto
        {
            Recommendations = ["AI Assistant"]
        };

        _mockService
            .Setup(s => s.StartAiRecommendationAsync(It.IsAny<StartRecommendationDto>()))
            .ReturnsAsync(expected);

        // Act
        var response = await _client.PostAsJsonAsync("/Recommendation/start", request);

        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<RecommendationDto>();
        Assert.NotNull(result);
    }

    [Fact]
    public async Task CreateRecommendation_ReturnsOk()
    {
        // Arrange
        var request = new CreateRecommendationDto
        {
            BusinessId = Guid.NewGuid(),
            ByAi = true
        };

        _mockService
            .Setup(s => s.CreateRecommendationAsync(It.IsAny<CreateRecommendationDto>()))
            .ReturnsAsync(It.IsAny<RecommendationDto>());

        // Act
        var response = await _client.PostAsJsonAsync("/Recommendation/create", request);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        _mockService.Verify(s => s.CreateRecommendationAsync(It.IsAny<CreateRecommendationDto>()), Times.Once);
    }
}