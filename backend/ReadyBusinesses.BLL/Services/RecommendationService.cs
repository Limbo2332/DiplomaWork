using ReadyBusinesses.AI;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Exceptions;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.BLL.Services;

public class RecommendationService : IRecommendationService
{
    private readonly IAiClient _aiClient;
    private readonly IBusinessesRepository _businessesRepository;
    private readonly IRecommendationRepository _recommendationRepository;
    private readonly IUserIdGetter _userIdGetter;
    private readonly IGlobalCriteriaService _globalCriteriaService;

    public RecommendationService(IAiClient aiClient, 
        IBusinessesRepository businessesRepository, 
        IRecommendationRepository recommendationRepository, 
        IUserIdGetter userIdGetter, 
        IGlobalCriteriaService globalCriteriaService)
    {
        _aiClient = aiClient;
        _businessesRepository = businessesRepository;
        _recommendationRepository = recommendationRepository;
        _userIdGetter = userIdGetter;
        _globalCriteriaService = globalCriteriaService;
    }

    public async Task<RecommendationDto> StartAiRecommendationAsync(StartRecommendationDto startRecommendationDto)
    {
        var post = await _businessesRepository.GetBusinessWithoutDependenciesByIdAsync(startRecommendationDto.BusinessId);
        var globalCriteria = await _globalCriteriaService.GetCriteriaAsync();

        if (post is null)
        {
            throw new NotFoundException("Post is undefined");
        }

        var aiResult = await _aiClient.AskRecommendationAsync(post, globalCriteria.Criteria);

        var createRecommendationDto = new CreateRecommendationDto
        {
            BusinessId = post.Id,
            Minuses = aiResult.Minuses,
            Pluses = aiResult.Pluses,
            Recommendations = aiResult.Recommendations,
            CriteriaEstimates = aiResult.CriteriaEstimates.Select(x => x.ToCriteriaEstimateDto(globalCriteria.Criteria)),
            ByAi = true
        };

        return await CreateRecommendationAsync(createRecommendationDto);
    }

    public async Task<RecommendationDto> CreateRecommendationAsync(CreateRecommendationDto createRecommendationDto)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var globalCriteria = await _globalCriteriaService.GetCriteriaAsync();
        
        var recommendationToAdd = createRecommendationDto.ToRecommendation(currentUserId, globalCriteria);
        
        await _recommendationRepository.AddRecommendationAsync(recommendationToAdd);
        await _businessesRepository.AddPostRecommendationAsync(createRecommendationDto.BusinessId,
            recommendationToAdd.Id);

        return recommendationToAdd.ToRecommendationDto(createRecommendationDto.BusinessId);
    }

    public async Task<IEnumerable<ExpertRecommendationDto>> GetExpertRecommendationsAsync(Guid businessId)
    {
        var recommendations = await _recommendationRepository.GetExpertRecommendationsAsync(businessId);

        return recommendations.Select(r => RecommendationDtoToRecommendation.ToExpertRecommendationDto(r, businessId, r.GivenBy!));
    }
}