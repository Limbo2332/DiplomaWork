using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
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
}