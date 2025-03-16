namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class MainFeedBusinessesRequestDto
{
    public int PageCount { get; set; }
    
    public int Offset { get; set; }
    
    public required FilterDto Filter { get; set; }
}

public class AdminFeedBusinessesRequestDto
{
    public int PageCount { get; set; }
    
    public int Offset { get; set; }
}