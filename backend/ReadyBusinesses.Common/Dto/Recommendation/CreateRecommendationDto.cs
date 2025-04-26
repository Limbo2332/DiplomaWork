using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.Common.Dto.Recommendation;

public class CreateRecommendationDto
{
    public Guid BusinessId { get; set; }

    public IEnumerable<CriteriaEstimateDto> CriteriaEstimates { get; set; } = [];
    
    public bool ByAi { get; set; }

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];

    public string[] Recommendations { get; set; } = [];
}