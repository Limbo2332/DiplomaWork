var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.NewsApp_Utils>("Utils");
builder.AddProject<Projects.NewsApp_DAL>("DatabaseLayer");
builder.AddProject<Projects.NewsApp_BLL>("BusinessLogicLayer");
builder.AddProject<Projects.NewsApp_Api>("Api");

builder.Build().Run();