namespace ReadyBusinesses.Common.Dto.Criteria;

public class CriteriaDto
{
    public Guid? Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public bool IsMaximization { get; set; }
    
    public double Weight { get; set; }
}