namespace ReadyBusinesses.Common.Dto.Recommendation;

public class ExpertRecommendationDto
{
    public RecommendationDto Recommendation { get; set; } = null!;

    public string ExpertName { get; set; } = string.Empty;

    public decimal[] CriteriaWeights { get; set; } = [];
    
    public DateTime Date { get; set; }
}