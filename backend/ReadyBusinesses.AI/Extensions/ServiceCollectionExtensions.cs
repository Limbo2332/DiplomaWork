using System.Reflection;
using ChatGptNet;
using ChatGptNet.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ReadyBusinesses.AI.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddChatGpt(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IAiClient, AiClient>();

        var apiKey = configuration["OpenAIKey"];

        if (apiKey is not null)
        {
            services.AddChatGpt(options =>
            {
                options.UseOpenAI(apiKey);
            
                options.DefaultModel = "gpt-4o";
                options.DefaultParameters = new ChatGptParameters
                {
                    MaxTokens = 800,
                    Temperature = 0.7
                };
            });
        }
    }
}