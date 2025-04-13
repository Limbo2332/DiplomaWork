namespace ReadyBusinesses.Common.Dto.Recommendation;

public class CreateRecommendationDto
{
    public Guid BusinessId { get; set; }

    public decimal[] CriteriaWeights { get; set; } = [];
    
    public double LocationScore { get; set; }
    
    public double AdaptationScore { get; set; }
    
    public double SupportFromPreviousOwnerScore { get; set; }
    
    public double ComplexScore { get; set; }
    
    public double FinancialScore { get; set; }
    
    public double TeamScore { get; set; }
    
    public double PopularityScore { get; set; }

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];

    public string[] Recommendations { get; set; } = [];
}