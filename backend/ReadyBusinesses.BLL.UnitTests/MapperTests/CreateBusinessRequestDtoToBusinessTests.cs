using Moq;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.MapperExtensions;

namespace ReadyBusinesses.DAL.UnitTests.MapperTests;

public class CreateBusinessRequestDtoToBusinessTests
{
    [Fact]
    public void Map_ShouldMapCreateBusinessRequestDtoToPostCorrectly()
    {
        // Arrange
        var createBusinessRequestDto = new CreateBusinessRequestDto
        {
            Name = "Test Business",
            Currency = Currency.USD,
            Price = 1000,
            Location = "Test Location",
            Category = "Ресторан",
            Area = 50,
            RentPrice = 500,
            AverageCheck = 20,
            AverageMonthlyRevenue = 5000,
            AverageMonthlyProfit = 2000,
            HasEquipment = true,
            HasGenerator = true,
            IsNegotiable = true,
            HasPreviousOwnerSupport = true,
            IsSeasonal = true,
            Season = Season.Літо,
            HasFop = true,
            Description = "Test Description",
            HasDeliveryServices = true,
            HasShelter = true,
            Employees = 5,
            SalaryExpenses = 1000,
            HasCompetitors = true
        };

        // Act
        var post = CreateBusinessRequestDtoToBusiness.Map(createBusinessRequestDto);

        // Assert
        Assert.NotNull(post);
        Assert.Equal(createBusinessRequestDto.Name, post.Name);
        Assert.Equal(createBusinessRequestDto.Currency, post.Currency);
        Assert.Equal(createBusinessRequestDto.Location, post.Location);
        Assert.Equal(createBusinessRequestDto.Category, post.Category);
        Assert.Equal(createBusinessRequestDto.Area, post.RoomArea);
        Assert.Equal(createBusinessRequestDto.RentPrice, post.RoomRent);
        Assert.Equal(createBusinessRequestDto.AverageCheck, post.AverageChequePrice);
        Assert.Equal(createBusinessRequestDto.AverageMonthlyRevenue, post.AverageRevenuePerMonth);
        Assert.Equal(createBusinessRequestDto.AverageMonthlyProfit, post.AverageProfitPerMonth);
        Assert.Equal(createBusinessRequestDto.HasEquipment, post.HasEquipment);
        Assert.Equal(createBusinessRequestDto.HasGenerator, post.HasGeneratorOrEcoFlow);
        Assert.Equal(createBusinessRequestDto.IsNegotiable, post.HasBargaining);
        Assert.Equal(createBusinessRequestDto.HasPreviousOwnerSupport, post.HasSupportFromPreviousOwner);
        Assert.Equal(createBusinessRequestDto.IsSeasonal, post.IsSeasonal);
        Assert.Equal(createBusinessRequestDto.Season, post.Season);
        Assert.Equal(createBusinessRequestDto.HasFop, post.HasPhop);
        Assert.Equal(createBusinessRequestDto.Description, post.Description);
        Assert.Equal(createBusinessRequestDto.HasDeliveryServices, post.HasIntegrationWithDeliveryServices);
        Assert.Equal(createBusinessRequestDto.HasShelter, post.HasShelter);
        Assert.Equal(createBusinessRequestDto.Employees, post.EmployersCount);
        Assert.Equal(createBusinessRequestDto.SalaryExpenses, post.EmployersSalaryPerMonth);
        Assert.Equal(BusinessStatus.WaitingForApproval, post.BusinessStatus);
        Assert.Equal(createBusinessRequestDto.HasCompetitors, post.HasCompetitors);
    }
}