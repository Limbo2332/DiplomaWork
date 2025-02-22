using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.DLL.Context;

namespace ReadyBusinesses.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void UseBusinessContext(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();

            using var context = scope.ServiceProvider.GetRequiredService<BusinessesContext>();
            
            context.Database.Migrate();
        }
    }
}
