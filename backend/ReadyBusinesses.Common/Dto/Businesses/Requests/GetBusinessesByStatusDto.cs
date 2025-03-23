using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class GetBusinessesByStatusDto
{
    public int PageCount { get; set; }
    
    public int Offset { get; set; }
    
    public BusinessStatus Status { get; set; }
}