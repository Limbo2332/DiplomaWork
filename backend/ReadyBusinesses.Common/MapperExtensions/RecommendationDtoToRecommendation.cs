using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class RecommendationDtoToRecommendation
{
    public static Recommendation ToRecommendation(RecommendationDto recommendationDto, 
        decimal[] criteriaMatrix, 
        decimal[] criteriaWeights,
        bool isAI)
    {
        var recommendationId = Guid.NewGuid();

        return new Recommendation
        {
            Id = recommendationId,
            ByAI = isAI,
            CriteriaMatrix = criteriaMatrix,
            Minuses = recommendationDto.Minuses,
            Pluses = recommendationDto.Pluses,
            Recommendations = recommendationDto.Recommendations,
            AdaptationScore = recommendationDto.AdaptationScore,
            CriteriaWeights = criteriaWeights,
            FinancialScore = recommendationDto.FinancialScore,
            LocationScore = recommendationDto.LocationScore,
            PopularityScore = recommendationDto.PopularityScore,
            RatingScore = recommendationDto.RatingScore,
            ShiScore = recommendationDto.ShiScore,
            SupportScore = recommendationDto.SupportScore,
            TeamScore = recommendationDto.TeamScore
        };
    }

    public static RecommendationDto ToRecommendationDto(Recommendation recommendation, Guid businessId)
    {
        return new RecommendationDto
        {
            BusinessId = businessId,
            TeamScore = Math.Round(recommendation.TeamScore, 2),
            ShiScore = Math.Round(recommendation.ShiScore, 2),
            SupportScore = Math.Round(recommendation.SupportScore, 2),
            AdaptationScore = Math.Round(recommendation.AdaptationScore, 2),
            RatingScore = Math.Round(recommendation.RatingScore, 2),
            LocationScore = Math.Round(recommendation.LocationScore, 2),
            FinancialScore = Math.Round(recommendation.FinancialScore, 2),
            Minuses = recommendation.Minuses,
            Pluses = recommendation.Pluses,
            Recommendations = recommendation.Recommendations,
            PopularityScore = Math.Round(recommendation.PopularityScore, 2)
        };
    }
}