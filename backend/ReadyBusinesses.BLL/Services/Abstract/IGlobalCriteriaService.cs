using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IGlobalCriteriaService
{
    Task<GlobalCriteriaDto> GetCriteriaAsync();
    
    Task SetNewGlobalCriteriaAsync(GlobalCriteriaDto globalCriteriaDto);
}