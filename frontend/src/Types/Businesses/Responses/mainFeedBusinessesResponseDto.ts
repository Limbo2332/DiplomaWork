import { PreviewBusinessDto } from '../previewBusinessDto.ts';

export type MainFeedBusinessesResponseDto = {
  previewBusinesses: PreviewBusinessDto[];
  hasMore: boolean;
}