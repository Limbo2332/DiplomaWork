export type RecommendationDto = {
  businessId: string;
  ratingScore: number;
  locationScore: number;
  financialScore: number;
  adaptationScore: number;
  teamScore: number;
  supportScore: number;
  popularityScore: number;
  shiScore: number;
  pluses: string[];
  minuses: string[];
  recommendations: string[];
}