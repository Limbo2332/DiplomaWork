namespace ReadyBusinesses.Common.Dto.Criteria;

public class GlobalCriteriaDto
{
    public Guid Id { get; set; }
    
    public CriteriaDto[] Criteria { get; set; } = [];
}