using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class UserSocialMediaConfig : IEntityTypeConfiguration<UserSocialMedia>
{
    public void Configure(EntityTypeBuilder<UserSocialMedia> builder)
    {
        builder.HasKey(x => new
        {
            x.UserId,
            x.SocialMediaId
        });
        
        builder.HasOne(x => x.SocialMedia)
            .WithMany()
            .HasForeignKey(x => x.SocialMediaId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}