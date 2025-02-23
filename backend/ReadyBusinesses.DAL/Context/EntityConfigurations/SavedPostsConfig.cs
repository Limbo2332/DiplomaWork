using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class SavedPostsConfig : IEntityTypeConfiguration<SavedPosts>
{
    public void Configure(EntityTypeBuilder<SavedPosts> builder)
    {
        builder.HasKey(x => new
        {
            x.UserId,
            x.PostId,
        });
        
        builder
            .HasOne(x => x.User)
            .WithMany(x => x.SavedPosts)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder
            .HasOne(x => x.Post)
            .WithMany()
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}