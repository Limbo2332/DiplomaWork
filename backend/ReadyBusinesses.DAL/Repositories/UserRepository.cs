using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DLL.Repositories;

public class UserRepository : IUserRepository
{
    private readonly BusinessesContext _dbContext;

    public UserRepository(BusinessesContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        return _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
    }

    public Task<User?> GetByIdAsync(Guid userId)
    {
        return _dbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);
    }

    public async Task AddAsync(User user)
    {
        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();
    }

    public Task<User> GetUserWithProfileAsync(Guid userId)
    {
        return _dbContext.Users
            .Include(u => u.ProfileAvatar)
            .SingleAsync(u => u.Id == userId);
    }

    public async Task<IEnumerable<SocialMedia>> GetSocialMediaAsync(Guid userId)
    {
        return await _dbContext.UserSocialMedias
            .Where(u => u.UserId == userId)
            .Select(us => us.SocialMedia)
            .ToListAsync();
    }

    public async Task AddSocialMediasAsync(IEnumerable<SocialMedia> socialMedias, User user)
    {
        var userSocialMedias = socialMedias
            .Select(sm => new UserSocialMedia
            {
                UserId = user.Id,
                User = user,
                SocialMedia = sm,
                SocialMediaId = sm.Id
            });
        
        await _dbContext.UserSocialMedias
            .AddRangeAsync(userSocialMedias);
        
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateUserDescriptionAsync(Guid userId, string description)
    {
        var user = await _dbContext.Users.FindAsync(userId);

        if (user is not null)
        {
            user.Description = description;
        }
        
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateUserAvatarProfileAsync(User currentUser, Picture picture)
    {
        await _dbContext.Pictures.AddAsync(picture);
        
        currentUser.ProfileAvatarId = picture.Id;
        await _dbContext.SaveChangesAsync();
    }

    public Task<PostPicture?> GetPostPictureAsync(Guid id)
    {
        return _dbContext.PostPictures.FirstOrDefaultAsync(p => p.PictureId == id);
    }
}