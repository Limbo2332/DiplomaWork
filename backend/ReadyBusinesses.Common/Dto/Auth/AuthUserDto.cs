using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.Common.Dto.Auth
{
    public class AuthUserDto
    {
        public UserDto User { get; set; } = null!;

        public AccessTokenDto Token { get; set; } = null!;
    }
}
