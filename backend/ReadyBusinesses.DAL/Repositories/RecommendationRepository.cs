using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DLL.Repositories;

public class RecommendationRepository : IRecommendationRepository
{
    private readonly BusinessesContext _dbContext;

    public RecommendationRepository(BusinessesContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Recommendation>> GetExpertRecommendationsAsync(Guid businessId)
    {
        return await _dbContext.Posts
            .Include(p => p.Recommendations)
                .ThenInclude(r => r.Recommendation)
                .ThenInclude(r => r.GivenBy)
            .Where(p => p.Id == businessId)
            .SelectMany(p => p.Recommendations)
            .Select(r => r.Recommendation)
            .Where(r => r.GivenById != null)
            .ToListAsync();
    }

    public async Task AddRecommendationAsync(Recommendation recommendation)
    {
        await _dbContext.Recommendations.AddAsync(recommendation);
        await _dbContext.SaveChangesAsync();
    }
}