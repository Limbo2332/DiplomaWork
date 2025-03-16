import { FilterDto } from '../filterDto.ts';

export type MainFeedBusinessesRequestDto = {
  pageCount: number;
  offset: number;
  filter: FilterDto;
}

export type AdminFeedBusinessesRequestDto = {
  pageCount: number;
  offset: number;
}