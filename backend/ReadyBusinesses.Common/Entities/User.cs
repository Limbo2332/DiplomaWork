using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class User : BaseEntity
{
    public Guid Id { get; set; }
    
    public string FullName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public Guid ProfileAvatarId { get; set; }

    public ProfileAvatar ProfileAvatar { get; set; } = null!;
    
    public ICollection<Post> Posts { get; set; } = new List<Post>();
}