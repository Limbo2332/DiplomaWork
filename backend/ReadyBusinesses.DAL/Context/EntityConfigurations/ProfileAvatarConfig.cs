using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.DLL.Context.EntityConfigurations;

public class ProfileAvatarConfig : IEntityTypeConfiguration<ProfileAvatar>
{
    public void Configure(EntityTypeBuilder<ProfileAvatar> builder)
    {
        builder.HasKey(avatar => avatar.Id);
    }
}