using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Recommendation;

namespace ReadyBusinesses.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class RecommendationController : Controller
{
    private readonly IRecommendationService _recommendationService;

    public RecommendationController(IRecommendationService recommendationService)
    {
        _recommendationService = recommendationService;
    }
    
    [HttpPost("start")]
    public async Task<ActionResult<RecommendationDto>> StartAiRecommendation(StartRecommendationDto startRecommendationDto)
    {
        return Ok(await _recommendationService.StartAiRecommendationAsync(startRecommendationDto));
    }
}