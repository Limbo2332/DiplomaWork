using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IRecommendationRepository
{
    Task<IEnumerable<Recommendation>> GetExpertRecommendationsAsync(Guid businessId);
    
    Task AddRecommendationAsync(Recommendation recommendation);
}