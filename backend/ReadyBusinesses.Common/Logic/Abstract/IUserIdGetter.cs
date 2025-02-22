namespace ReadyBusinesses.Common.Logic.Abstract
{
    public interface IUserIdGetter
    {
        Guid CurrentUserId { get; }
    }
}
