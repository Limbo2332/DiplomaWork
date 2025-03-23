using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Dto.Businesses;

public class PreviewBusinessDto
{
    public Guid Id { get; set; }
    
    public Guid CreatedBy { get; set; }
    
    public required string PreviewImageUrl { get; set; }

    public required string Name { get; set; }
    
    public decimal Price { get; set; }
    
    public Currency PriceCurrency { get; set; }
    
    public string? Category { get; set; }
    
    public decimal TermToPayBack { get; set; }
    
    public decimal AverageProfit { get; set; }
    
    public bool HasBargain { get; set; }
    
    public decimal AverageCheque { get; set; }
    
    public int AmountOfWorkers { get; set; }
    
    public double FlatSquare { get; set; }
    
    public required string Location { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public bool IsSaved { get; set; }
}