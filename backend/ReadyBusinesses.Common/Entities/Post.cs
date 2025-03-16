using ReadyBusinesses.Common.Entities.Abstract;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Entities;

public class Post : BaseEntity
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public decimal PriceInUah { get; set; }
    
    public Currency Currency { get; set; }
    
    public string Location { get; set; } = string.Empty;
    
    public string? Category { get; set; } = string.Empty;
    
    public double RoomArea { get; set; }

    public decimal? RoomRent { get; set; }

    public decimal AverageChequePrice { get; set; }

    public decimal AverageRevenuePerMonth { get; set; }

    public decimal AverageProfitPerMonth { get; set; }

    public bool HasEquipment { get; set; }

    public bool HasGeneratorOrEcoFlow { get; set; }
    
    public bool HasShelter { get; set; }

    // Торг
    public bool HasBargaining { get; set; }

    public bool HasSupportFromPreviousOwner { get; set; }
    
    public bool HasCompetitors { get; set; }

    public bool IsSeasonal { get; set; }
    
    public Season? Season { get; set; }
    
    public bool HasPhop { get; set; }

    public string Description { get; set; } = string.Empty;

    public bool HasIntegrationWithDeliveryServices { get; set; }
    
    public int EmployersCount { get; set; }
    
    public decimal EmployersSalaryPerMonth { get; set; }
    
    public BusinessStatus BusinessStatus { get; set; }
    
    public Guid CreatedBy { get; set; }
    
    public User CreatedByUser { get; set; } = new();

    public ICollection<PostPicture> Pictures { get; set; } = [];
    
    public ICollection<PostSocialMedia> SocialMedias { get; set; } = [];
}