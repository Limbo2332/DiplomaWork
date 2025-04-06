using ReadyBusinesses.AI;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Recommendation;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Exceptions;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;
using ReadyBusinesses.Topsis;

namespace ReadyBusinesses.BLL.Services;

public class RecommendationService : IRecommendationService
{
    private readonly IAiClient _aiClient;
    private readonly IBusinessesRepository _businessesRepository;
    private readonly IRecommendationRepository _recommendationRepository;

    public RecommendationService(IAiClient aiClient, IBusinessesRepository businessesRepository, IRecommendationRepository recommendationRepository)
    {
        _aiClient = aiClient;
        _businessesRepository = businessesRepository;
        _recommendationRepository = recommendationRepository;
    }

    public async Task<RecommendationDto> StartAiRecommendationAsync(StartRecommendationDto startRecommendationDto)
    {
        var post = await _businessesRepository.GetBusinessWithoutDependenciesByIdAsync(startRecommendationDto.BusinessId);

        if (post is null)
        {
            throw new NotFoundException("Post is undefined");
        }

        var aiResult = await _aiClient.AskRecommendationAsync(post);

        var locationScore = (double) Math.Round(aiResult.CriteriaMatrix[0], 2) * 10;
        var financialScore = Math.Round(
            (double) Math.Round(aiResult.CriteriaMatrix[1], 2) * 10 +
                             (double)(1 - Math.Round(aiResult.CriteriaMatrix[2], 2)) * 10 +
                             (double)(1 - Math.Round(aiResult.CriteriaMatrix[3], 2)) * 10 / 3 +
                             (double) Math.Round(aiResult.CriteriaMatrix[4], 2) * 10 / 3 +
                             (double) Math.Round(aiResult.CriteriaMatrix[5], 2) * 10 / 3, 
            2);

        var adaptionScore = (double) Math.Round(aiResult.CriteriaMatrix[6], 2) * 10;
        var teamScore = (double) Math.Round(aiResult.CriteriaMatrix[7], 2) * 15;
        var supportScore = (double) Math.Round(aiResult.CriteriaMatrix[8], 2) * 5;
        var popularityScore = (double) Math.Round(aiResult.CriteriaMatrix[9], 2) * 10;
        var shiScore = (double) Math.Round(aiResult.CriteriaMatrix[10], 2) * 20;

        var recommendationDto = new RecommendationDto
        {
            BusinessId = post.Id,
            Minuses = aiResult.Minuses,
            Pluses = aiResult.Pluses,
            Recommendations = aiResult.Recommendations,
            LocationScore = locationScore,
            FinancialScore = financialScore,
            AdaptationScore = adaptionScore,
            TeamScore = teamScore,
            SupportScore = supportScore,
            PopularityScore = popularityScore,
            ShiScore = shiScore,
            RatingScore = locationScore + financialScore + adaptionScore + teamScore + supportScore + popularityScore +
                          shiScore
        };
        
        var recommendationToAdd = RecommendationDtoToRecommendation.ToRecommendation(
            recommendationDto, 
            aiResult.CriteriaMatrix, 
            Solver.CriteriaWeightsForChatGpt,
            isAI: true);
        
        await _recommendationRepository.AddRecommendationAsync(recommendationToAdd);
        
        post.Recommendations.Add(new PostRecommendation
        {
            PostId = post.Id,
            RecommendationId = recommendationToAdd.Id
        });
        
        await _businessesRepository.EditPostAsync(post);

        return recommendationDto;
    }
}