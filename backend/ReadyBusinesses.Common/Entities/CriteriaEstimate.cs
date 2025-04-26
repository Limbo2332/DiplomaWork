namespace ReadyBusinesses.Common.Entities;

public class CriteriaEstimate
{
    public Guid CriteriaId { get; set; }
    
    public Guid RecommendationId { get; set; }
    
    public double Estimate { get; set; }
    
    public Criteria Criteria { get; set; } = null!;

    public Recommendation Recommendation { get; set; } = null!;
}