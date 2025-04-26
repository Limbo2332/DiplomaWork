using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DLL.Repositories;

public class GlobalCriteriaRepository : IGlobalCriteriaRepository
{
    private readonly BusinessesContext _context;

    public GlobalCriteriaRepository(BusinessesContext context)
    {
        _context = context;
    }

    public Task<GlobalCriteria?> GetGlobalCriteriaAsync()
    {
        return _context.GlobalCriteria
            .Include(c => c.Criteria)
            .FirstOrDefaultAsync(x => x.Fresh);
    }

    public async Task ReplaceGlobalCriteriaAsync(GlobalCriteria globalCriteria)
    {
        await _context.GlobalCriteria.ExecuteUpdateAsync(c => c.SetProperty(x => x.Fresh, false));
        
        await _context.GlobalCriteria.AddAsync(globalCriteria);
        await _context.SaveChangesAsync();
    }
}