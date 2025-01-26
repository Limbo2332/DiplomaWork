using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class PhopConfig : IEntityTypeConfiguration<Phop>
{
    public void Configure(EntityTypeBuilder<Phop> builder)
    {
        builder.HasKey(phop => phop.GroupNumber);
    }
}