using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
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

    public IQueryable<Post> GetPosts()
    {
        return _context.Posts
            .Include(p => p.CreatedByUser)
                .ThenInclude(createdBy => createdBy.SavedPosts)
            .Include(p => p.Employers);
    }

    public IEnumerable<Guid> GetSavedPostsIds(Guid userId)
    {
        return _context.SavedPosts
            .Where(p => p.UserId == userId)
            .Select(p => p.PostId);
    }
}