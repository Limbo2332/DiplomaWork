namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class MainFeedBusinessesRequestDto
{
    public int PageCount { get; set; }
    
    public int Offset { get; set; }

    public FilterDto Filter { get; set; } = null!;
}

public class AdminFeedBusinessesRequestDto
{
    public int PageCount { get; set; }
    
    public int Offset { get; set; }
}