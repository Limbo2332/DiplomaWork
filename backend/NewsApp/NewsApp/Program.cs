var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.NewsApp_Api>("Api");

builder.Build().Run();