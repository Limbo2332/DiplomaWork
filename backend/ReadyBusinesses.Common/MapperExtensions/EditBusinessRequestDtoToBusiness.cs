using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class EditBusinessRequestDtoToBusiness
{
    public static Post Map(EditBusinessRequestDto editBusinessRequestDto)
    {
        return new Post
        {
            Id = editBusinessRequestDto.Id,
            Name = editBusinessRequestDto.Name,
            PriceInUah = CurrencyConvertation.ToUah(editBusinessRequestDto.Currency, editBusinessRequestDto.Price),
            Currency = editBusinessRequestDto.Currency,
            Location = editBusinessRequestDto.Location,
            Category = null,
            RoomArea = editBusinessRequestDto.Area,
            RoomRent = editBusinessRequestDto.RentPrice,
            AverageChequePrice = editBusinessRequestDto.AverageCheck,
            AverageRevenuePerMonth = editBusinessRequestDto.AverageMonthlyRevenue,
            AverageProfitPerMonth = editBusinessRequestDto.AverageMonthlyProfit,
            HasEquipment = editBusinessRequestDto.HasEquipment,
            HasGeneratorOrEcoFlow = editBusinessRequestDto.HasGenerator,
            HasBargaining = editBusinessRequestDto.IsNegotiable,
            HasSupportFromPreviousOwner = editBusinessRequestDto.HasPreviousOwnerSupport,
            IsSeasonal = editBusinessRequestDto.IsSeasonal,
            Season = editBusinessRequestDto.Season,
            HasPhop = editBusinessRequestDto.HasFop,
            Description = editBusinessRequestDto.Description,
            HasIntegrationWithDeliveryServices = editBusinessRequestDto.HasDeliveryServices,
            HasShelter = editBusinessRequestDto.HasShelter,
            EmployersCount = editBusinessRequestDto.Employees,
            EmployersSalaryPerMonth = editBusinessRequestDto.SalaryExpenses,
            BusinessStatus = BusinessStatus.WaitingForApproval,
            HasCompetitors = editBusinessRequestDto.HasCompetitors
        };
    }
}