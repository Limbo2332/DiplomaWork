using ReadyBusinesses.Common.Dto.Businesses;
using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IBusinessesService
{
    Task<MainFeedBusinessesResponseDto> GetBusinessesAsync(MainFeedBusinessesRequestDto request);
    
    Task<MainFeedBusinessesResponseDto> GetUnapprovedBusinessesAsync(AdminFeedBusinessesRequestDto request);
    
    Task CreateBusinessAsync(CreateBusinessRequestDto request);
    
    Task AddToFavoritesAsync(AddToFavoritesRequest request);
    
    Task<BusinessDto> GetBusinessAsync(Guid id);
    
    Task ApproveBusinessAsync(ApproveBusinessDto request);
    
    Task RejectBusinessAsync(RejectBusinessDto request);
    
    Task<MainFeedBusinessesResponseDto> GetBusinessesByStatusAsync(GetBusinessesByStatusDto request);
    
    Task EditBusinessAsync(EditBusinessRequestDto request);
}