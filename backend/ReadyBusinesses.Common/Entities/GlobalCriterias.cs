namespace ReadyBusinesses.Common.Entities;

public class GlobalCriteria
{
    public Guid Id { get; set; }
    
    public bool Fresh { get; set; }
    
    public ICollection<Criteria> Criteria { get; set; } = [];
}