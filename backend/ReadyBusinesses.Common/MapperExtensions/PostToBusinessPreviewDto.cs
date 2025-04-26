using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;

namespace ReadyBusinesses.Common.MapperExtensions;

public static class PostToBusinessPreviewDto
{
    public static PreviewBusinessDto Map(Post post, User currentUser)
    {
        var aiRecommendation = post.Recommendations.Select(r => r.Recommendation).FirstOrDefault(x => x.GivenById is null);
        
        return new PreviewBusinessDto
        {
            Id = post.Id,
            CreatedBy = post.CreatedBy,
            Category = post.Category,
            Location = post.Location,
            Name = post.Name,
            PreviewImageUrl = PictureToPreviewString.Map(post.Pictures.First().Picture),
            PriceCurrency = post.Currency,
            Price = CurrencyConvertation.To(Currency.UAH, post.Currency, post.PriceInUah),
            AverageCheque = post.AverageChequePrice,
            AverageProfit = post.AverageProfitPerMonth,
            CreationDate = post.CreatedAt,
            FlatSquare = post.RoomArea,
            HasBargain = post.HasBargaining,
            IsSaved = currentUser.SavedPosts.Any(p => p.PostId == post.Id),
            AmountOfWorkers = post.EmployersCount,
            TermToPayBack = Math.Round(post.PriceInUah / post.AverageProfitPerMonth),
            InvestmentScore = aiRecommendation is not null 
                ? Math.Round(aiRecommendation.CriteriaEstimates.Sum(e => e.Estimate * e.Criteria.Weight), 2)
                : null
        };
    }
}