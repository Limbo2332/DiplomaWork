using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Api.IntegrationTests.Controllers;

public class BusinessesControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public BusinessesControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    private (HttpClient Client, Mock<IBusinessesService> Mock) CreateClientWithMock()
    {
        var mockService = new Mock<IBusinessesService>();

        var client = _factory.WithWebHostBuilder(builder =>
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
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(IBusinessesService));

                if (descriptor != null)
                    services.Remove(descriptor);

                services.AddSingleton(mockService.Object);
            });
        }).CreateClient();

        return (client, mockService);
    }

    [Fact]
    public async Task GetBusiness_ById_ReturnsOk()
    {
        var (client, mock) = CreateClientWithMock();
        var businessId = Guid.NewGuid();
        var dto = new BusinessDto { Id = businessId };

        mock.Setup(s => s.GetBusinessAsync(businessId)).ReturnsAsync(dto);

        var response = await client.GetAsync($"/Businesses/{businessId}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetUnapprovedBusinesses_ReturnsOk()
    {
        var (client, mock) = CreateClientWithMock();
        var request = new AdminFeedBusinessesRequestDto();

        mock.Setup(s => s.GetUnapprovedBusinessesAsync(It.IsAny<AdminFeedBusinessesRequestDto>()))
            .ReturnsAsync(new MainFeedBusinessesResponseDto());

        var response = await client.PostAsJsonAsync("/Businesses/adminFeed", request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task ApproveBusiness_ReturnsOk()
    {
        var (client, mock) = CreateClientWithMock();
        var request = new ApproveBusinessDto { BusinessId = Guid.NewGuid() };

        mock.Setup(s => s.ApproveBusinessAsync(It.IsAny<ApproveBusinessDto>()))
            .Returns(Task.CompletedTask);

        var response = await client.PostAsJsonAsync("/Businesses/approve", request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task RejectBusiness_ReturnsOk()
    {
        var (client, mock) = CreateClientWithMock();
        var request = new RejectBusinessDto { BusinessId = Guid.NewGuid() };

        mock.Setup(s => s.RejectBusinessAsync(It.IsAny<RejectBusinessDto>()))
            .Returns(Task.CompletedTask);

        var response = await client.PostAsJsonAsync("/Businesses/reject", request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetBusinessesByStatus_ReturnsOk()
    {
        var (client, mock) = CreateClientWithMock();
        var request = new GetBusinessesByStatusDto { Status = BusinessStatus.WaitingForApproval };

        mock.Setup(s => s.GetBusinessesByStatusAsync(It.IsAny<GetBusinessesByStatusDto>()))
            .ReturnsAsync(new MainFeedBusinessesResponseDto());

        var response = await client.PostAsJsonAsync("/Businesses/status", request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}