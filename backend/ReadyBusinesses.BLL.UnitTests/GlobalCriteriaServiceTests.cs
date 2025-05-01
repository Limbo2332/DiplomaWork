using Moq;
using ReadyBusinesses.AI;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DAL.UnitTests;

public class GlobalCriteriaServiceTests
{
    private readonly Mock<IGlobalCriteriaRepository> _repositoryMock;
    private readonly Mock<IAiClient> _aiClientMock;
    private readonly GlobalCriteriaService _globalCriteriaService;

    public GlobalCriteriaServiceTests()
    {
        _repositoryMock = new Mock<IGlobalCriteriaRepository>();
        _aiClientMock = new Mock<IAiClient>();
        _globalCriteriaService = new GlobalCriteriaService(_repositoryMock.Object, _aiClientMock.Object);
    }

    [Fact]
    public async Task GetCriteriaAsync_ReturnsDefaultCriteria_WhenRepositoryReturnsNull()
    {
        // Arrange
        _repositoryMock.Setup(x => x.GetGlobalCriteriaAsync()).ReturnsAsync((GlobalCriteria)null);

        // Act
        var result = await _globalCriteriaService.GetCriteriaAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(11, result.Criteria.Length);
        Assert.True(result.Criteria.All(c => c.Weight > 0));
    }

    [Fact]
    public async Task GetCriteriaAsync_ReturnsCriteriaFromRepository_WhenRepositoryReturnsCriteria()
    {
        // Arrange
        var globalCriteria = new GlobalCriteria
        {
            Criteria = new[]
            {
                new Criteria { Id = Guid.NewGuid(), Name = "Criterion 1", Weight = 0.1 },
                new Criteria { Id = Guid.NewGuid(), Name = "Criterion 2", Weight = 0.2 }
            }
        };
        _repositoryMock.Setup(x => x.GetGlobalCriteriaAsync()).ReturnsAsync(globalCriteria);

        // Act
        var result = await _globalCriteriaService.GetCriteriaAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Criteria.Length);
        Assert.Equal("Criterion 2", result.Criteria.First().Name); // Ordered by weight descending
    }

    [Fact]
    public async Task SetNewGlobalCriteriaAsync_ReplacesGlobalCriteriaInRepository()
    {
        // Arrange
        var globalCriteriaDto = new GlobalCriteriaDto
        {
            Criteria = new[]
            {
                new CriteriaDto { Id = Guid.NewGuid(), Name = "Criterion 1", Weight = 0.1 },
                new CriteriaDto { Id = Guid.NewGuid(), Name = "Criterion 2", Weight = 0.2 }
            }
        };

        // Act
        await _globalCriteriaService.SetNewGlobalCriteriaAsync(globalCriteriaDto);

        // Assert
        _repositoryMock.Verify(x => x.ReplaceGlobalCriteriaAsync(It.IsAny<GlobalCriteria>()), Times.Once);
    }
}