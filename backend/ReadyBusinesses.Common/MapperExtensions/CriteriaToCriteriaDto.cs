using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class CriteriaToCriteriaDto
{
    public static CriteriaDto ToCriteriaDto(this Criteria criteria)
    {
        return new CriteriaDto
        {
            Id = criteria.Id,
            Name = criteria.Name,
            Weight = criteria.Weight,
            IsMaximization = criteria.IsMaximized
        };
    }

    public static GlobalCriteriaDto ToGlobalCriteriaDto(this GlobalCriteria criteria)
    {
        return new GlobalCriteriaDto
        {
            Criteria = criteria.Criteria.Select(ToCriteriaDto).ToArray(),
        };
    }

    public static Criteria ToCriteria(this CriteriaDto criteriaDto, Guid globalCriteriaId)
    {
        return new Criteria
        {
            Id = criteriaDto.Id ?? Guid.NewGuid(),
            IsMaximized = criteriaDto.IsMaximization,
            Name = criteriaDto.Name,
            Weight = criteriaDto.Weight,
            GlobalCriteriaId = globalCriteriaId
        };
    }

    public static GlobalCriteria ToGlobalCriteria(this GlobalCriteriaDto criteriaDto)
    {
        var globalCriteriaId = Guid.NewGuid();
        
        return new GlobalCriteria
        {
            Id = globalCriteriaId,
            Criteria = criteriaDto.Criteria.Select(x => ToCriteria(x, globalCriteriaId)).ToArray(),
        };
    }

    public static CriteriaEstimate ToCriteriaEstimate(this CriteriaEstimateDto criteriaDto,
        GlobalCriteriaDto globalCriteria, 
        Recommendation recommendation)
    {
        return new CriteriaEstimate
        {
            Criteria = globalCriteria.Criteria.First(y => y.Id == criteriaDto.CriteriaId).ToCriteria(globalCriteria.Id),
            CriteriaId = criteriaDto.CriteriaId,
            Recommendation = recommendation,
            RecommendationId = recommendation.Id,
            Estimate = criteriaDto.Estimate
        };
    }

    public static CriteriaEstimateDto ToCriteriaEstimateDto(this CriteriaEstimateGpt criteriaEstimateGpt, CriteriaDto[] criteria)
    {
        return new CriteriaEstimateDto
        {
            CriteriaId = criteria.First(c => c.Name == criteriaEstimateGpt.Criterion).Id!.Value,
            Estimate = criteriaEstimateGpt.Estimate,
        };
    }
}