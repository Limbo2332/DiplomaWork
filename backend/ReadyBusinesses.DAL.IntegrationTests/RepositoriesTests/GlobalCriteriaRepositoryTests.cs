using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;

namespace ReadyBusinesses.DAL.IntegrationTests.RepositoriesTests;

public class GlobalCriteriaRepositoryTests
{
    private BusinessesContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<BusinessesContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new BusinessesContext(options);
    }

    [Fact]
    public async Task GetGlobalCriteriaAsync_Returns_CorrectData()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<BusinessesContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        var context = new BusinessesContext(options);
        
        var criteria = new List<Criteria>
        {
            new() { Name = "Test" }
        };
        context.GlobalCriteria.Add(new GlobalCriteria
        {
            Id = Guid.NewGuid(), 
            Criteria = criteria
        });
        await context.SaveChangesAsync();

        var repo = new GlobalCriteriaRepository(context);

        // Act
        var result = await repo.GetGlobalCriteriaAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Single(result.Criteria);
        Assert.Equal("Test", result.Criteria.First().Name);
    }

    [Fact]
    public async Task ReplaceGlobalCriteriaAsync_Updates_GlobalCriteria()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var initialCriteria = new List<Criteria> { new Criteria { Name = "Old" } };
        var globalCriteria = new GlobalCriteria { Id = Guid.NewGuid(), Fresh = false, Criteria = initialCriteria };
        context.GlobalCriteria.Add(globalCriteria);
        await context.SaveChangesAsync();

        var updatedCriteria = new List<Criteria> { new Criteria { Name = "New" } };
        var updatedGlobalCriteria = new GlobalCriteria { Id = globalCriteria.Id, Fresh = true, Criteria = updatedCriteria };

        var repo = new GlobalCriteriaRepository(context);

        // Act
        await repo.ReplaceGlobalCriteriaAsync(updatedGlobalCriteria);

        // Assert
        var result = await context.GlobalCriteria.Include(g => g.Criteria).FirstAsync();
        Assert.True(result.Fresh);
        Assert.Single(result.Criteria);
        Assert.Equal("New", result.Criteria.First().Name);
    }

    [Fact]
    public async Task ReplaceGlobalCriteriaAsync_Throws_When_NotFound()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var repo = new GlobalCriteriaRepository(context);
        var newCriteria = new GlobalCriteria { Id = Guid.NewGuid(), Fresh = true, Criteria = new List<Criteria>() };

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            repo.ReplaceGlobalCriteriaAsync(newCriteria));
    }
}