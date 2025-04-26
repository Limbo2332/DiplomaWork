using ChatGptNet;
using ChatGptNet.Extensions;
using Newtonsoft.Json;
using ReadyBusinesses.AI.Constants;
using ReadyBusinesses.AI.Entities;
using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ReadyBusinesses.AI;

public class AiClient : IAiClient
{
    private readonly IChatGptClient _chatGptClient;

    public AiClient(IChatGptClient chatGptClient)
    {
        _chatGptClient = chatGptClient;
    }

    public async Task<ChatGptResult> AskRecommendationAsync(Post post, CriteriaDto[] criteria)
    {
        var postResult = JsonSerializer.Serialize(post);

        var request = ChatGPTRequest.GetRequest(criteria) + postResult;
        
        var response = await _chatGptClient.AskAsync(request);

        var content = response.GetContent();
        
        if (string.IsNullOrEmpty(content))
        {
            throw new ArgumentException("ChatGPT cannot complete the result.");
        }
        
        var lines = content
            .Split(new[] { "\r\n", "\n" }, StringSplitOptions.None)
            .Where(line => !line.Contains("```")) 
            .ToArray();

        content = string.Join(Environment.NewLine, lines);

        return JsonSerializer.Deserialize<ChatGptResult>(content)!;
    }
}