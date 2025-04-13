using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class CreateRecommendationDtoToRecommendation
{
    public static Recommendation ToRecommendation(this CreateRecommendationDto recommendationDto, Guid givenById)
    {
        return new Recommendation
        {
            Id = Guid.NewGuid(),
            AdaptationScore = recommendationDto.AdaptationScore,
            CriteriaWeights = recommendationDto.CriteriaWeights,
            FinancialScore = recommendationDto.FinancialScore,
            LocationScore = recommendationDto.LocationScore,
            PopularityScore = recommendationDto.PopularityScore,
            RatingScore = recommendationDto.LocationScore + recommendationDto.AdaptationScore +
                          recommendationDto.SupportFromPreviousOwnerScore +
                          recommendationDto.ComplexScore + recommendationDto.FinancialScore +
                          recommendationDto.TeamScore +
                          recommendationDto.PopularityScore,
            Minuses = recommendationDto.Minuses,
            Pluses = recommendationDto.Pluses,
            Recommendations = recommendationDto.Recommendations,
            TeamScore = recommendationDto.TeamScore,
            CriteriaMatrix = [],
            SupportScore = recommendationDto.SupportFromPreviousOwnerScore,
            ShiScore = recommendationDto.ComplexScore,
            GivenById = givenById
        };
    }
}