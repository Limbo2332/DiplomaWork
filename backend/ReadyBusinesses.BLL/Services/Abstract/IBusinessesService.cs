using ReadyBusinesses.Common.Dto.Businesses.Requests;
using ReadyBusinesses.Common.Dto.Businesses.Responses;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IBusinessesService
{
    Task<MainFeedBusinessesResponseDto> GetBusinessesAsync(MainFeedBusinessesRequestDto request);
}