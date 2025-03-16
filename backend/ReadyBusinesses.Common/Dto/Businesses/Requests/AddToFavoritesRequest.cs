namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class AddToFavoritesRequest
{
    public Guid PostId { get; set; }
    
    public bool Value { get; set; }
}