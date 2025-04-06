namespace ReadyBusinesses.Common.Entities;

public class PostRecommendation
{
    public Guid PostId { get; set; }

    public Post Post { get; set; } = null!;
    
    public Guid RecommendationId { get; set; }

    public Recommendation Recommendation { get; set; } = null!;
}