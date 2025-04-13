using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class User : BaseEntity
{
    public Guid Id { get; set; }
    
    public string FullName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public string Password { get; set; } = string.Empty;
    
    public string Salt { get; set; } = string.Empty;
    
    public bool IsAdmin { get; set; }
    
    public bool IsExpert { get; set; }

    public Guid? ProfileAvatarId { get; set; }

    public Picture? ProfileAvatar { get; set; }

    public ICollection<Post> Posts { get; set; } = [];

    public ICollection<SavedPosts> SavedPosts { get; set; } = [];
}