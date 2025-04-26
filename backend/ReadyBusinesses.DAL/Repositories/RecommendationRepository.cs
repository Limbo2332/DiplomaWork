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
        var post = await _dbContext.Posts
            .Where(p => p.Id == businessId)
            .Include(p => p.Recommendations)
                .ThenInclude(rp => rp.Recommendation)
                .ThenInclude(r => r.GivenBy)
            .Include(p => p.Recommendations)
                .ThenInclude(rp => rp.Recommendation)
                .ThenInclude(r => r.CriteriaEstimates)
                .ThenInclude(ce => ce.Criteria)
            .FirstOrDefaultAsync();

        return post?.Recommendations
                   .Where(rp => rp.Recommendation.GivenById != null)
                   .Select(rp => rp.Recommendation)
               ?? [];
    }
    
    public async Task AddRecommendationAsync(Recommendation recommendation)
    {
        await _dbContext.Recommendations.AddAsync(recommendation);
        await _dbContext.SaveChangesAsync();
    }
}