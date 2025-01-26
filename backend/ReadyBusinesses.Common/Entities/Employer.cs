using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Employer : BaseEntity
{
    public Guid Id { get; set; }
    
    public string Position { get; set; } = string.Empty;

    public decimal Salary { get; set; }

    public Guid PostId { get; set; }

    public Post Post { get; set; } = new();
}