using ReadyBusinesses.AI;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.BLL.Services;

public class GlobalCriteriaService : IGlobalCriteriaService
{
    private readonly IGlobalCriteriaRepository _repository;
    private readonly IAiClient _aiClient;

    public GlobalCriteriaService(IGlobalCriteriaRepository repository, IAiClient aiClient)
    {
        _repository = repository;
        _aiClient = aiClient;
    }

    public async Task<GlobalCriteriaDto> GetCriteriaAsync()
    {
        var globalCriteria = await _repository.GetGlobalCriteriaAsync();

        if (globalCriteria is null)
        {
            globalCriteria = new GlobalCriteria
            {
                Criteria =
                [
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Локація розміщення бізнесу",
                        IsMaximized = true,
                        Weight = 0.1
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка чистого прибутку",
                        IsMaximized = true,
                        Weight = 0.1
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка окупності бізнесу",
                        IsMaximized = false,
                        Weight = 0.1,
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка ціни бізнесу",
                        IsMaximized = false,
                        Weight = 1d / 30d
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка середнього чеку",
                        IsMaximized = true,
                        Weight = 1d / 30d
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка середнього виторгу на місяць",
                        IsMaximized = true,
                        Weight = 1d / 30d
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка адаптації до нинішніх умов в Україні",
                        Description =
                            "Включає в себе - наявність укриття, генераторів, еко-флоу, інтеграції з державними сервісами та популярними приватними сервісами",
                        IsMaximized = true,
                        Weight = 0.1
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка команди, що працює в бізнесі",
                        Description =
                            "Персонал, менеджери, оцінка їх зарплати відповідно до ринкової, показники їх ефективності.",
                        IsMaximized = true,
                        Weight = 0.15
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка важливості підтримку бізнесу від колишнього власника",
                        Description = "Тобто наскільки легко буде адаптуватись в цій сфері бізнесу новачку",
                        IsMaximized = true,
                        Weight = 0.05
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Оцінка \"популярності\" бізнесу",
                        Description = "Включає наявність соціальних мереж та базу підписників",
                        IsMaximized = true,
                        Weight = 0.1
                    },
                    new Criteria
                    {
                        Id = Guid.NewGuid(),
                        Name = "Комплексна оцінка від ШІ/Експерта",
                        IsMaximized = true,
                        Weight = 0.2
                    }
                ]
            };
        }

        var globalCriteriaDto = globalCriteria.ToGlobalCriteriaDto();

        var orderedCriteria = globalCriteriaDto.Criteria
            .OrderByDescending(c => c.Weight)
            .ToArray();
        
        globalCriteriaDto.Criteria = orderedCriteria;
        return globalCriteriaDto;
    }

    public async Task SetNewGlobalCriteriaAsync(GlobalCriteriaDto globalCriteriaDto)
    {
        var globalCriteria = globalCriteriaDto.ToGlobalCriteria();

        await _repository.ReplaceGlobalCriteriaAsync(globalCriteria);
    }

    public async Task<GlobalCriteriaDto> GetNewCriteriaFromAiAsync()
    {
        var globalCriteria = await GetCriteriaAsync();
        
        var criteriaWeights = await _aiClient.GetCriteriaWeightsAsync(globalCriteria.Criteria);

        var newGlobalCriteriaDto = new GlobalCriteriaDto
        {
            Id = globalCriteria.Id,
            Criteria = criteriaWeights.CriteriaWeights.Select(w => w.ToCriteriaDto(globalCriteria)).ToArray(),
        };

        await SetNewGlobalCriteriaAsync(newGlobalCriteriaDto);
        
        return newGlobalCriteriaDto;
    }
}