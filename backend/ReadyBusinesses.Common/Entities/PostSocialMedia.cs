namespace ReadyBusinesses.Common.Entities;

public class PostSocialMedia
{
    public Guid PostId { get; set; }
    
    public Guid SocialMediaId { get; set; }

    public Post Post { get; set; } = new Post();

    public SocialMedia SocialMedia { get; set; } = new SocialMedia();
}