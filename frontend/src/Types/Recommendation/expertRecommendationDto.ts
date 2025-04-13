import { RecommendationDto } from './recommendationDto.ts';

export type ExpertRecommendationDto = {
  recommendation: RecommendationDto;
  expertName: string;
  date: Date;
  criteriaWeights: number[];
}