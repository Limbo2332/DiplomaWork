using ReadyBusinesses.Common.Dto.BlobImage;

namespace ReadyBusinesses.Common.Dto.User;

public class UserDto
{
    public Guid Id { get; set; }
    
    public string Email { get; set; } = string.Empty;
    
    public string FullName { get; set; } = string.Empty;
    
    public BlobImageDto? ProfileImage { get; set; }
    
    public bool IsAdmin { get; set; }
}