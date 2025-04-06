using ReadyBusinesses.Common.Dto.Recommendation;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IRecommendationService
{
    Task<RecommendationDto> StartAiRecommendationAsync(StartRecommendationDto startRecommendationDto);
}