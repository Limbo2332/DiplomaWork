using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.Common.Dto.Recommendation;

public class RecommendationDto
{
    public Guid Id { get; set; }
    
    public Guid BusinessId { get; set; }
    
    public double TotalScore { get; set; }

    public IEnumerable<CriteriaEstimateDto> CriteriaEstimates { get; set; } = [];

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];
    
    public string[] Recommendations { get; set; } = [];
}