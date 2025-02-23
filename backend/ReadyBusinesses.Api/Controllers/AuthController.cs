using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Auth;
using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthUserDto>> RegisterAsync([FromBody] UserRegisterDto userDto)
        {
            return Created("register", await _authService.RegisterAsync(userDto));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthUserDto>> LoginAsync([FromBody] UserLoginDto userDto)
        {
            return Ok(await _authService.LoginAsync(userDto));
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AccessTokenDto>> RefreshAsync([FromBody] AccessTokenDto tokenDto)
        {
            return Ok(await _authService.RefreshTokenAsync(tokenDto));
        }

        [HttpDelete("removetoken")]
        [Authorize]
        public async Task<ActionResult> RemoveRefreshTokenAsync(string refreshToken)
        {
            await _authService.RemoveRefreshTokenAsync(refreshToken);
            
            return NoContent();
        }
        
        [AllowAnonymous]
        [HttpPost("reset")]
        public async Task<ActionResult> ResetPasswordAsync(ResetPasswordDto newInfo)
        {
            await _authService.ResetPasswordAsync(newInfo);

            return Ok();
        }
    }
}