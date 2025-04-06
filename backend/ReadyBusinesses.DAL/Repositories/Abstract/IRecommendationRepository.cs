using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IRecommendationRepository
{
    Task<Recommendation> GetAiRecommendationByIdAsync(Guid id);
    
    Task AddRecommendationAsync(Recommendation recommendation);
}