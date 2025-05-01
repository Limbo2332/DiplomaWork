using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class GlobalCriteriaControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly Mock<IGlobalCriteriaService> _mockService;

    public GlobalCriteriaControllerTests(WebApplicationFactory<Program> factory)
    {
        _mockService = new Mock<IGlobalCriteriaService>();

        var customizedFactory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton(_mockService.Object);
            });
        });

        _client = customizedFactory.CreateClient();
    }

    [Fact]
    public async Task Get_ReturnsCriteria()
    {
        // Arrange
        var expectedCriteria = new GlobalCriteriaDto
        {
            Criteria = new CriteriaDto[] { new() { Name = "Profitability", Weight = 0.5 } }
        };

        _mockService.Setup(s => s.GetCriteriaAsync()).ReturnsAsync(expectedCriteria);

        // Act
        var response = await _client.GetAsync("/GlobalCriteria");

        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<GlobalCriteriaDto>();
        Assert.NotNull(result);
        Assert.Single(result!.Criteria);
        Assert.Equal("Profitability", result.Criteria[0].Name);
    }

    [Fact]
    public async Task SetNew_PostsCriteria_ReturnsOk()
    {
        // Arrange
        var inputDto = new GlobalCriteriaDto
        {
            Criteria = new CriteriaDto[] { new() { Name = "Risk", Weight = 0.3 } }
        };

        // Act
        var response = await _client.PostAsJsonAsync("/GlobalCriteria", inputDto);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        _mockService.Verify(s => s.SetNewGlobalCriteriaAsync(It.IsAny<GlobalCriteriaDto>()), Times.Once);
    }

    [Fact]
    public async Task GetNewFromAi_ReturnsNewCriteria()
    {
        // Arrange
        var aiGeneratedCriteria = new GlobalCriteriaDto
        {
            Criteria = new CriteriaDto[] { new() { Name = "Innovation", Weight = 0.7 } }
        };

        _mockService.Setup(s => s.GetNewCriteriaFromAiAsync()).ReturnsAsync(aiGeneratedCriteria);

        // Act
        var response = await _client.GetAsync("/GlobalCriteria/newfromai");

        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<GlobalCriteriaDto>();
        Assert.Single(result!.Criteria);
        Assert.Equal("Innovation", result.Criteria[0].Name);
    }
}