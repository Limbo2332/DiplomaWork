using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities;

public class Recommendation : BaseEntity
{
    public Guid Id { get; set; }
    
    public bool ByAI { get; set; }

    public decimal[] CriteriaWeights { get; set; } = [];
    
    public double RatingScore { get; set; }
    
    public double LocationScore { get; set; }
    
    public double FinancialScore { get; set; }
    
    public double AdaptationScore { get; set; }
    
    public double TeamScore { get; set; }
    
    public double SupportScore { get; set; }
    
    public double PopularityScore { get; set; }
    
    public double ShiScore { get; set; }

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];
    
    public string[] Recommendations { get; set; } = [];
    
    public decimal[] CriteriaMatrix { get; set; } = [];
}