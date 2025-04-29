using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Criteria;

namespace ReadyBusinesses.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class GlobalCriteriaController : Controller
{
    private readonly IGlobalCriteriaService _globalCriteriaService;

    public GlobalCriteriaController(IGlobalCriteriaService globalCriteriaService)
    {
        _globalCriteriaService = globalCriteriaService;
    }

    [HttpGet]
    public async Task<ActionResult<GlobalCriteriaDto>> Get()
    {
        return Ok(await _globalCriteriaService.GetCriteriaAsync());
    }

    [HttpPost]
    public async Task<IActionResult> SetNew([FromBody] GlobalCriteriaDto globalCriteriaDto)
    {
        await _globalCriteriaService.SetNewGlobalCriteriaAsync(globalCriteriaDto);

        return Ok();
    }

    [HttpGet("newfromai")]
    public async Task<ActionResult<GlobalCriteriaDto>> GetNewFromAi()
    {
        return Ok(await _globalCriteriaService.GetNewCriteriaFromAiAsync());
    }
}