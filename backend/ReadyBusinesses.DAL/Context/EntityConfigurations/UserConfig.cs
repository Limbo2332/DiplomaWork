using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);

        builder
            .HasOne(user => user.ProfileAvatar)
            .WithOne()
            .HasForeignKey<User>(user => user.ProfileAvatarId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}