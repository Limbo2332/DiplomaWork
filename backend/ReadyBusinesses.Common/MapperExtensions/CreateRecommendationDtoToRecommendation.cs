using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class CreateRecommendationDtoToRecommendation
{
    public static Recommendation ToRecommendation(this CreateRecommendationDto recommendationDto, 
        Guid givenById,
        GlobalCriteriaDto globalCriteria)
    {
        var recommendation = new Recommendation
        {
            Id = Guid.NewGuid(),
            Minuses = recommendationDto.Minuses,
            Pluses = recommendationDto.Pluses,
            Recommendations = recommendationDto.Recommendations,
            GivenById = recommendationDto.ByAi 
                ? null 
                : givenById
        };
        
        recommendation.CriteriaEstimates = recommendationDto.CriteriaEstimates
            .Select(dto => dto.ToCriteriaEstimate(globalCriteria, recommendation))
            .ToList();

        return recommendation;
    }
}