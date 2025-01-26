using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostInfoConfig : IEntityTypeConfiguration<PostInfo>
{
    public void Configure(EntityTypeBuilder<PostInfo> builder)
    {
        builder.HasKey(postInfo => postInfo.Id);
        
        builder.HasOne(postInfo => postInfo.Post)
            .WithMany()
            .HasForeignKey(postInfo => postInfo.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(postInfo => postInfo.User)
            .WithMany()
            .HasForeignKey(postInfo => postInfo.UserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}