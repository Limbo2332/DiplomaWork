namespace ReadyBusinesses.Common.Dto.Businesses.Responses;

public class MainFeedBusinessesResponseDto
{
    public IEnumerable<PreviewBusinessDto> PreviewBusinesses { get; set; } = [];
    
    public bool HasMore { get; set; }
}