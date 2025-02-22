namespace ReadyBusinesses.Common.Dto.BlobImage;

public class BlobImageDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public byte[] Data { get; set; } = [];
    
    public string ContentType { get; set; } = string.Empty;
}