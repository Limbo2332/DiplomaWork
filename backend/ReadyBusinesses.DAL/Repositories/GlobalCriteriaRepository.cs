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
            .FirstOrDefaultAsync();
    }

    public async Task ReplaceGlobalCriteriaAsync(GlobalCriteria globalCriteria)
    {
        var existing = await _context.GlobalCriteria
            .Include(gc => gc.Criteria)
            .FirstOrDefaultAsync(gc => gc.Id == globalCriteria.Id);

        if (existing == null)
        {
            throw new InvalidOperationException("GlobalCriteria not found");
        }
        
        existing.Fresh = globalCriteria.Fresh;
        
        existing.Criteria.Clear();
        foreach (var criteria in globalCriteria.Criteria)
        {
            existing.Criteria.Add(criteria);
        }

        await _context.SaveChangesAsync();
    }
}