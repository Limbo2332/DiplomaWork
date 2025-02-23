namespace ReadyBusinesses.Common.Dto.User;

public class ProfileDto
{
    public string FullName { get; set; } = string.Empty;
    
    public string? ProfileImagePath { get; set; }
    
    public string? Description { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public string? PersonalSiteLink { get; set; }
    
    public string? TelegramLink { get; set; }
    
    public string? InstagramLink { get; set; }
    
    public string? FacebookLink { get; set; }
    
    public string? TwitterLink { get; set; }
}