using ReadyBusinesses.Common.Dto.BlobImage;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class ProfileAvatarToBlobImageDto
{
    public static BlobImageDto Map(ProfileAvatar profileAvatar)
    {
        return new BlobImageDto
        {
            Id = profileAvatar.Id,
            ContentType = profileAvatar.ContentType,
            Data = profileAvatar.Data,
            Name = profileAvatar.Name,
        };
    }
}