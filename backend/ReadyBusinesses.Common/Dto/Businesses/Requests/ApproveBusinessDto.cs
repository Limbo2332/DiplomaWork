namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class ApproveBusinessDto
{
    public required Guid BusinessId { get; set; }
    
    public required string Category { get; set; }
}