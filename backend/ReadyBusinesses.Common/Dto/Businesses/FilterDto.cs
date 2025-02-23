using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Dto.Businesses;

public class FilterDto
{
    public required string[] Categories { get; set; }
    
    public string? Search { get; set; }
    
    public string? Location { get; set; }
    
    public double PriceStart { get; set; }
    
    public double PriceEnd { get; set; }
    
    public Currency PriceCurrency { get; set; }
    
    public double FlatSquareStart { get; set; }
    
    public double FlatSquareEnd { get; set; }
    
    public int AmountOfWorkersStart { get; set; }
    
    public int AmountOfWorkersEnd { get; set; }
    
    public double AverageChequeStart { get; set; }
    
    public double AverageChequeEnd { get; set; }
    
    public double AverageIncomeStart { get; set; }
    
    public double AverageIncomeEnd { get; set; }
    
    public double AverageProfitStart { get; set; }
    
    public double AverageProfitEnd { get; set; }
    
    public int TimeToPaybackStart { get; set; }
    
    public int TimeToPaybackEnd { get; set; }
    
    public bool HasEquipment { get; set; }
    
    public bool HasGeneratorOrEcoFlow { get; set; }
    
    public bool HasBargain { get; set; }
    
    public bool HasSupportFromOwner { get; set; }
    
    public bool HasPhop { get; set; }
    
    public bool HasIntegrationWithDeliveryServices { get; set; }
    
    public bool OnlySaved { get; set; }
    
    public bool HideViewed { get; set; }
}
