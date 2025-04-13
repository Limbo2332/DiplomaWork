using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class RecommendationConfig : IEntityTypeConfiguration<Recommendation>
{
    public void Configure(EntityTypeBuilder<Recommendation> builder)
    {
        builder.HasKey(r => r.Id);
        
        builder.HasOne(r => r.GivenBy)
            .WithMany()
            .HasForeignKey(r => r.GivenById)
            .OnDelete(DeleteBehavior.NoAction);
    }
}