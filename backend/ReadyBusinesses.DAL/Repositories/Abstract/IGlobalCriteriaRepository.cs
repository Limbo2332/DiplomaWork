using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Repositories.Abstract;

public interface IGlobalCriteriaRepository
{
    Task<GlobalCriteria?> GetGlobalCriteriaAsync();
    
    Task ReplaceGlobalCriteriaAsync(GlobalCriteria globalCriteria);
}