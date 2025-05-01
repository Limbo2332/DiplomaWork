using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;

namespace ReadyBusinesses.DAL.IntegrationTests.RepositoriesTests;

public class RecommendationRepositoryTests
{
    private BusinessesContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<BusinessesContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new BusinessesContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    [Fact]
    public async Task AddRecommendationAsync_SavesRecommendationToDatabase()
    {
        // Arrange
        using var context = CreateContext();
        var repository = new RecommendationRepository(context);

        var recommendation = new Recommendation
        {
            Id = Guid.NewGuid(),
            Recommendations = ["Highly recommended"],
            GivenById = Guid.NewGuid()
        };

        // Act
        await repository.AddRecommendationAsync(recommendation);

        // Assert
        var saved = await context.Recommendations.FindAsync(recommendation.Id);
        Assert.NotNull(saved);
        Assert.Equal("Highly recommended", saved.Recommendations.First());
    }

    [Fact]
    public async Task GetExpertRecommendationsAsync_ReturnsOnlyExpertRecommendations()
    {
        // Arrange
        using var context = CreateContext();
        var recommendationRepo = new RecommendationRepository(context);

        var businessId = Guid.NewGuid();

        var expertUserId = Guid.NewGuid();
        var regularUserId = (Guid?)null;

        var expertRecommendation = new Recommendation
        {
            Id = Guid.NewGuid(),
            GivenById = expertUserId,
            Recommendations = ["Expert recommendation"],
            CriteriaEstimates = new List<CriteriaEstimate>(),
            GivenBy = new User { Id = expertUserId }
        };

        var nonExpertRecommendation = new Recommendation
        {
            Id = Guid.NewGuid(),
            GivenById = regularUserId,
            Recommendations = ["Anonymous recommendation"]
        };

        var post = new Post
        {
            Id = businessId,
            Recommendations = new List<PostRecommendation>
            {
                new PostRecommendation
                {
                    PostId = businessId,
                    Recommendation = expertRecommendation,
                    RecommendationId = expertRecommendation.Id
                },
                new PostRecommendation
                {
                    PostId = businessId,
                    Recommendation = nonExpertRecommendation,
                    RecommendationId = nonExpertRecommendation.Id
                }
            }
        };

        await context.Posts.AddAsync(post);
        await context.SaveChangesAsync();

        // Act
        var expertRecs = await recommendationRepo.GetExpertRecommendationsAsync(businessId);

        // Assert
        Assert.Single(expertRecs);
        Assert.Contains(expertRecs.SelectMany(r => r.Recommendations), r => r == "Expert recommendation");
        Assert.DoesNotContain(expertRecs.SelectMany(r => r.Recommendations), r => r == "Anonymous recommendation");
    }

    [Fact]
    public async Task GetExpertRecommendationsAsync_ReturnsEmpty_WhenPostNotFound()
    {
        // Arrange
        using var context = CreateContext();
        var repo = new RecommendationRepository(context);
        var fakeBusinessId = Guid.NewGuid();

        // Act
        var result = await repo.GetExpertRecommendationsAsync(fakeBusinessId);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }
}