namespace ReadyBusinesses.BLL.Services.Abstract
{
    public interface IJwtService
    {
        string GenerateAccessToken(Guid userId, string userName, string email);

        string GenerateRefreshToken();

        Guid GetUserIdFromToken(string accessToken, string signingKey);
    }
}
