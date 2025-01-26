using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class EmployerConfig : IEntityTypeConfiguration<Employer>
{
    public void Configure(EntityTypeBuilder<Employer> builder)
    {
        builder.HasKey(employer => employer.Id);

        builder
            .HasOne(employer => employer.Post)
            .WithMany()
            .HasForeignKey(employer => employer.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}