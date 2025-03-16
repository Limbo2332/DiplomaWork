using Microsoft.AspNetCore.Http;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.Dto.Businesses.Requests;

public class CreateBusinessRequestDto
{
    public required string Name { get; set; }
    
    public required string Location { get; set; }
    
    public decimal Price { get; set; }
    
    public Currency Currency { get; set; }
    
    public double Area { get; set; }
    
    public decimal? RentPrice { get; set; }
    
    public int Employees { get; set; }
    
    public decimal SalaryExpenses { get; set; }
    
    public int AverageCheck { get; set; }
    
    public int AverageMonthlyRevenue { get; set; }
    
    public int AverageMonthlyProfit { get; set; }
    
    public bool HasEquipment { get; set; }
    
    public bool HasShelter { get; set; }
    
    public bool HasGenerator { get; set; }
    
    public bool IsNegotiable { get; set; }
    
    public bool HasPreviousOwnerSupport { get; set; }
    
    public bool HasFop { get; set; }
    
    public bool HasCompetitors { get; set; }
    
    public bool IsSeasonal { get; set; }
    
    public Season? Season { get; set; }
    
    public bool HasDeliveryServices { get; set; }
    
    public string? Telegram { get; set; }
    
    public string? Instagram { get; set; }
    
    public string? Facebook { get; set; }
    
    public string? Twitter { get; set; }
    
    public string? Site { get; set; }
    
    public required string Description { get; set; }

    public IEnumerable<IFormFile> Images { get; set; } = [];
}