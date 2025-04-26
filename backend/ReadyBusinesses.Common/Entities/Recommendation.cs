using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Recommendation : BaseEntity
{
    public Guid Id { get; set; }
    
    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];
    
    public string[] Recommendations { get; set; } = [];

    public ICollection<CriteriaEstimate> CriteriaEstimates { get; set; } = [];
    
    public Guid? GivenById { get; set; }
    
    public User? GivenBy { get; set; }
}