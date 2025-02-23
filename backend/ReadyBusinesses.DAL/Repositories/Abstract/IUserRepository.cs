using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    
    Task<User?> GetByIdAsync(Guid userId);

    Task AddAsync(User user);
    
    Task UpdateAsync(User user);
    
    Task<User> GetUserWithProfileAsync(Guid userId);
    
    Task<IEnumerable<SocialMedia>> GetSocialMediaAsync(Guid userId);
    
    Task AddSocialMediasAsync(IEnumerable<SocialMedia> socialMedias, User user);

    Task UpdateUserDescriptionAsync(Guid userId, string description);
    
    Task UpdateUserAvatarProfileAsync(User currentUser, Picture picture);
}