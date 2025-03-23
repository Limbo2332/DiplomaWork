using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.Api.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuthorDto>> GetById([FromRoute] Guid id)
    {
        return Ok(await _userService.GetByIdAsync(id));
    }

    [HttpGet("profileInfo")]
    public async Task<ActionResult<ProfileDto>> GetProfile()
    {
        return Ok(await _userService.GetProfileAsync());
    }

    [HttpPost("profileInfo")]
    public async Task<ActionResult<ProfileDto>> SetProfile([FromForm] SetProfileDto profileDto)
    {
        await _userService.SetProfileAsync(profileDto);

        return Ok();
    }
}