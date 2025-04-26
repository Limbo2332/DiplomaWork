using ReadyBusinesses.AI.Entities;
using ReadyBusinesses.Common.Dto.Criteria;
using ReadyBusinesses.Common.Entities;

namespace ReadyBusinesses.AI;

public interface IAiClient
{
    Task<ChatGptResult> AskRecommendationAsync(Post post, CriteriaDto[] criteria);
}