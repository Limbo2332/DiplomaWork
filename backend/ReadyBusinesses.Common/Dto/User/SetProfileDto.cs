using Microsoft.AspNetCore.Http;

namespace ReadyBusinesses.Common.Dto.User;

public class SetProfileDto
{
    public IFormFile? ProfileImage { get; set; }
    
    public string? Description { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    public string? PersonalSiteLink { get; set; }
    
    public string? TelegramLink { get; set; }
    
    public string? InstagramLink { get; set; }
    
    public string? FacebookLink { get; set; }
    
    public string? TwitterLink { get; set; }
}