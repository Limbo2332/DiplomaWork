using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;

namespace ReadyBusinesses.DAL.IntegrationTests.RepositoriesTests;

public class BusinessesRepositoryTests
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
    public async Task SavePostAsync_SavesPostToDatabase()
    {
        // Arrange
        using var context = CreateContext();
        var repo = new BusinessesRepository(context);
        var post = new Post { Id = Guid.NewGuid(), BusinessStatus = BusinessStatus.Approved };

        // Act
        await repo.SavePostAsync(post);

        // Assert
        var savedPost = await context.Posts.FindAsync(post.Id);
        Assert.NotNull(savedPost);
    }

    [Fact]
    public async Task GetPostByIdAsync_ReturnsCorrectPost()
    {
        using var context = CreateContext();
        var postId = Guid.NewGuid();
        var post = new Post { Id = postId };
        await context.Posts.AddAsync(post);
        await context.SaveChangesAsync();

        var repo = new BusinessesRepository(context);

        var result = await repo.GetPostByIdAsync(postId);

        Assert.NotNull(result);
        Assert.Equal(postId, result!.Id);
    }

    [Fact]
    public async Task AddToFavoritesAsync_AddsSavedPost()
    {
        using var context = CreateContext();
        var post = new Post { Id = Guid.NewGuid() };
        var user = new User { Id = Guid.NewGuid() };
        await context.Posts.AddAsync(post);
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();

        var repo = new BusinessesRepository(context);
        await repo.AddToFavoritesAsync(post, user);

        var saved = context.SavedPosts.FirstOrDefault(p => p.PostId == post.Id && p.UserId == user.Id);
        Assert.NotNull(saved);
    }

    [Fact]
    public async Task RemoveFromFavoritesAsync_RemovesSavedPost()
    {
        using var context = CreateContext();
        var post = new Post { Id = Guid.NewGuid() };
        var user = new User { Id = Guid.NewGuid() };
        var saved = new SavedPosts { PostId = post.Id, UserId = user.Id, Post = post, User = user };
        await context.SavedPosts.AddAsync(saved);
        await context.SaveChangesAsync();

        var repo = new BusinessesRepository(context);
        await repo.RemoveFromFavoritesAsync(post.Id, user.Id);

        Assert.Null(await context.SavedPosts.FirstOrDefaultAsync(p => p.PostId == post.Id && p.UserId == user.Id));
    }

    [Fact]
    public async Task ViewPostAsync_OnlyAddsOnce()
    {
        using var context = CreateContext();
        var post = new Post { Id = Guid.NewGuid() };
        var user = new User { Id = Guid.NewGuid() };
        await context.Posts.AddAsync(post);
        await context.Users.AddAsync(user);
        await context.ViewedPosts.AddAsync(new ViewedPosts { PostId = post.Id, UserId = user.Id });
        await context.SaveChangesAsync();

        var repo = new BusinessesRepository(context);
        await repo.ViewPostAsync(post, user);

        var count = await context.ViewedPosts.CountAsync(p => p.PostId == post.Id && p.UserId == user.Id);
        Assert.Equal(1, count);
    }
}