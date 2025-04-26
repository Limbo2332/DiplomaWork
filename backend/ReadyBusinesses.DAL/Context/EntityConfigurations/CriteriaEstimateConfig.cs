using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class CriteriaEstimateConfig : IEntityTypeConfiguration<CriteriaEstimate>
{
    public void Configure(EntityTypeBuilder<CriteriaEstimate> builder)
    {
        builder.HasKey(x => new
        {
            x.CriteriaId,
            x.RecommendationId
        });
        
        builder.HasOne(x => x.Recommendation)
            .WithMany(r => r.CriteriaEstimates)
            .HasForeignKey(x => x.RecommendationId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(x => x.Criteria)
            .WithMany()
            .HasForeignKey(x => x.CriteriaId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}