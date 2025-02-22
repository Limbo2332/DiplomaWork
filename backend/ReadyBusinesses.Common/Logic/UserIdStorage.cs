using ReadyBusinesses.Common.Logic.Abstract;

namespace ReadyBusinesses.Common.Logic
{
    public class UserIdStorage : IUserIdGetter, IUserIdSetter
    {
        private Guid _id;

        public Guid CurrentUserId => _id;

        public void SetUserId(Guid userId)
        {
            _id = userId;
        }
    }
}
