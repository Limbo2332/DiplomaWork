using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class CreateBusinessRequestDtoToBusiness
{
    public static Post Map(CreateBusinessRequestDto createBusinessRequestDto)
    {
        return new Post
        {
            Id = Guid.NewGuid(),
            Name = createBusinessRequestDto.Name,
            PriceInUah = CurrencyConvertation.ToUah(createBusinessRequestDto.Currency, createBusinessRequestDto.Price),
            Currency = createBusinessRequestDto.Currency,
            Location = createBusinessRequestDto.Location,
            Category = null,
            RoomArea = createBusinessRequestDto.Area,
            RoomRent = createBusinessRequestDto.RentPrice,
            AverageChequePrice = createBusinessRequestDto.AverageCheck,
            AverageRevenuePerMonth = createBusinessRequestDto.AverageMonthlyRevenue,
            AverageProfitPerMonth = createBusinessRequestDto.AverageMonthlyProfit,
            HasEquipment = createBusinessRequestDto.HasEquipment,
            HasGeneratorOrEcoFlow = createBusinessRequestDto.HasGenerator,
            HasBargaining = createBusinessRequestDto.IsNegotiable,
            HasSupportFromPreviousOwner = createBusinessRequestDto.HasPreviousOwnerSupport,
            IsSeasonal = createBusinessRequestDto.IsSeasonal,
            Season = createBusinessRequestDto.Season,
            HasPhop = createBusinessRequestDto.HasFop,
            Description = createBusinessRequestDto.Description,
            HasIntegrationWithDeliveryServices = createBusinessRequestDto.HasDeliveryServices,
            HasShelter = createBusinessRequestDto.HasShelter,
            EmployersCount = createBusinessRequestDto.Employees,
            EmployersSalaryPerMonth = createBusinessRequestDto.SalaryExpenses,
            BusinessStatus = BusinessStatus.WaitingForApproval,
            HasCompetitors = createBusinessRequestDto.HasCompetitors
        };
    }
}