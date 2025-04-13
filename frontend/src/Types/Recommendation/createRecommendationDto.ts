export type CreateRecommendationDto = {
  businessId: string;
  criteriaWeights: number[];
  locationScore: number;
  adaptationScore: number;
  supportFromPreviousOwnerScore: number;
  complexScore: number;
  financialScore: number;
  teamScore: number;
  popularityScore: number;
  pluses: string[];
  minuses: string[];
  recommendations: string[];
}