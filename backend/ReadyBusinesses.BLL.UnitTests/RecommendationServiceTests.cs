using Moq;
using ReadyBusinesses.AI;
using ReadyBusinesses.AI.Entities;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Exceptions;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.DAL.UnitTests;

public class RecommendationServiceTests
{
    private readonly Mock<IAiClient> _aiClientMock;
    private readonly Mock<IBusinessesRepository> _businessesRepositoryMock;
    private readonly Mock<IRecommendationRepository> _recommendationRepositoryMock;
    private readonly Mock<IUserIdGetter> _userIdGetterMock;
    private readonly Mock<IGlobalCriteriaService> _globalCriteriaServiceMock;
    private RecommendationService _recommendationService;

    public RecommendationServiceTests()
    {
        _aiClientMock = new Mock<IAiClient>();
        _businessesRepositoryMock = new Mock<IBusinessesRepository>();
        _recommendationRepositoryMock = new Mock<IRecommendationRepository>();
        _userIdGetterMock = new Mock<IUserIdGetter>();
        _globalCriteriaServiceMock = new Mock<IGlobalCriteriaService>();
        _recommendationService = new RecommendationService(
            _aiClientMock.Object,
            _businessesRepositoryMock.Object,
            _recommendationRepositoryMock.Object,
            _userIdGetterMock.Object,
            _globalCriteriaServiceMock.Object
        );
    }

    [Fact]
    public async Task StartAiRecommendationAsync_ThrowsNotFoundException_WhenPostIsNull()
    {
        // Arrange
        var startRecommendationDto = new StartRecommendationDto { BusinessId = Guid.NewGuid() };
        _businessesRepositoryMock
            .Setup(x => x.GetBusinessWithoutDependenciesByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync((Post)null);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _recommendationService.StartAiRecommendationAsync(startRecommendationDto));
    }

    [Fact]
    public async Task StartAiRecommendationAsync_ReturnsRecommendationDto()
    {
        // Arrange
        var businessId = Guid.NewGuid();
        var startRecommendationDto = new StartRecommendationDto { BusinessId = businessId };
        var post = new Post { Id = businessId };
        var globalCriteria = new GlobalCriteriaDto { Criteria = new CriteriaDto[0] };
        var aiResult = new ChatGptResult
        {
            Minuses = new string[0],
            Pluses = new string[0],
            Recommendations = new string[0],
            CriteriaEstimates = []
        };

        _businessesRepositoryMock.Setup(x => x.GetBusinessWithoutDependenciesByIdAsync(businessId)).ReturnsAsync(post);
        _globalCriteriaServiceMock.Setup(x => x.GetCriteriaAsync()).ReturnsAsync(globalCriteria);
        _aiClientMock.Setup(x => x.AskRecommendationAsync(post, globalCriteria.Criteria)).ReturnsAsync(aiResult);
        
        _recommendationService = new RecommendationService(
            _aiClientMock.Object,
            _businessesRepositoryMock.Object,
            _recommendationRepositoryMock.Object,
            _userIdGetterMock.Object,
            _globalCriteriaServiceMock.Object
        );

        // Act
        var result = await _recommendationService.StartAiRecommendationAsync(startRecommendationDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(businessId, result.BusinessId);
    }

    [Fact]
    public async Task CreateRecommendationAsync_AddsRecommendationToRepository()
    {
        // Arrange
        var createRecommendationDto = new CreateRecommendationDto
        {
            BusinessId = Guid.NewGuid(),
            Minuses = new string[0],
            Pluses = new string[0],
            Recommendations = new string[0],
            CriteriaEstimates = new CriteriaEstimateDto[0],
            ByAi = true
        };
        var globalCriteria = new GlobalCriteriaDto { Criteria = new CriteriaDto[0] };
        var currentUserId = Guid.NewGuid();

        _userIdGetterMock.Setup(x => x.CurrentUserId).Returns(currentUserId);
        _globalCriteriaServiceMock.Setup(x => x.GetCriteriaAsync()).ReturnsAsync(globalCriteria);

        // Act
        var result = await _recommendationService.CreateRecommendationAsync(createRecommendationDto);

        // Assert
        _recommendationRepositoryMock.Verify(x => x.AddRecommendationAsync(It.IsAny<Recommendation>()), Times.Once);
        _businessesRepositoryMock.Verify(x => x.AddPostRecommendationAsync(createRecommendationDto.BusinessId, It.IsAny<Guid>()), Times.Once);
        Assert.NotNull(result);
        Assert.Equal(createRecommendationDto.BusinessId, result.BusinessId);
    }

    [Fact]
    public async Task GetExpertRecommendationsAsync_ReturnsExpertRecommendations()
    {
        // Arrange
        var businessId = Guid.NewGuid();
        var recommendations = new List<Recommendation>
        {
            new Recommendation { Id = Guid.NewGuid(), GivenBy = new User { Id = Guid.NewGuid() } },
            new Recommendation { Id = Guid.NewGuid(), GivenBy = new User { Id = Guid.NewGuid() } }
        };

        _recommendationRepositoryMock.Setup(x => x.GetExpertRecommendationsAsync(businessId)).ReturnsAsync(recommendations);

        // Act
        var result = await _recommendationService.GetExpertRecommendationsAsync(businessId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }
}