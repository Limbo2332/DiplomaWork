using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class RecommendationDtoToRecommendation
{
    public static RecommendationDto ToRecommendationDto(this Recommendation recommendation, Guid businessId)
    {
        return new RecommendationDto
        {
            Id = recommendation.Id,
            BusinessId = businessId,
            Minuses = recommendation.Minuses,
            Pluses = recommendation.Pluses,
            Recommendations = recommendation.Recommendations,
            CriteriaEstimates = recommendation.CriteriaEstimates.Select(c => new CriteriaEstimateDto
            {
                Id = c.CriteriaId,
                Estimate = c.Estimate,
                Name = c.Criteria.Name,
            }),
            TotalScore = Math.Round(
                recommendation.CriteriaEstimates.Sum(c => 
                    (c.Criteria.IsMaximized ? c.Estimate : (100d - c.Estimate)) * c.Criteria.Weight
                ),
                2
            )
        };
    }

    public static ExpertRecommendationDto ToExpertRecommendationDto(Recommendation recommendation, Guid businessId, User expert)
    {
        return new ExpertRecommendationDto
        {
            Recommendation = ToRecommendationDto(recommendation, businessId),
            ExpertName = expert.FullName,
            Date = recommendation.CreatedAt,
            CriteriaEstimates = recommendation.CriteriaEstimates.Select(c => new CriteriaEstimateDto
            {
                Id = c.CriteriaId,
                Estimate = c.Estimate,
                Name = c.Criteria.Name,
            }),
            TotalScore = Math.Round(
                recommendation.CriteriaEstimates.Sum(c => 
                    (c.Criteria.IsMaximized ? c.Estimate : (100d - c.Estimate)) * c.Criteria.Weight
                ),
                2
            )
        };
    }
}