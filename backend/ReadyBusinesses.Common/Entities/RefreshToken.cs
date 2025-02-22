using ReadyBusinesses.Common.Entities.Abstract;

namespace ReadyBusinesses.Common.Entities
{
    public class RefreshToken : BaseEntity
    {
        public int Id { get; set; }
        
        private const int DAYS_TO_EXPIRE = 5;

        public string Token { get; set; } = string.Empty;
        
        public DateTime Expires { get; set; } = DateTime.UtcNow.AddDays(DAYS_TO_EXPIRE);

        public bool IsActive => DateTime.UtcNow <= Expires;

        public User User { get; set; } = null!;
        
        public Guid UserId { get; set; }
    }
}
