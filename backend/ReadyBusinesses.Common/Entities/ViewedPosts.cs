namespace ReadyBusinesses.Common.Entities;

public class ViewedPosts
{
    public Guid UserId { get; set; }
    
    public Guid PostId { get; set; }
    
    public User User { get; set; } = new User();

    public Post Post { get; set; } = new Post();
}