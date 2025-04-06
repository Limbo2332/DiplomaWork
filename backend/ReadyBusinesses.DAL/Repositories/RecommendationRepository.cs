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

    public Task<Recommendation> GetAiRecommendationByIdAsync(Guid id)
    {
        return _dbContext.Recommendations.FirstAsync(x => x.Id == id && x.ByAI);
    }

    public async Task AddRecommendationAsync(Recommendation recommendation)
    {
        await _dbContext.Recommendations.AddAsync(recommendation);
        await _dbContext.SaveChangesAsync();
    }
}