namespace ReadyBusinesses.Common.Entities;

public class PostPicture
{
    public Guid PostId { get; set; }
    
    public Guid PictureId { get; set; }
    
    public Post Post { get; set; } = new Post();
    
    public Picture Picture { get; set; } = new Picture();
}