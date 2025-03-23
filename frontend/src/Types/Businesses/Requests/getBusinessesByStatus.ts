import { BusinessStatus } from '../businessStatus';

export type GetBusinessesByStatus = {
  status: BusinessStatus;
  pageCount: number;
  offset: number;
}