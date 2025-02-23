import { FilterDto } from '../filterDto.ts';

export type MainFeedBusinessesRequestDto = {
  pageCount: number;
  offset: number;
  filter: FilterDto;
}