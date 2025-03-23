using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;

namespace ReadyBusinesses.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class BusinessesController : ControllerBase
{
    private readonly IBusinessesService _businessesService;

    public BusinessesController(IBusinessesService businessesService)
    {
        _businessesService = businessesService;
    }

    [HttpPost]
    public async Task<ActionResult<MainFeedBusinessesResponseDto>> GetBusinesses([FromBody] MainFeedBusinessesRequestDto request)
    {
        return Ok(await _businessesService.GetBusinessesAsync(request));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BusinessDto>> GetBusiness([FromRoute] Guid id)
    {
        return Ok(await _businessesService.GetBusinessAsync(id));
    }

    [HttpPost("adminFeed")]
    public async Task<ActionResult<MainFeedBusinessesResponseDto>> GetUnapprovedBusinesses([FromBody] AdminFeedBusinessesRequestDto request)
    {
        return Ok(await _businessesService.GetUnapprovedBusinessesAsync(request));
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateBusiness([FromForm] CreateBusinessRequestDto request)
    {
        await _businessesService.CreateBusinessAsync(request);

        return Ok();
    }

    [HttpPost("favorites")]
    public async Task<IActionResult> AddToFavorites([FromBody] AddToFavoritesRequest request)
    {
        await _businessesService.AddToFavoritesAsync(request);

        return Ok();
    }

    [HttpPost("approve")]
    public async Task<IActionResult> ApproveBusiness([FromBody] ApproveBusinessDto request)
    {
        await _businessesService.ApproveBusinessAsync(request);

        return Ok();
    }
    
    [HttpPost("reject")]
    public async Task<IActionResult> RejectBusiness([FromBody] RejectBusinessDto request)
    {
        await _businessesService.RejectBusinessAsync(request);

        return Ok();
    }
}