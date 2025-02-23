using ReadyBusinesses.Common.Dto.BlobImage;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class ProfileAvatarToBlobImageDto
{
    public static BlobImageDto Map(Picture picture)
    {
        return new BlobImageDto
        {
            Id = picture.Id,
            ContentType = picture.ContentType,
            Data = picture.Data,
            Name = picture.Name,
        };
    }
}