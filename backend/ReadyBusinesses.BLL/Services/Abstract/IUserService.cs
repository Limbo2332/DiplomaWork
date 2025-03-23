using ReadyBusinesses.Common.Dto.User;

namespace ReadyBusinesses.BLL.Services.Abstract;

public interface IUserService
{
    Task<ProfileDto> GetProfileAsync();
    
    Task SetProfileAsync(SetProfileDto profileDto);
    
    Task<AuthorDto> GetByIdAsync(Guid id);
}