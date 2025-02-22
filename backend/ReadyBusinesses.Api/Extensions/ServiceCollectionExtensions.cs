using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ReadyBusinesses.BLL.Services;
using ReadyBusinesses.BLL.Services.Abstract;
using ReadyBusinesses.Common.Logic;
using ReadyBusinesses.Common.Logic.Abstract;
using ReadyBusinesses.DLL.Context;
using ReadyBusinesses.DLL.Repositories;
using ReadyBusinesses.DLL.Repositories.Abstract;

namespace ReadyBusinesses.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http
                });
            });
        }

        public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            var validAudience = config.GetRequiredSection("JWT:Audience").Value ?? "";
            var validIssuer = config.GetRequiredSection("JWT:Issuer").Value ?? "";
            var signingKey = config.GetRequiredSection("JWT:SigningKey").Value ?? "";

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme =
                opt.DefaultChallengeScheme =
                    JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = validIssuer,
                    ValidAudience = validAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey))
                };
            });
        }

        public static void ConnectToSqlDatabase(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<BusinessesContext>(options => 
                    options.UseSqlServer(config.GetConnectionString("AppContext")));
        }

        public static void RegisterUserStorageServices(this IServiceCollection services)
        {
            services.AddScoped<UserIdStorage>();
            services.AddTransient<IUserIdSetter>(s => s.GetRequiredService<UserIdStorage>());
            services.AddTransient<IUserIdGetter>(s => s.GetRequiredService<UserIdStorage>());
        }

        public static void RegisterRepositories(this IServiceCollection services)
        {
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

        public static void RegisterCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
