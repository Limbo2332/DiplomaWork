namespace ReadyBusinesses.Common.Dto.User;

public class AuthorDto
{
    public Guid Id { get; set; }
    
    public required string Name { get; set; }
    
    public required string Description { get; set; }
    
    public string? AvatarPreview { get; set; }
    
    public DateTime RegistrationDate { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public required string Email { get; set; }
    
    public string? Telegram { get; set; }
    
    public string? Instagram { get; set; }
    
    public string? Facebook { get; set; }
    
    public string? Twitter { get; set; }
    
    public string? Site { get; set; }
    
    public bool IsAdmin { get; set; }
    
    public bool IsExpert { get; set; }
    
    public bool IsSeller { get; set; }
}