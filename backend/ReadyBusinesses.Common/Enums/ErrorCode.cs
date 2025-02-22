namespace ReadyBusinesses.Common.Enums
{
    public enum ErrorCode
    {
        General = 1,
        BadRequest,
        NotFound,
        InvalidUserNameOrPassword,
        InvalidToken,
        ExpiredRefreshToken
    }
}
