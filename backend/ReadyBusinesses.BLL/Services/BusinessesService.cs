using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.BLL.Services;

public class BusinessesService : IBusinessesService
{
    private readonly IBusinessesRepository _repository;
    private readonly IUserIdGetter _userIdGetter;

    public BusinessesService(IBusinessesRepository repository, IUserIdGetter userIdGetter)
    {
        _repository = repository;
        _userIdGetter = userIdGetter;
    }

    public async Task<MainFeedBusinessesResponseDto> GetBusinessesAsync(MainFeedBusinessesRequestDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        
        var businesses = _repository.GetPosts();

        businesses = businesses
            .Where(b => request.Filter.Categories.Contains(b.Category));

        if (!string.IsNullOrWhiteSpace(request.Filter.Search))
        {
            businesses = businesses
                .Where(p => EF.Functions.Like(p.Name, $"%{request.Filter.Search}%"));
        }

        if (!string.IsNullOrWhiteSpace(request.Filter.Location))
        {
            businesses = businesses
                .Where(b => b.Location.ToLower() == request.Filter.Location.ToLower());
        }

        var startPriceInUah = CurrencyConvertation.ToUah(request.Filter.PriceCurrency, (decimal) request.Filter.PriceStart);
        var endPriceInUah = CurrencyConvertation.ToUah(request.Filter.PriceCurrency, (decimal) request.Filter.PriceEnd);
        
        businesses = businesses
            .Where(b => b.PriceInUah >= startPriceInUah && b.PriceInUah <= endPriceInUah);
        
        businesses = businesses
            .Where(b => b.RoomArea >= request.Filter.FlatSquareStart && b.RoomArea <= request.Filter.FlatSquareEnd);
        
        businesses = businesses
            .Where(b => b.Employers.Count >= request.Filter.AmountOfWorkersStart && b.Employers.Count <= request.Filter.AmountOfWorkersEnd);
        
        businesses = businesses
            .Where(b => b.AverageChequePrice >= (decimal) request.Filter.AverageChequeStart && b.AverageChequePrice <= (decimal) request.Filter.AverageChequeEnd);
        
        businesses = businesses
            .Where(b => b.AverageRevenuePerMonth >= (decimal) request.Filter.AverageIncomeEnd && b.AverageRevenuePerMonth <= (decimal) request.Filter.AverageIncomeStart);
        
        businesses = businesses
            .Where(b => b.AverageProfitPerMonth >= (decimal) request.Filter.AverageProfitStart && b.AverageProfitPerMonth <= (decimal) request.Filter.AverageProfitEnd);

        businesses = businesses
            .Where(b => b.PriceInUah / b.AverageProfitPerMonth >= request.Filter.TimeToPaybackStart &&
                        b.PriceInUah / b.AverageProfitPerMonth <= request.Filter.TimeToPaybackEnd);
        
        businesses = businesses
            .Where(b => b.HasEquipment == request.Filter.HasEquipment);

        businesses = businesses
            .Where(b => b.HasGeneratorOrEcoFlow == request.Filter.HasGeneratorOrEcoFlow);

        businesses = businesses
            .Where(b => b.HasBargaining == request.Filter.HasBargain);

        businesses = businesses
            .Where(b => b.HasSupportFromPreviousOwner == request.Filter.HasSupportFromOwner);

        businesses = businesses
            .Where(b => b.HasPhop == request.Filter.HasPhop);
        
        businesses = businesses
            .Where(b => b.HasIntegrationWithDeliveryServices == request.Filter.HasIntegrationWithDeliveryServices);

        if (request.Filter.OnlySaved)
        {
            var savedPostsIds = _repository.GetSavedPostsIds(currentUserId);

            businesses = businesses
                .Where(b => savedPostsIds.Contains(b.Id));
        }

        
        // TODO: view post
        
        var businessesList = await businesses
            .Skip(request.Offset)
            .Take(request.PageCount)
            .ToListAsync();

        return new MainFeedBusinessesResponseDto
        {
            PreviewBusinesses = businessesList
                .Select(PostToBusinessPreviewDto.Map),
            HasMore = businesses.Count() > request.Offset + request.PageCount
        };
    }
}