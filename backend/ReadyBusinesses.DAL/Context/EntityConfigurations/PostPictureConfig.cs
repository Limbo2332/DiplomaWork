using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostPictureConfig : IEntityTypeConfiguration<PostPicture>
{
    public void Configure(EntityTypeBuilder<PostPicture> builder)
    {
        builder.HasKey(x => new
        {
            x.PostId,
            x.PictureId
        });
        
        builder.HasOne(x => x.Post)
            .WithMany(p => p.Pictures)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder.HasOne(x => x.Picture)
            .WithMany()
            .HasForeignKey(x => x.PictureId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}