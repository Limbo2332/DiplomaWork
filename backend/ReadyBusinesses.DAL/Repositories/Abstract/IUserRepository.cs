using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    
    Task<User?> GetByIdAsync(Guid userId);

    Task AddAsync(User user);
    
    Task UpdateAsync(User user);
}