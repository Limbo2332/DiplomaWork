using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Topsis;

public interface ISolver
{ 
    IEnumerable<Post> GetSortedPosts(IEnumerable<Post> businesses, List<decimal[]> criteriaMatrix, decimal[] criteriaWeights);
}