using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Helpers;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.Common.MapperExtensions;
using ReadyBusinesses.DLL.Repositories.Abstract;
using ReadyBusinesses.Topsis;

namespace ReadyBusinesses.BLL.Services;

public class BusinessesService : IBusinessesService
{
    private readonly IBusinessesRepository _repository;
    private readonly IUserRepository _userRepository;
    private readonly IUserIdGetter _userIdGetter;
    private readonly ISolver _solver;

    public BusinessesService(IBusinessesRepository repository, IUserIdGetter userIdGetter, IUserRepository userRepository, ISolver solver)
    {
        _repository = repository;
        _userIdGetter = userIdGetter;
        _userRepository = userRepository;
        _solver = solver;
    }

    public async Task<MainFeedBusinessesResponseDto> GetBusinessesAsync(MainFeedBusinessesRequestDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        
        var businesses = _repository.GetPosts(BusinessStatus.Approved);

        if (request.Filter.Categories.Length != 0)
        {
            businesses = businesses
                .Where(b => request.Filter.Categories.Contains(b.Category));
        }

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
            .Where(b => b.EmployersCount >= request.Filter.AmountOfWorkersStart && b.EmployersCount <= request.Filter.AmountOfWorkersEnd);
        
        businesses = businesses
            .Where(b => b.AverageChequePrice >= (decimal) request.Filter.AverageChequeStart && b.AverageChequePrice <= (decimal) request.Filter.AverageChequeEnd);
        
        businesses = businesses
            .Where(b => b.AverageRevenuePerMonth >= (decimal) request.Filter.AverageIncomeStart && b.AverageRevenuePerMonth <= (decimal) request.Filter.AverageIncomeEnd);
        
        businesses = businesses
            .Where(b => b.AverageProfitPerMonth >= (decimal) request.Filter.AverageProfitStart && b.AverageProfitPerMonth <= (decimal) request.Filter.AverageProfitEnd);

        businesses = businesses
            .Where(b => b.PriceInUah / b.AverageProfitPerMonth >= request.Filter.TimeToPaybackStart &&
                        b.PriceInUah / b.AverageProfitPerMonth <= request.Filter.TimeToPaybackEnd);

        if (request.Filter.HasEquipment)
        {
            businesses = businesses
                .Where(b => b.HasEquipment == request.Filter.HasEquipment);
        }

        if (request.Filter.HasGeneratorOrEcoFlow)
        {
            businesses = businesses
                .Where(b => b.HasGeneratorOrEcoFlow == request.Filter.HasGeneratorOrEcoFlow);
        }

        if (request.Filter.HasBargain)
        {
            businesses = businesses
                .Where(b => b.HasBargaining == request.Filter.HasBargain);
        }

        if (request.Filter.HasSupportFromOwner)
        {
            businesses = businesses
                .Where(b => b.HasSupportFromPreviousOwner == request.Filter.HasSupportFromOwner);
        }

        if (request.Filter.HasPhop)
        {
            businesses = businesses
                .Where(b => b.HasPhop == request.Filter.HasPhop);
        }

        if (request.Filter.HasIntegrationWithDeliveryServices)
        {
            businesses = businesses
                .Where(b => b.HasIntegrationWithDeliveryServices == request.Filter.HasIntegrationWithDeliveryServices);
        }

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

        switch (request.Filter.SortBy)
        {
            case SortOptions.Default:
                businessesList = businessesList.OrderByDescending(b => b.CreatedAt).ToList();
                break;
            case SortOptions.Ai:
                businessesList = _solver.GetSortedPosts(businessesList);
                break;
            case SortOptions.Expert:
                // TODO: sorting by expert rating
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        return new MainFeedBusinessesResponseDto
        {
            PreviewBusinesses = businessesList
                .Select(business => PostToBusinessPreviewDto.Map(business, currentUserId)),
            HasMore = businesses.Count() > request.Offset + request.PageCount
        };
    }

    public async Task<MainFeedBusinessesResponseDto> GetUnapprovedBusinessesAsync(AdminFeedBusinessesRequestDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        
        var businesses = _repository.GetPosts(BusinessStatus.WaitingForApproval);
        
        var businessesList = await businesses
            .Skip(request.Offset)
            .Take(request.PageCount)
            .ToListAsync();

        return new MainFeedBusinessesResponseDto
        {
            PreviewBusinesses = businessesList
                .Select(business => PostToBusinessPreviewDto.Map(business, currentUserId)),
            HasMore = businesses.Count() > request.Offset + request.PageCount
        };
    }

    public async Task CreateBusinessAsync(CreateBusinessRequestDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var user = await _userRepository.GetByIdAsync(currentUserId);

        var post = CreateBusinessRequestDtoToBusiness.Map(request);
        post.CreatedBy = currentUserId;
        post.CreatedByUser = user!;

        foreach (var imageFile in request.Images)
        {
            using var memoryStream = new MemoryStream();
            await imageFile.CopyToAsync(memoryStream);

            var profileImage = new Picture
            {
                Id = Guid.NewGuid(),
                Data = memoryStream.ToArray(),
                Name = imageFile.Name,
                ContentType = imageFile.ContentType
            };

            var postPicture = new PostPicture
            {
                PostId = post.Id,
                Post = post,
                Picture = profileImage,
                PictureId = profileImage.Id
            };
            
            post.Pictures.Add(postPicture);
        }

        if (request.Telegram is not null)
        {
            var telegram = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = request.Telegram,
                Type = SocialMediaType.Telegram
            };

            var postSocialMedia = new PostSocialMedia
            {
                PostId = post.Id,
                Post = post,
                SocialMedia = telegram,
                SocialMediaId = telegram.Id
            };
            
            post.SocialMedias.Add(postSocialMedia);
        }

        if (request.Instagram is not null)
        {
            var instagram = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = request.Instagram,
                Type = SocialMediaType.Instagram
            };

            var postSocialMedia = new PostSocialMedia
            {
                PostId = post.Id,
                Post = post,
                SocialMedia = instagram,
                SocialMediaId = instagram.Id
            };
            
            post.SocialMedias.Add(postSocialMedia);
        }
        
