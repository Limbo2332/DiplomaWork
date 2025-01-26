using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class PostInfo : BaseEntity
{
    public Guid Id { get; set; }
    
    public bool IsSaved { get; set; }

    public int ViewCount { get; set; }

    public int ViewTimeInMinutes { get; set; }

    public Guid PostId { get; set; }

    public Post Post { get; set; } = new();
    
    public Guid UserId { get; set; }
    
    public User User { get; set; } = new();
}