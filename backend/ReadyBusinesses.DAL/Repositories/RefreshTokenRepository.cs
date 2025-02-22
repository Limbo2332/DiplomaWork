using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DLL.Repositories;

public class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly BusinessesContext _dbContext;

    public RefreshTokenRepository(BusinessesContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<RefreshToken?> GetRefreshTokenByUserIdAndTokenAsync(Guid userId, string token)
    {
        return _dbContext.RefreshTokens.SingleOrDefaultAsync(t => t.Token == token && t.UserId == userId);
    }

    public Task<RefreshToken?> GetRefreshTokenByUserIdAsync(Guid userId)
    {
        return _dbContext.RefreshTokens.SingleOrDefaultAsync(t => t.UserId == userId);
    }

    public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        await _dbContext.RefreshTokens.AddAsync(refreshToken);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var refreshToken = await _dbContext.RefreshTokens.FindAsync(id);

        if (refreshToken is null)
        {
            return;
        }
        
        _dbContext.RefreshTokens.Remove(refreshToken);
        
        await _dbContext.SaveChangesAsync();
    }
}