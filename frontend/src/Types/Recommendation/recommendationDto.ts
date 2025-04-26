import { CriteriaEstimateDto } from '../Criteria/criteriaEstimateDto.ts';

export type RecommendationDto = {
  id: string;
  businessId: string;
  totalScore: number;
  criteriaEstimates: CriteriaEstimateDto[];
  pluses: string[];
  minuses: string[];
  recommendations: string[];
}