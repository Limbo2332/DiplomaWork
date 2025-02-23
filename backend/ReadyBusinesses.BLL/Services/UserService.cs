using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.User;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.BLL.Services;

public class UserService : IUserService
{
    private readonly IUserIdGetter _userIdGetter;
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository, IUserIdGetter userIdGetter)
    {
        _userRepository = userRepository;
        _userIdGetter = userIdGetter;
    }

    public async Task<ProfileDto> GetProfileAsync()
    {
        var userId = _userIdGetter.CurrentUserId;

        var userWithProfile = await _userRepository
            .GetUserWithProfileAsync(userId);

        var socialMedias = (await _userRepository
            .GetSocialMediaAsync(userId))
            .ToList();

        return new ProfileDto
        {
            FullName = userWithProfile.FullName,
            Description = userWithProfile.Description,
            PhoneNumber = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.PhoneNumber)?.Link,
            FacebookLink = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Facebook)?.Link,
            TwitterLink = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Twitter)?.Link,
            InstagramLink = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Instagram)?.Link,
            TelegramLink = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Telegram)?.Link,
            PersonalSiteLink = socialMedias.FirstOrDefault(s => s.Type == SocialMediaType.Site)?.Link,
            ProfileImagePath = userWithProfile.ProfileAvatar is not null
                ? $"data:{userWithProfile.ProfileAvatar.ContentType};base64,{Convert.ToBase64String(userWithProfile.ProfileAvatar.Data)}"
                : null
        };
    }

    public async Task SetProfileAsync(SetProfileDto profileDto)
    {
        var userId = _userIdGetter.CurrentUserId;
        var currentUser = await _userRepository.GetByIdAsync(userId);
        
        var socialMediasToSet = new List<SocialMedia>();

        if (profileDto.TelegramLink is not null)
        {
            var telegramSocial = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.TelegramLink,
                Type = SocialMediaType.Telegram
            };
            
            socialMediasToSet.Add(telegramSocial);
        }

        if (profileDto.InstagramLink is not null)
        {
            var instagram = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.InstagramLink,
                Type = SocialMediaType.Instagram
            };
            
            socialMediasToSet.Add(instagram);
        }

        if (profileDto.FacebookLink is not null)
        {
            var facebook = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.FacebookLink,
                Type = SocialMediaType.Facebook
            };
            
            socialMediasToSet.Add(facebook);
        }

        if (profileDto.TwitterLink is not null)
        {
            var twitter = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.TwitterLink,
                Type = SocialMediaType.Twitter
            };
            
            socialMediasToSet.Add(twitter);
        }

        if (profileDto.PersonalSiteLink is not null)
        {
            var personalSite = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.PersonalSiteLink,
                Type = SocialMediaType.Site
            };
            
            socialMediasToSet.Add(personalSite);
        }

        if (profileDto.PhoneNumber is not null)
        {
            var phoneNumber = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = profileDto.PhoneNumber,
                Type = SocialMediaType.PhoneNumber
            };
            
            socialMediasToSet.Add(phoneNumber);
        }

        if (socialMediasToSet.Count != 0)
        {
            await _userRepository.AddSocialMediasAsync(socialMediasToSet, currentUser!);
        }

        if (profileDto.Description is not null)
        {
            await _userRepository.UpdateUserDescriptionAsync(userId, profileDto.Description);
        }

        if (profileDto.ProfileImage is not null)
        {
            using var memoryStream = new MemoryStream();
            await profileDto.ProfileImage.CopyToAsync(memoryStream);

            var profileImage = new ProfileAvatar
            {
                Id = Guid.NewGuid(),
                Data = memoryStream.ToArray(),
                Name = profileDto.ProfileImage.Name,
                ContentType = profileDto.ProfileImage.ContentType
            };
            
            await _userRepository.UpdateUserAvatarProfileAsync(currentUser!, profileImage);
        }
    }
}