using ReadyBusinesses.Common.Dto.BlobImage;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Dto.Businesses;

public class BusinessDto
{
    public Guid Id { get; set; }

    public bool IsSaved { get; set; }
    
    public bool IsViewed { get; set; }
    
    public required string Name { get; set; }
    
    public required string Location { get; set; }
    
    public required string Category { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public decimal Price { get; set; }
    
    public Currency PriceCurrency { get; set; }

    public IEnumerable<ImagePathDto> Images { get; set; } = [];
    
    public required string Description { get; set; }
    
    public string? Telegram { get; set; }
    
    public string? Instagram { get; set; }
    
    public string? Facebook { get; set; }
    
    public string? Twitter { get; set; }
    
    public string? Site { get; set; }
    
    public Guid AuthorId { get; set; }
    
    public required string AuthorName { get; set; }
    
    public string? AuthorImage { get; set; }
    
    public DateTime AuthorRegistrationDate { get; set; }
    
    public string? AuthorPhoneNumber { get; set; }
    
    public string? AuthorTelegram { get; set; }
    
    public string? AuthorInstagram { get; set; }
    
    public string? AuthorFacebook { get; set; }
    
    public string? AuthorTwitter { get; set; }
    
    public string? AuthorSite { get; set; }
    
    public double Area { get; set; }
    
    public decimal RentPrice { get; set; }
    
    public int Employees { get; set; }
    
    public decimal SalaryExpenses { get; set; }
    
    public decimal AverageCheck { get; set; }
    
    public decimal AverageMonthlyRevenue { get; set; }
    
    public decimal AverageMonthlyProfit { get; set; }
    
    public decimal TimeToPayBack { get; set; }
    
    public bool HasEquipment { get; set; }
    
    public bool HasShelter { get; set; }
    
    public bool HasGenerator { get; set; }
    
    public bool IsNegotiable { get; set; }
    
    public bool HasPreviousOwnerSupport { get; set; }
    
    public bool HasFop { get; set; }
    
    public bool HasCompetitors { get; set; }
    
    public bool IsSeasonal { get; set; }
    
    public Season? Season { get; set; }
    
    public bool HasDeliveryServices { get; set; }

    public RecommendationDto? AiRecommendation { get; set; }
}