using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class CategoriesControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CategoriesControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
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