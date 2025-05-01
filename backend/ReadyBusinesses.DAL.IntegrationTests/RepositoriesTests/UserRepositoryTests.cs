using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;

namespace ReadyBusinesses.DAL.IntegrationTests.RepositoriesTests;

public class UserRepositoryTests
{
    private BusinessesContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<BusinessesContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new BusinessesContext(options);
    }

    [Fact]
    public async Task AddAsync_SavesUserToDatabase()
    {
        using var context = CreateContext();
        var repo = new UserRepository(context);
        var user = new User { Id = Guid.NewGuid(), Email = "test@example.com" };

        await repo.AddAsync(user);

        var result = await context.Users.FindAsync(user.Id);
        Assert.NotNull(result);
        Assert.Equal("test@example.com", result.Email);
    }

    [Fact]
    public async Task GetByEmailAsync_ReturnsCorrectUser()
    {
        using var context = CreateContext();
        var user = new User { Id = Guid.NewGuid(), Email = "found@example.com" };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        var result = await repo.GetByEmailAsync("found@example.com");

        Assert.NotNull(result);
        Assert.Equal(user.Id, result!.Id);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsUserWithSavedPosts()
    {
        using var context = CreateContext();
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = "user@saved.com",
            SavedPosts = new List<SavedPosts> { new SavedPosts { PostId = Guid.NewGuid() } }
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        var result = await repo.GetByIdAsync(user.Id);

        Assert.NotNull(result);
        Assert.Single(result!.SavedPosts);
    }

    [Fact]
    public async Task UpdateAsync_UpdatesUser()
    {
        using var context = CreateContext();
        var user = new User { Id = Guid.NewGuid(), Email = "before@example.com" };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        user.Email = "after@example.com";
        var repo = new UserRepository(context);
        await repo.UpdateAsync(user);

        var result = await context.Users.FindAsync(user.Id);
        Assert.Equal("after@example.com", result.Email);
    }

    [Fact]
    public async Task GetUserWithProfileAsync_ReturnsUserWithAvatar()
    {
        using var context = CreateContext();
        var avatar = new Picture { Id = Guid.NewGuid() };
        var user = new User { Id = Guid.NewGuid(), ProfileAvatar = avatar, ProfileAvatarId = avatar.Id };

        context.Pictures.Add(avatar);
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        var result = await repo.GetUserWithProfileAsync(user.Id);

        Assert.NotNull(result);
        Assert.NotNull(result.ProfileAvatar);
    }

    [Fact]
    public async Task AddSocialMediasAsync_AddsLinksToUser()
    {
        using var context = CreateContext();
        var socialMedia = new SocialMedia { Id = Guid.NewGuid(), Link = "LinkedIn" };
        var user = new User { Id = Guid.NewGuid() };
        await context.Users.AddAsync(user);
        await context.SocialMedias.AddAsync(socialMedia);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        await repo.AddSocialMediasAsync(new[] { socialMedia }, user);

        var result = await context.UserSocialMedias
            .Where(um => um.UserId == user.Id)
            .ToListAsync();

        Assert.Single(result);
        Assert.Equal(socialMedia.Id, result.First().SocialMediaId);
    }

    [Fact]
    public async Task UpdateUserDescriptionAsync_UpdatesDescription()
    {
        using var context = CreateContext();
        var user = new User { Id = Guid.NewGuid(), Description = "Old" };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        await repo.UpdateUserDescriptionAsync(user.Id, "New");

        var result = await context.Users.FindAsync(user.Id);
        Assert.Equal("New", result.Description);
    }

    [Fact]
    public async Task UpdateUserAvatarProfileAsync_UpdatesAvatar()
    {
        using var context = CreateContext();
        var user = new User { Id = Guid.NewGuid() };
        var picture = new Picture { Id = Guid.NewGuid(), Name = "avatar.png" };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        await repo.UpdateUserAvatarProfileAsync(user, picture);

        var updatedUser = await context.Users.FindAsync(user.Id);
        Assert.Equal(picture.Id, updatedUser.ProfileAvatarId);

        var savedPicture = await context.Pictures.FindAsync(picture.Id);
        Assert.NotNull(savedPicture);
    }

    [Fact]
    public async Task AddPostPictureAsync_SavesPostPicture()
    {
        using var context = CreateContext();
        var postPicture = new PostPicture { PostId = Guid.NewGuid(), PictureId = Guid.NewGuid() };

        var repo = new UserRepository(context);
        await repo.AddPostPictureAsync(postPicture);

        var result = await context.PostPictures.FindAsync(postPicture.PostId, postPicture.PictureId);
        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetPostPictureAsync_ReturnsPostPicture()
    {
        using var context = CreateContext();
        var postPicture = new PostPicture { PostId = Guid.NewGuid(), PictureId = Guid.NewGuid() };
        context.PostPictures.Add(postPicture);
        await context.SaveChangesAsync();

        var repo = new UserRepository(context);
        var result = await repo.GetPostPictureAsync(postPicture.PictureId);

        Assert.NotNull(result);
        Assert.Equal(postPicture.PostId, result.PostId);
    }

    [Fact]
    public async Task AddPictureAsync_SavesPicture()
    {
        using var context = CreateContext();
        var picture = new Picture { Id = Guid.NewGuid(), Name = "image.jpg" };

        var repo = new UserRepository(context);
        var result = await repo.AddPictureAsync(picture);

        Assert.NotNull(result);
        Assert.Equal("image.jpg", result.Name);
    }
}