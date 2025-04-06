using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PostRecommendationConfig : IEntityTypeConfiguration<PostRecommendation>
{
    public void Configure(EntityTypeBuilder<PostRecommendation> builder)
    {
        builder.HasKey(x => new
        {
            x.PostId,
            x.RecommendationId
        });
        
        builder
            .HasOne(x => x.Post)
            .WithMany(p => p.Recommendations)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.NoAction);
        
        builder
            .HasOne(x => x.Recommendation)
            .WithMany()
            .HasForeignKey(x => x.RecommendationId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}