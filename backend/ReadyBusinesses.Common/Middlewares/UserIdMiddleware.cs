using Microsoft.AspNetCore.Http;
using ReadyBusinesses.Common.Logic.Abstract;

namespace ReadyBusinesses.Common.Middlewares
{
    public class UserIdMiddleware
    {
        private readonly RequestDelegate _next;

        public UserIdMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IUserIdSetter userIdSetter)
        {
            var claimsUserId = context.User.Claims.FirstOrDefault(x => x.Type == "id")?.Value;

            if (claimsUserId is not null && Guid.TryParse(claimsUserId, out var userId))
            {
                userIdSetter.SetUserId(userId);
            }

            await _next.Invoke(context);
        }
    }
}
