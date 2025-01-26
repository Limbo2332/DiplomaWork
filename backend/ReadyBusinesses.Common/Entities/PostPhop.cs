namespace ReadyBusinesses.Common.Entities;

public class PostPhop
{
    public Guid PostId { get; set; }
    
    public int PhopNumber { get; set; }

    public Post Post { get; set; } = new();
    
    public Phop Phop { get; set; } = new();
}