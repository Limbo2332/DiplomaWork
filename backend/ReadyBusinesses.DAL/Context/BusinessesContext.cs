using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.Common.Entities;
using ReadyBusinesses.Common.Entities.Abstract;
using ReadyBusinesses.DLL.Context.EntityConfigurations;

namespace ReadyBusinesses.DLL.Context;

public class BusinessesContext(DbContextOptions<BusinessesContext> options) : DbContext(options)
{
    public DbSet<Picture> Pictures => Set<Picture>();
    
    public DbSet<User> Users => Set<User>();
    
    public DbSet<PostInfo> PostsInfos => Set<PostInfo>();
    
    public DbSet<Post> Posts => Set<Post>();
    
    public DbSet<PostSocialMedia> PostsSocialMedias => Set<PostSocialMedia>();
    
    public DbSet<SocialMedia> SocialMedias => Set<SocialMedia>();
    
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    
    public DbSet<UserSocialMedia> UserSocialMedias => Set<UserSocialMedia>();
    
    public DbSet<SavedPosts> SavedPosts => Set<SavedPosts>();
    
    public DbSet<PostPicture> PostPictures => Set<PostPicture>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfig).Assembly);
        
        base.OnModelCreating(modelBuilder);
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<decimal>()
            .HavePrecision(18, 4);
        
        configurationBuilder.Properties<double>()
            .HavePrecision(18, 4);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
        var entries = ChangeTracker
            .Entries<BaseEntity>()
            .Where(entry => entry.State is EntityState.Added or EntityState.Modified);

        foreach (var entry in entries)
        {
            entry.Entity.UpdatedAt = DateTime.Now;

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.Now;
            }
        }

        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}