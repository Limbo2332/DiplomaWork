using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class PostToBusinessPreviewDto
{
    public static PreviewBusinessDto Map(Post post)
    {
        return new PreviewBusinessDto
        {
            Id = post.Id,
            Category = post.Category,
            Location = post.Location,
            Name = post.Name,
            PreviewImageUrl = PictureToPreviewString.Map(post.Pictures.First().Picture),
            PriceCurrency = post.Currency,
            Price = CurrencyConvertation.To(post.Currency, Currency.UAH, post.PriceInUah),
            AverageCheque = post.AverageChequePrice,
            AverageProfit = post.AverageProfitPerMonth,
            CreationDate = post.CreatedAt,
            FlatSquare = post.RoomArea,
            HasBargain = post.HasBargaining,
            IsSaved = post.CreatedByUser.SavedPosts.Select(s => s.UserId).Contains(post.CreatedBy),
            AmountOfWorkers = post.Employers.Count,
            TermToPayBack = Math.Round(post.PriceInUah / post.AverageProfitPerMonth)
        };
    }
}