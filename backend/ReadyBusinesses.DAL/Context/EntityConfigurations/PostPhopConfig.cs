using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostPhopConfig : IEntityTypeConfiguration<PostPhop>
{
    public void Configure(EntityTypeBuilder<PostPhop> builder)
    {
        builder.HasKey(postPhop => new
        {
            postPhop.PostId,
            postPhop.PhopNumber
        });
        
        builder.HasOne(postPhop => postPhop.Post)
            .WithMany()
            .HasForeignKey(postPhop => postPhop.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(postPhop => postPhop.Phop)
            .WithMany()
            .HasForeignKey(postPhop => postPhop.PhopNumber)
            .OnDelete(DeleteBehavior.Cascade);
    }
}