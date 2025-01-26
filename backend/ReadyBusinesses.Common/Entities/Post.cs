using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Post : BaseEntity
{
    public Guid Id { get; set; }
    
    public decimal Price { get; set; }
    
    public string Location { get; set; } = string.Empty;
    
    public double RoomArea { get; set; }

    public decimal? RoomRent { get; set; }

    public decimal AverageChequePrice { get; set; }

    public decimal AverageRevenuePerMonth { get; set; }

    public decimal AverageProfitPerMonth { get; set; }

    public string EquipmentInfo { get; set; } = string.Empty;

    public bool HasShelter { get; set; }

    public bool HasGeneratorOrEcoFlow { get; set; }

    // Торг
    public bool HasBargaining { get; set; }

    public bool HasSupportFromPreviousOwner { get; set; }

    public bool HasCredits { get; set; }

    public bool HasCompetitorsInDistrict { get; set; }

    public bool IsSeasonal { get; set; }

    public string Description { get; set; } = string.Empty;

    public bool HasIntegrationWithDeliveryServices { get; set; }
    
    public Guid CreatedBy { get; set; }
    
    public User CreatedByUser { get; set; } = new();
}