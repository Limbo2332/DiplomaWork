using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetRefreshTokenByUserIdAndTokenAsync(Guid userId, string token);

    Task<RefreshToken?> GetRefreshTokenByUserIdAsync(Guid userId);

    Task AddRefreshTokenAsync(RefreshToken refreshToken);

    Task DeleteAsync(int id);
}