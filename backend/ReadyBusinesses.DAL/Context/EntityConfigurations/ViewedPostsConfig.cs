using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class ViewedPostsConfig : IEntityTypeConfiguration<ViewedPosts>
{
    public void Configure(EntityTypeBuilder<ViewedPosts> builder)
    {
        builder.HasKey(x => new
        {
            x.UserId,
            x.PostId,
        });
        
        builder
            .HasOne(x => x.User)
            .WithMany(x => x.ViewedPosts)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder
            .HasOne(x => x.Post)
            .WithMany()
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}