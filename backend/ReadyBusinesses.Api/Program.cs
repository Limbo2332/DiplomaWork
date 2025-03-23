using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using ReadyBusinesses.Api;
using ReadyBusinesses.Api.Extensions;
using ReadyBusinesses.Common.Enums;
using ReadyBusinesses.Common.Filters;
using ReadyBusinesses.Common.Middlewares;
using ReadyBusinesses.DLL.Context;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(ValidateFilterAttribute));
    options.Filters.Add(typeof(CustomExceptionFilterAttribute));
})
.AddNewtonsoftJson(x =>
{
    x.SerializerSettings.Converters.Add(new StringEnumConverter());
});

builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
});

builder.Services.AddCors(options => options.AddPolicy("Frontend", config =>
{
    config
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000")
        .AllowCredentials();
}));

builder.Services.ConnectToSqlDatabase(configuration);

builder.Services.AddJwtAuthentication(configuration);

builder.Services.RegisterUserStorageServices();
builder.Services.RegisterRepositories();
builder.Services.RegisterCustomServices();

builder.Services.ConfigureSwagger();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.MapControllers();

app.UseMiddleware<UserIdMiddleware>();

app.UseBusinessContext();

app.Run();