import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { StartRecommendationDto } from '../Types/Recommendation/startRecommendationDto.ts';
import { RecommendationDto } from '../Types/Recommendation/recommendationDto.ts';

const useRecommendationService = () => {
  const { post } = useHttpService({
    baseUrl: 'recommendation',
  });

  const startRecommendation = useCallback(async (request: StartRecommendationDto): Promise<Result<RecommendationDto>> => {
    return await post('start', request);
  }, [post]);
  
  return { startRecommendation };
};

export default useRecommendationService;