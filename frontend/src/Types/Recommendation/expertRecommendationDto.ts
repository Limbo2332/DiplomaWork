import { RecommendationDto } from './recommendationDto.ts';
import { CriteriaEstimateDto } from '../Criteria/criteriaEstimateDto.ts';

export type ExpertRecommendationDto = {
  recommendation: RecommendationDto;
  expertName: string;
  date: Date;
  totalScore: number;
  criteriaEstimates: CriteriaEstimateDto[];
}