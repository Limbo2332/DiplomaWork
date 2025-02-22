namespace ReadyBusinesses.Common.Dto.Auth
{
    public class AccessTokenDto
    {
        public string AccessToken { get; set; } = string.Empty;
        
        public string RefreshToken { get; set; } = string.Empty;
    }
}
