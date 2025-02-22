using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class UserRegisterDtoToUser
{
    public static User Map(UserRegisterDto userRegisterDto)
    {
        return new User
        {
            Email = userRegisterDto.Email,
            FullName = userRegisterDto.FullName,
        };
    }
}