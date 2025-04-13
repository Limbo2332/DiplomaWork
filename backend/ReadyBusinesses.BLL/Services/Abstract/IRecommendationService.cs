using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IRecommendationService
{
    Task<RecommendationDto> StartAiRecommendationAsync(StartRecommendationDto startRecommendationDto);
    
    Task CreateRecommendationAsync(CreateRecommendationDto createRecommendationDto);
    
    Task<IEnumerable<ExpertRecommendationDto>> GetExpertRecommendationsAsync(Guid businessId);
}