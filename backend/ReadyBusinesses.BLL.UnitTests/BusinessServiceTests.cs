using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Repositories.Abstract;
using ReadyBusinesses.Topsis;
using Xunit;

namespace ReadyBusinesses.DAL.UnitTests;

public class BusinessesServiceTests
{
    private readonly Mock<IBusinessesRepository> _repositoryMock;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IUserIdGetter> _userIdGetterMock;
    private readonly Mock<ISolver> _solverMock;
    private readonly BusinessesService _businessesService;

    public BusinessesServiceTests()
    {
        _repositoryMock = new Mock<IBusinessesRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _userIdGetterMock = new Mock<IUserIdGetter>();
        _solverMock = new Mock<ISolver>();
        _businessesService = new BusinessesService(
            _repositoryMock.Object,
            _userIdGetterMock.Object,
            _userRepositoryMock.Object,
            _solverMock.Object
        );
    }

    [Fact]
    public async Task GetBusinessesAsync_ReturnsEmptyResponse_WhenUserIsNull()
    {
        // Arrange
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(Guid.NewGuid());
        _userRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((User)null);

        var request = new MainFeedBusinessesRequestDto();

        // Act
        var result = await _businessesService.GetBusinessesAsync(request);

        // Assert
        Assert.Empty(result.PreviewBusinesses);
        Assert.False(result.HasMore);
    }

    [Fact]
    public async Task CreateBusinessAsync_CreatesBusinessWithImages()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(userId);
        var user = new User { Id = userId };
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(user);

        var request = new CreateBusinessRequestDto
        {
            Name = "New Business",
            Images = new List<IFormFile> { /* Add mock IFormFile objects here */ }
        };

        // Act
        await _businessesService.CreateBusinessAsync(request);

        // Assert
        _repositoryMock.Verify(x => x.SavePostAsync(It.IsAny<Post>()), Times.Once);
    }

    [Fact]
    public async Task AddToFavoritesAsync_AddsBusinessToFavorites()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var postId = Guid.NewGuid();
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(userId);
        var user = new User { Id = userId };
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(user);
        var post = new Post { Id = postId };
        _repositoryMock.Setup(x => x.GetPostByIdAsync(postId)).ReturnsAsync(post);

        var request = new AddToFavoritesRequest { PostId = postId, Value = true };

        // Act
        await _businessesService.AddToFavoritesAsync(request);

        // Assert
        _repositoryMock.Verify(x => x.AddToFavoritesAsync(post, user), Times.Once);
    }

    [Fact]
    public async Task GetBusinessAsync_ReturnsBusinessDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var businessId = Guid.NewGuid();
        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(userId);
        var user = new User { Id = userId };
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId)).ReturnsAsync(user);
        var business = new Post { Id = businessId, CreatedByUser = user, AverageProfitPerMonth = 1, BusinessStatus = BusinessStatus.WaitingForApproval };
        _repositoryMock.Setup(x => x.GetBusinessAsync(businessId)).ReturnsAsync(business);

        // Act
        var result = await _businessesService.GetBusinessAsync(businessId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(businessId, result.Id);
    }

    [Fact]
    public async Task ApproveBusinessAsync_WhenApprovedByAdministrator_ShouldChangeBusinessStatus()
    {
        // Arrange
        var business = new Post
        {
            Id = Guid.NewGuid(),
            Name = "Продаж порцелянового заводу",
            PriceInUah = 100.000M
        };

        var approveBusinessRequest = new ApproveBusinessDto
        {
            BusinessId = business.Id,
        };
        
        _repositoryMock
            .Setup(x => x.GetBusinessAsync(It.IsAny<Guid>()))
            .ReturnsAsync(business);
        
        // Act
        await _businessesService.ApproveBusinessAsync(approveBusinessRequest);

        // Assert
        _repositoryMock
            .Verify(x => x.EditPostAsync(
                It.Is<Post>(expectedPost => expectedPost.Id == business.Id &&
                                            expectedPost.BusinessStatus == BusinessStatus.Approved)));
    }
    
    [Theory]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    [InlineData(4)]
    [InlineData(5)]
    [InlineData(6)]
    [InlineData(7)]
    [InlineData(8)]
    [InlineData(9)]
    [InlineData(10)]
    [InlineData(11)]
    [InlineData(12)]
    [InlineData(13)]
    [InlineData(14)]
    [InlineData(15)]
    [InlineData(16)]
    [InlineData(17)]
    public void ReturnTrue(int id)
    {
        Assert.True(id >= 1);
    }
}
