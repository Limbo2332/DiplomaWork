using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostConfig : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(post => post.Id);
        
        builder.HasOne(post => post.CreatedByUser)
            .WithMany(user => user.Posts)
            .HasForeignKey(post => post.CreatedBy)
            .OnDelete(DeleteBehavior.Cascade);
    }
}