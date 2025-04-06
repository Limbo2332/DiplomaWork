namespace ReadyBusinesses.Common.Dto.Recommendation;

public class RecommendationDto
{
    public Guid BusinessId { get; set; }
    
    public double RatingScore { get; set; }
    
    public double LocationScore { get; set; }
    
    public double FinancialScore { get; set; }
    
    public double AdaptationScore { get; set; }
    
    public double TeamScore { get; set; }
    
    public double SupportScore { get; set; }
    
    public double PopularityScore { get; set; }
    
    public double ShiScore { get; set; }

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];
    
    public string[] Recommendations { get; set; } = [];
}