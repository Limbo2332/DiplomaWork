using Microsoft.AspNetCore.Http;
using Moq;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Exceptions;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DAL.UnitTests;

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IUserIdGetter> _userIdGetterMock;
    private readonly UserService _userService;

    public UserServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _userIdGetterMock = new Mock<IUserIdGetter>();
        _userService = new UserService(_userRepositoryMock.Object, _userIdGetterMock.Object);
    }

    [Fact]
    public async Task GetProfileAsync_ReturnsProfileDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(userId);

        var userWithProfile = new User
        {
            Id = userId,
            FullName = "Test User",
            Description = "Test Description",
            ProfileAvatar = new Picture { Id = Guid.NewGuid(), Data = new byte[] { } }
        };

        var socialMedias = new List<SocialMedia>
        {
            new SocialMedia { Id = Guid.NewGuid(), Link = "https://facebook.com/test", Type = SocialMediaType.Facebook },
            new SocialMedia { Id = Guid.NewGuid(), Link = "https://twitter.com/test", Type = SocialMediaType.Twitter }
        };

        _userRepositoryMock.Setup(x => x.GetUserWithProfileAsync(userId)).ReturnsAsync(userWithProfile);
        _userRepositoryMock.Setup(x => x.GetSocialMediaAsync(userId)).ReturnsAsync(socialMedias);

        // Act
        var result = await _userService.GetProfileAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test User", result.FullName);
        Assert.Equal("Test Description", result.Description);
        Assert.Equal("https://facebook.com/test", result.FacebookLink);
        Assert.Equal("https://twitter.com/test", result.TwitterLink);
        Assert.NotNull(result.ProfileImagePath);
    }

    [Fact]
    public async Task SetProfileAsync_UpdatesUserProfile()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(userId);

        var currentUser = new User { Id = userId };
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(currentUser);

        var profileDto = new SetProfileDto
        {
            Description = "New Description",
            FacebookLink = "https://facebook.com/new",
            TwitterLink = "https://twitter.com/new",
            ProfileImage = new Mock<IFormFile>().Object // Mock IFormFile
        };

        // Act
        await _userService.SetProfileAsync(profileDto);

        // Assert
        _userRepositoryMock.Verify(x => x.AddSocialMediasAsync(It.IsAny<List<SocialMedia>>(), currentUser), Times.Once);
        _userRepositoryMock.Verify(x => x.UpdateUserDescriptionAsync(userId, "New Description"), Times.Once);
        _userRepositoryMock.Verify(x => x.UpdateUserAvatarProfileAsync(currentUser, It.IsAny<Picture>()), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsAuthorDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var author = new User { Id = userId, FullName = "Test Author" };
        var socialMedias = new List<SocialMedia>
        {
            new SocialMedia { Id = Guid.NewGuid(), Link = "https://facebook.com/test", Type = SocialMediaType.Facebook }
        };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(author);
        _userRepositoryMock.Setup(x => x.GetSocialMediaAsync(userId)).ReturnsAsync(socialMedias);

        // Act
        var result = await _userService.GetByIdAsync(userId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Author", result.Name);
        Assert.Equal("https://facebook.com/test", result.Facebook);
    }

    [Fact]
    public async Task GetByIdAsync_ThrowsNotFoundException_WhenAuthorIsNull()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync((User)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _userService.GetByIdAsync(userId));
    }
}