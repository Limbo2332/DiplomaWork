using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostSocialMediaConfig : IEntityTypeConfiguration<PostSocialMedia>
{
    public void Configure(EntityTypeBuilder<PostSocialMedia> builder)
    {
        builder.HasKey(x => new
        {
            x.PostId,
            x.SocialMediaId
        });
        
        builder.HasOne(x => x.SocialMedia)
            .WithMany()
            .HasForeignKey(x => x.SocialMediaId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(x => x.Post)
            .WithMany()
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}