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
            .Include(p => p.CreatedByUser)
                .ThenInclude(createdBy => createdBy.ViewedPosts)
            .Include(p => p.Pictures)
                .ThenInclude(picture => picture.Picture)
            .Include(post => post.Recommendations)
                .ThenInclude(r => r.Recommendation)
                    .ThenInclude(r => r.CriteriaEstimates)
                        .ThenInclude(c => c.Criteria);
    }

    public Task<Post> GetBusinessWithoutDependenciesByIdAsync(Guid id)
    {
        return _context.Posts.FirstAsync(p => p.Id == id);
    }

    public Task<Post?> GetPostByIdAsync(Guid id)
    {
        return _context.Posts
            .Include(p => p.Pictures)
            .ThenInclude(picture => picture.Picture)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public IEnumerable<Guid> GetSavedPostsIds(Guid userId)
    {
        return _context.SavedPosts
            .Where(p => p.UserId == userId)
            .Select(p => p.PostId);
    }

    public IEnumerable<Guid> GetViewedPostsIds(Guid currentUserId)
    {
        return _context.ViewedPosts
            .Where(p => p.UserId == currentUserId)
            .Select(p => p.PostId);
    }

    public async Task SavePostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
        await _context.SaveChangesAsync();
    }

    public async Task EditPostAsync(Post post)
    {
        _context.Posts.Update(post);
        await _context.SaveChangesAsync();
    }

    public async Task EditPostAsync(Post currentPost, Post post)
    {
        _context.Entry(currentPost).CurrentValues.SetValues(post);
        
        foreach (var picture in post.Pictures)
        {
            currentPost.Pictures.Add(picture);
        }
        
        _context.Posts.Update(currentPost);
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
                .ThenInclude(user => user.ViewedPosts)
            .Include(p => p.CreatedByUser)
                .ThenInclude(user => user.ProfileAvatar)
            .Include(p => p.Pictures)
                .ThenInclude(picture => picture.Picture)
            .Include(p => p.SocialMedias)
                .ThenInclude(socialMedia => socialMedia.SocialMedia)
            .Include(p => p.Recommendations)
                .ThenInclude(r => r.Recommendation)
                    .ThenInclude(r => r.CriteriaEstimates)
                        .ThenInclude(e => e.Criteria)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddPostRecommendationAsync(Guid postId, Guid recommendationId)
    {
        await _context.AddAsync(new PostRecommendation
        {
            PostId = postId,
            RecommendationId = recommendationId
        });
        
        await _context.SaveChangesAsync();
    }

    public async Task ViewPostAsync(Post post, User currentUser)
    {
        if (await _context.ViewedPosts.AnyAsync(vp => vp.PostId == post.Id && vp.UserId == currentUser.Id))
        {
            return;
        }
        
        await _context.ViewedPosts.AddAsync(new ViewedPosts
        {
            Post = post,
            PostId = post.Id,
            User = currentUser,
            UserId = currentUser.Id
        });
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<PostSocialMedia>> GetPostSocialMediasAsync(Guid postId)
    {
        return await _context.PostsSocialMedias
            .Include(p => p.SocialMedia)
            .Include(p => p.Post)
            .Where(p => p.PostId == postId)
            .ToListAsync();
    }
}