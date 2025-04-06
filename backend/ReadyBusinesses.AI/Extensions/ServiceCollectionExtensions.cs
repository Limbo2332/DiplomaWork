using ChatGptNet;
using ChatGptNet.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ReadyBusinesses.AI.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddChatGpt(this IServiceCollection services)
    {
        services.AddScoped<IAiClient, AiClient>();
        
        services.AddChatGpt(options =>
        {
            options.UseOpenAI(
                apiKey:
                "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");
            
            options.DefaultModel = "gpt-4o";
            options.DefaultParameters = new ChatGptParameters
            {
                MaxTokens = 800,
                Temperature = 0.7
            };
        });
    }
}