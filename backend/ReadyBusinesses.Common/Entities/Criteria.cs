using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Criteria : BaseEntity
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }

    public bool IsMaximized { get; set; }
    
    public double Weight { get; set; }
    
    public Guid GlobalCriteriaId { get; set; }
    
    public GlobalCriteria GlobalCriteria { get; set; } = new GlobalCriteria();
}