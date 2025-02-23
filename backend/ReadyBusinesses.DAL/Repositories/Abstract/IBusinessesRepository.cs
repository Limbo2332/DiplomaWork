using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IBusinessesRepository
{
    IQueryable<Post> GetPosts();

    IEnumerable<Guid> GetSavedPostsIds(Guid userId);
}