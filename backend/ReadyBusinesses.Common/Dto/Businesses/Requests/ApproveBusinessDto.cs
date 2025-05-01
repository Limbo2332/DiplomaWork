namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class ApproveBusinessDto
{
    public required Guid BusinessId { get; set; }

    public string Category { get; set; } = string.Empty;    
}