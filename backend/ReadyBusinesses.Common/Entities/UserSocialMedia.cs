namespace ReadyBusinesses.Common.Entities;

public class UserSocialMedia
{
    public Guid UserId { get; set; }
    
    public Guid SocialMediaId { get; set; }

    public User User { get; set; } = new User();

    public SocialMedia SocialMedia { get; set; } = new SocialMedia();
}