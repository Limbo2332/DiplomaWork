using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Picture : BaseEntity
{
    public Guid Id { get; set; }   
    
    public string Name { get; set; } = string.Empty;

    public byte[] Data { get; set; } = [];

    public string ContentType { get; set; } = string.Empty;
}