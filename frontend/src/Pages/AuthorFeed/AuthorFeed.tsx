import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';
import { useCallback } from 'react';
import { MainFeedBusinessesResponseDto } from '../../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import { AdminFeedBusinessesRequestDto } from '../../Types/Businesses/Requests/mainFeedBusinessesRequestDto.ts';
import useBusinessService from '../../Services/businessesService.ts';

const AuthorFeed = () => {
  const { getUnapprovedFeedBusinesses } = useBusinessService();

  const getCards = useCallback(async (offset: number, pageSize: number): Promise<MainFeedBusinessesResponseDto> => {
    const request: AdminFeedBusinessesRequestDto = {
      pageCount: pageSize,
      offset: offset,
    };

    const result = await getUnapprovedFeedBusinesses(request);

    if (!result?.data) {
      return {
        previewBusinesses: [],
        hasMore: false,
      };
    }

    return result.data;
  }, [getUnapprovedFeedBusinesses]);

  return (
    <InfiniteScrollCards getCards={getCards} />
  );
};

export default AuthorFeed;