namespace ReadyBusinesses.AI.Entities;

public class ChatGptResult
{
    public decimal[] CriteriaMatrix { get; set; } = [];

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];

    public string[] Recommendations { get; set; } = [];
}