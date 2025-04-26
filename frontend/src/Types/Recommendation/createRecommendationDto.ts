import { CriteriaEstimateDto } from '../Criteria/criteriaEstimateDto.ts';

export type CreateRecommendationDto = {
  businessId: string;
  criteriaEstimates: CriteriaEstimateDto[];
  pluses: string[];
  minuses: string[];
  recommendations: string[];
}