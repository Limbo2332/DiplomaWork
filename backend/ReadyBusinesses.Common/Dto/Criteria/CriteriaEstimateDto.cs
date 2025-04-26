namespace ReadyBusinesses.Common.Dto.Criteria;

public class CriteriaEstimateDto
{
    public Guid Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public double Estimate { get; set; }
}