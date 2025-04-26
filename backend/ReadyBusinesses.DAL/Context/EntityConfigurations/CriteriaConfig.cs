using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class CriteriaConfig : IEntityTypeConfiguration<Criteria>
{
    public void Configure(EntityTypeBuilder<Criteria> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.HasOne(x => x.GlobalCriteria)
            .WithMany(gc => gc.Criteria)
            .HasForeignKey(x => x.GlobalCriteriaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}