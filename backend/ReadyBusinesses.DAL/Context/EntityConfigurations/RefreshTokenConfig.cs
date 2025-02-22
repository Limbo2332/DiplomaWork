using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations
{
    public class RefreshTokenConfig : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.Property(refreshToken => refreshToken.Token)
                .IsRequired();

            builder.Property(refreshToken => refreshToken.Expires)
                .IsRequired();

            builder.Ignore(refreshToken => refreshToken.IsActive);

            builder.HasOne(refreshToken => refreshToken.User)
                .WithOne()
                .IsRequired();
        }
    }
}
