using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DLL.Repositories;

public class BusinessesRepository : IBusinessesRepository
{
    private readonly BusinessesContext _context;

    public BusinessesRepository(BusinessesContext context)
    {
        _context = context;
    }

    public IQueryable<Post> GetPosts(BusinessStatus status)
    {
        return _context.Posts
            .Where(post => post.BusinessStatus == status)
            .Include(p => p.CreatedByUser)
                .ThenInclude(createdBy => createdBy.SavedPosts)
            .Include(p => p.Pictures)
                .ThenInclude(picture => picture.Picture);
    }

    public Task<Post?> GetPostByIdAsync(Guid id)
    {
        return _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
    }

    public IEnumerable<Guid> GetSavedPostsIds(Guid userId)
    {
        return _context.SavedPosts
            .Where(p => p.UserId == userId)
            .Select(p => p.PostId);
    }

    public async Task SavePostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    public async Task AddToFavoritesAsync(Post post, User user)
    {
        var savedPost = new SavedPosts
        {
            Post = post,
            User = user,
            PostId = post.Id,
            UserId = user.Id
        };
        
        await _context.SavedPosts.AddAsync(savedPost);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveFromFavoritesAsync(Guid postId, Guid userId)
    {
        var savedPost = await _context.SavedPosts.FirstOrDefaultAsync(
            p => p.PostId == postId && p.UserId == userId);

        if (savedPost is null)
        {
            return;
        }
        
        _context.SavedPosts.Remove(savedPost);
        await _context.SaveChangesAsync();
    }

    public Task<Post?> GetBusinessAsync(Guid id)
    {
        return _context.Posts
            .Include(p => p.CreatedByUser)
                .ThenInclude(user => user.SavedPosts)
            .Include(p => p.CreatedByUser)
                .ThenInclude(user => user.ProfileAvatar)
            .Include(p => p.Pictures)
                .ThenInclude(picture => picture.Picture)
            .Include(p => p.SocialMedias)
                .ThenInclude(socialMedia => socialMedia.SocialMedia)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}