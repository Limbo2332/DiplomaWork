using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Topsis;

public interface ISolver
{
    List<Post> GetSortedPosts(List<Post> businesses, bool byAi);
}