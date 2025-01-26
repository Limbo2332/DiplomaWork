using Microsoft.EntityFrameworkCore;
using ReadyBusinesses.DLL.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BusinessesContext>(
    options => options
        .UseSqlServer(builder.Configuration.GetConnectionString("AppContext")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();