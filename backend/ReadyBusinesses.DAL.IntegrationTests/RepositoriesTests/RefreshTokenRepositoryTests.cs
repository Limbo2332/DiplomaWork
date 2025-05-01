using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;

namespace ReadyBusinesses.DAL.IntegrationTests.RepositoriesTests;

public class RefreshTokenRepositoryTests
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
    public async Task AddRefreshTokenAsync_SavesToken()
    {
        using var context = CreateContext();
        var repo = new RefreshTokenRepository(context);
        var token = new RefreshToken
        {
            Id = 1,
            UserId = Guid.NewGuid(),
            Token = "token123"
        };

        await repo.AddRefreshTokenAsync(token);

        var savedToken = await context.RefreshTokens.FindAsync(1);
        Assert.NotNull(savedToken);
        Assert.Equal("token123", savedToken.Token);
    }

    [Fact]
    public async Task GetRefreshTokenByUserIdAndTokenAsync_ReturnsCorrectToken()
    {
        using var context = CreateContext();
        var userId = Guid.NewGuid();
        var token = new RefreshToken
        {
            Id = 1,
            UserId = userId,
            Token = "valid-token"
        };

        await context.RefreshTokens.AddAsync(token);
        await context.SaveChangesAsync();

        var repo = new RefreshTokenRepository(context);
        var result = await repo.GetRefreshTokenByUserIdAndTokenAsync(userId, "valid-token");

        Assert.NotNull(result);
        Assert.Equal("valid-token", result!.Token);
    }

    [Fact]
    public async Task GetRefreshTokenByUserIdAndTokenAsync_ReturnsNullIfNotFound()
    {
        using var context = CreateContext();
        var repo = new RefreshTokenRepository(context);

        var result = await repo.GetRefreshTokenByUserIdAndTokenAsync(Guid.NewGuid(), "nonexistent");
        Assert.Null(result);
    }

    [Fact]
    public async Task GetRefreshTokenByUserIdAsync_ReturnsToken()
    {
        using var context = CreateContext();
        var userId = Guid.NewGuid();
        var token = new RefreshToken
        {
            Id = 1,
            UserId = userId,
            Token = "token-by-user"
        };

        await context.RefreshTokens.AddAsync(token);
        await context.SaveChangesAsync();

        var repo = new RefreshTokenRepository(context);
        var result = await repo.GetRefreshTokenByUserIdAsync(userId);

        Assert.NotNull(result);
        Assert.Equal("token-by-user", result!.Token);
    }

    [Fact]
    public async Task GetRefreshTokenByUserIdAsync_ReturnsNull_IfNotExists()
    {
        using var context = CreateContext();
        var repo = new RefreshTokenRepository(context);

        var result = await repo.GetRefreshTokenByUserIdAsync(Guid.NewGuid());
        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteAsync_RemovesToken_IfExists()
    {
        using var context = CreateContext();
        var token = new RefreshToken
        {
            Id = 100,
            UserId = Guid.NewGuid(),
            Token = "delete-me"
        };

        await context.RefreshTokens.AddAsync(token);
        await context.SaveChangesAsync();

        var repo = new RefreshTokenRepository(context);
        await repo.DeleteAsync(100);

        var deleted = await context.RefreshTokens.FindAsync(100);
        Assert.Null(deleted);
    }

    [Fact]
    public async Task DeleteAsync_DoesNothing_IfTokenNotFound()
    {
        using var context = CreateContext();
        var repo = new RefreshTokenRepository(context);

        var initialCount = await context.RefreshTokens.CountAsync();
        await repo.DeleteAsync(999); // non-existent ID
        var finalCount = await context.RefreshTokens.CountAsync();

        Assert.Equal(initialCount, finalCount); // nothing changed
    }
}