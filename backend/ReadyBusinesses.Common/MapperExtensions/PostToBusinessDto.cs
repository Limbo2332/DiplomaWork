using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;

namespace ReadyBusinesses.Common.MapperExtensions;

public class PostToBusinessDto
{
    public static BusinessDto Map(Post post, List<SocialMedia> authorSocialMedias, Guid currentUserId)
    {
        return new BusinessDto
        {
            IsSaved = post.CreatedByUser.SavedPosts.Any(p => p.PostId == post.Id && p.UserId == currentUserId),
            Name = post.Name,
            Location = post.Location,
            Category = post.Category!,
            UpdatedAt = post.UpdatedAt,
            Price = CurrencyConvertation.To(post.Currency, Currency.UAH, post.PriceInUah),
            PriceCurrency = post.Currency,
            Images = post.Pictures.Select(p => PictureToPreviewString.MapPictureToPath(p.Picture)),
            Description = post.Description,
            Telegram = post.SocialMedias.SingleOrDefault(s => s.SocialMedia.Type == SocialMediaType.Telegram)
                ?.SocialMedia.Link,
            Instagram = post.SocialMedias.SingleOrDefault(s => s.SocialMedia.Type == SocialMediaType.Instagram)
                ?.SocialMedia.Link,
            Facebook = post.SocialMedias.SingleOrDefault(s => s.SocialMedia.Type == SocialMediaType.Facebook)
                ?.SocialMedia.Link,
            Twitter = post.SocialMedias.SingleOrDefault(s => s.SocialMedia.Type == SocialMediaType.Twitter)?.SocialMedia
                .Link,
            Site = post.SocialMedias.SingleOrDefault(s => s.SocialMedia.Type == SocialMediaType.Site)?.SocialMedia.Link,
            AuthorId = post.CreatedBy,
            AuthorName = post.CreatedByUser.FullName,
            AuthorRegistrationDate = post.CreatedAt,
            AuthorPhoneNumber = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.PhoneNumber)?.Link,
            AuthorTelegram = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.Telegram)?.Link,
            AuthorInstagram = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.Instagram)?.Link,
            AuthorFacebook = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.Facebook)?.Link,
            AuthorTwitter = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.Twitter)?.Link,
            AuthorSite = authorSocialMedias.SingleOrDefault(s => s.Type == SocialMediaType.Site)?.Link,
            Area = post.RoomArea,
            RentPrice = post.RoomRent ?? 0,
            Employees = post.EmployersCount,
            SalaryExpenses = post.EmployersSalaryPerMonth,
            AverageCheck = post.AverageChequePrice,
            AverageMonthlyRevenue = post.AverageRevenuePerMonth,
            AverageMonthlyProfit = post.AverageProfitPerMonth,
            TimeToPayBack = Math.Round(post.PriceInUah / post.AverageProfitPerMonth),
            HasEquipment = post.HasEquipment,
            HasShelter = post.HasShelter,
            HasGenerator = post.HasGeneratorOrEcoFlow,
            IsNegotiable = post.HasBargaining,
            HasPreviousOwnerSupport = post.HasSupportFromPreviousOwner,
            HasFop = post.HasPhop,
            HasCompetitors = post.HasCompetitors,
            IsSeasonal = post.IsSeasonal,
            Season = post.Season,
            HasDeliveryServices = post.HasIntegrationWithDeliveryServices,
            AuthorImage = post.CreatedByUser.ProfileAvatar is not null
                ? PictureToPreviewString.Map(post.CreatedByUser.ProfileAvatar)
                : null
        };
    }
}