using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ReadyBusinesses.AI;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class CategoriesControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CategoriesControllerTests(WebApplicationFactory<Program> factory)
    {
        var client = factory.WithWebHostBuilder(builder =>
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
                var openAiClient = services.Single(
                    d => d.ServiceType == typeof(IAiClient));

                services.Remove(openAiClient);

                services.AddSingleton(new Mock<IAiClient>().Object);
            });
        }).CreateClient();

        _client = client;
    }

    [Fact]
    public async Task GetCategories_ReturnsListOfCategories()
    {
        // Act
        var response = await _client.GetAsync("/Categories");

        // Assert
        response.EnsureSuccessStatusCode(); // Status code 200
        var categories = await response.Content.ReadFromJsonAsync<List<string>>();

        Assert.NotNull(categories);
        Assert.Contains("Автомобільний бізнес", categories!);
        Assert.Equal(16, categories!.Count);
    }
}