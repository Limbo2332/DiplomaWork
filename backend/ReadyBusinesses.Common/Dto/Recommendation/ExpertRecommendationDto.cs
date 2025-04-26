using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.Common.Dto.Recommendation;

public class ExpertRecommendationDto
{
    public RecommendationDto Recommendation { get; set; } = null!;

    public string ExpertName { get; set; } = string.Empty;
    
    public double TotalScore { get; set; }

    public IEnumerable<CriteriaEstimateDto> CriteriaEstimates { get; set; } = [];
    
    public DateTime Date { get; set; }
}