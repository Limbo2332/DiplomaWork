using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class UserToUserDto
{
    public static UserDto Map(User user)
    {
        return new UserDto
        {
            Email = user.Email,
            Id = user.Id,
            FullName = user.FullName,
            ProfileImage = user.ProfileAvatar is not null 
                ? ProfileAvatarToBlobImageDto.Map(user.ProfileAvatar)
                : null,
            IsAdmin = user.IsAdmin,
            IsExpert = user.IsExpert
        };
    }
}