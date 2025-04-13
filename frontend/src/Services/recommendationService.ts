import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { StartRecommendationDto } from '../Types/Recommendation/startRecommendationDto.ts';
import { RecommendationDto } from '../Types/Recommendation/recommendationDto.ts';
import { CreateRecommendationDto } from '../Types/Recommendation/createRecommendationDto.ts';
import { ExpertRecommendationDto } from '../Types/Recommendation/expertRecommendationDto.ts';

const useRecommendationService = () => {
  const { get, post } = useHttpService({
    baseUrl: 'recommendation',
  });

  const getExpertRecommendations = useCallback(async (businessId: string): Promise<Result<ExpertRecommendationDto[]>> => {
    return await get(`/${businessId}`);
  }, [get]);

  const startRecommendation = useCallback(async (request: StartRecommendationDto): Promise<Result<RecommendationDto>> => {
    return await post('start', request);
  }, [post]);

  const createRecommendation = useCallback(async (request: CreateRecommendationDto): Promise<Result<void>> => {
    return await post('create', request);
  }, [post]);

  return { startRecommendation, createRecommendation, getExpertRecommendations };
};

export default useRecommendationService;