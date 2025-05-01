using Moq;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.MapperExtensions;

namespace ReadyBusinesses.DAL.UnitTests.MapperTests;

public class EditBusinessRequestDtoToBusinessTests
{
    [Fact]
    public void Map_ShouldMapEditBusinessRequestDtoToPostCorrectly()
    {
        // Arrange
        var editBusinessRequestDto = new EditBusinessRequestDto
        {
            Id = Guid.NewGuid(),
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
        var post = EditBusinessRequestDtoToBusiness.Map(editBusinessRequestDto);

        // Assert
        Assert.NotNull(post);
        Assert.Equal(editBusinessRequestDto.Id, post.Id);
        Assert.Equal(editBusinessRequestDto.Name, post.Name);
        Assert.Equal(editBusinessRequestDto.Currency, post.Currency);
        Assert.Equal(editBusinessRequestDto.Location, post.Location);
        Assert.Equal(editBusinessRequestDto.Category, post.Category);
        Assert.Equal(editBusinessRequestDto.Area, post.RoomArea);
        Assert.Equal(editBusinessRequestDto.RentPrice, post.RoomRent);
        Assert.Equal(editBusinessRequestDto.AverageCheck, post.AverageChequePrice);
        Assert.Equal(editBusinessRequestDto.AverageMonthlyRevenue, post.AverageRevenuePerMonth);
        Assert.Equal(editBusinessRequestDto.AverageMonthlyProfit, post.AverageProfitPerMonth);
        Assert.Equal(editBusinessRequestDto.HasEquipment, post.HasEquipment);
        Assert.Equal(editBusinessRequestDto.HasGenerator, post.HasGeneratorOrEcoFlow);
        Assert.Equal(editBusinessRequestDto.IsNegotiable, post.HasBargaining);
        Assert.Equal(editBusinessRequestDto.HasPreviousOwnerSupport, post.HasSupportFromPreviousOwner);
        Assert.Equal(editBusinessRequestDto.IsSeasonal, post.IsSeasonal);
        Assert.Equal(editBusinessRequestDto.Season, post.Season);
        Assert.Equal(editBusinessRequestDto.HasFop, post.HasPhop);
        Assert.Equal(editBusinessRequestDto.Description, post.Description);
        Assert.Equal(editBusinessRequestDto.HasDeliveryServices, post.HasIntegrationWithDeliveryServices);
        Assert.Equal(editBusinessRequestDto.HasShelter, post.HasShelter);
        Assert.Equal(editBusinessRequestDto.Employees, post.EmployersCount);
        Assert.Equal(editBusinessRequestDto.SalaryExpenses, post.EmployersSalaryPerMonth);
        Assert.Equal(BusinessStatus.WaitingForApproval, post.BusinessStatus);
        Assert.Equal(editBusinessRequestDto.HasCompetitors, post.HasCompetitors);
    }
}