using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class UserToAuthorDto
{
    public static AuthorDto Map(User user, List<SocialMedia> socialMedias)
    {
        return new AuthorDto
        {
            Id = user.Id,
            Description = user.Description,
            Email = user.Email,
            Name = user.FullName,
            PhoneNumber = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.PhoneNumber)?.Link,
            Telegram = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Telegram)?.Link,
            Facebook = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Facebook)?.Link,
            Instagram = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Instagram)?.Link,
            Site = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Site)?.Link,
            Twitter = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Twitter)?.Link,
            AvatarPreview = user.ProfileAvatar is not null
                ? PictureToPreviewString.Map(user.ProfileAvatar)
                : null,
            RegistrationDate = user.CreatedAt,
            IsSeller = user.Posts.Count > 0,
            IsAdmin = user.IsAdmin,
            IsExpert = user.IsExpert,
        };
    }
}