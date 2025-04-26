using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.AI.Entities;

public class ChatGptResult
{
    public CriteriaEstimateGpt[] CriteriaEstimates { get; set; } = [];

    public string[] Pluses { get; set; } = [];

    public string[] Minuses { get; set; } = [];

    public string[] Recommendations { get; set; } = [];
}