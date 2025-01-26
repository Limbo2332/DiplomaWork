using ReadyBusinesses.Common.Entities.Abstract;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Entities;

public class SocialMedia : BaseEntity
{
    public Guid Id { get; set; }
    
    public SocialMediaType Type { get; set; }

    public string Link { get; set; } = string.Empty;
}