        if (request.Facebook is not null)
        {
            var facebook = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = request.Facebook,
                Type = SocialMediaType.Facebook
            };

            var postSocialMedia = new PostSocialMedia
            {
                PostId = post.Id,
                Post = post,
                SocialMedia = facebook,
                SocialMediaId = facebook.Id
            };
            
            post.SocialMedias.Add(postSocialMedia);
        }
        
        if (request.Twitter is not null)
        {
            var twitter = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = request.Twitter,
                Type = SocialMediaType.Twitter
            };

            var postSocialMedia = new PostSocialMedia
            {
                PostId = post.Id,
                Post = post,
                SocialMedia = twitter,
                SocialMediaId = twitter.Id
            };
            
            post.SocialMedias.Add(postSocialMedia);
        }
        
        if (request.Site is not null)
        {
            var site = new SocialMedia
            {
                Id = Guid.NewGuid(),
                Link = request.Site,
                Type = SocialMediaType.Site
            };

            var postSocialMedia = new PostSocialMedia
            {
                PostId = post.Id,
                Post = post,
                SocialMedia = site,
                SocialMediaId = site.Id
            };
            
            post.SocialMedias.Add(postSocialMedia);
        }
        
        await _repository.SavePostAsync(post);
    }

    public async Task AddToFavoritesAsync(AddToFavoritesRequest request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var currentUser = await _userRepository.GetByIdAsync(currentUserId);

        var post = await _repository.GetPostByIdAsync(request.PostId);

        if (request.Value)
        {
            await _repository.AddToFavoritesAsync(post!, currentUser!);
        }
        else
        {
            await _repository.RemoveFromFavoritesAsync(request.PostId, currentUserId);
        }
    }

    public async Task<BusinessDto> GetBusinessAsync(Guid id)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var business = await _repository.GetBusinessAsync(id);

        if (business is null)
        {
            throw new ValidationException("Business not found.");
        }

        var authorSocialMedia = (await _userRepository.GetSocialMediaAsync(business.CreatedByUser.Id)).ToList();
        
        return PostToBusinessDto.Map(business, authorSocialMedia, currentUserId);
    }

    public async Task ApproveBusinessAsync(ApproveBusinessDto request)
    {
        var business = await _repository.GetBusinessAsync(request.BusinessId);

        if (business is null)
        {
            return;
        }

        business.Category = request.Category;
        business.BusinessStatus = BusinessStatus.Approved;

        await _repository.EditPostAsync(business);
    }

    public async Task RejectBusinessAsync(RejectBusinessDto request)
    {
        var business = await _repository.GetBusinessAsync(request.BusinessId);

        if (business is null)
        {
            return;
        }
        
        business.BusinessStatus = BusinessStatus.Denied;
        await _repository.EditPostAsync(business);
    }

    public async Task<MainFeedBusinessesResponseDto> GetBusinessesByStatusAsync(GetBusinessesByStatusDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var businesses = _repository.GetPosts(request.Status);
        
        var businessesList = await businesses
            .Skip(request.Offset)
            .Take(request.PageCount)
            .ToListAsync();

        return new MainFeedBusinessesResponseDto
        {
            PreviewBusinesses = businessesList
                .Select(business => PostToBusinessPreviewDto.Map(business, currentUserId)),
            HasMore = businesses.Count() > request.Offset + request.PageCount
        };
    }

    public async Task EditBusinessAsync(EditBusinessRequestDto request)
    {
        var currentUserId = _userIdGetter.CurrentUserId;
        var user = await _userRepository.GetByIdAsync(currentUserId);

        var post = EditBusinessRequestDtoToBusiness.Map(request);
        post.CreatedBy = currentUserId;
        post.CreatedByUser = user!;

        var currentPost = await _repository.GetPostByIdAsync(post.Id);

        foreach (var imagePath in request.OldImages)
        {
            var postPicture = await _userRepository.GetPostPictureAsync(imagePath.Id);

            if (postPicture is null)
            {
                continue;
            }
            
            post.Pictures.Add(postPicture);
        }
        
        foreach (var imageFile in request.NewImages)
        {
            using var memoryStream = new MemoryStream();
            await imageFile.CopyToAsync(memoryStream);

            var profileImage = new Picture
            {
                Id = Guid.NewGuid(),
                Data = memoryStream.ToArray(),
                Name = imageFile.FileName,
                ContentType = imageFile.ContentType
            };
            
            await _userRepository.AddPictureAsync(profileImage);

            var postPicture = new PostPicture
            {
                PostId = currentPost!.Id,
                Post = currentPost,
                Picture = profileImage,
                PictureId = profileImage.Id
            };
            
            post.Pictures.Add(postPicture);
        }
        
        await _repository.EditPostAsync(currentPost!, post);
    }
}