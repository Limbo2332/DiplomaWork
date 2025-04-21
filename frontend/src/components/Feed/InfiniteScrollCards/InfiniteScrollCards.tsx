import React, { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../../Common/Card/Card.tsx';
import { MainFeedBusinessesResponseDto } from '../../../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import { PreviewBusinessDto } from '../../../Types/Businesses/previewBusinessDto.ts';

const defaultPageSize = 10;

interface InfiniteScrollCardsProps {
  getCards: (offset: number, pageSize: number) => Promise<MainFeedBusinessesResponseDto>;
  approved?: boolean;
}

const InfiniteScrollCards = ({
  getCards,
  approved,
}: InfiniteScrollCardsProps) => {
  const [businessesToPreviewDto, setBusinessesToPreviewDto] = useState<PreviewBusinessDto[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async (pageNumber: number) => {
    pageNumber -= 1;
    const result = await getCards(pageNumber * defaultPageSize, defaultPageSize);

    if (pageNumber === 0) {
      setBusinessesToPreviewDto(result.previewBusinesses);
    } else {
      setBusinessesToPreviewDto((prevBusinesses) => [
        ...prevBusinesses,
        ...result.previewBusinesses,
      ]);
    }

    setHasMore(result.hasMore);
  }, [getCards]);

  return (
    <div className="mt-3">
      <InfiniteScroll
        className="d-flex flex-column gap-3 mb-5"
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
      >
        {businessesToPreviewDto.map((businessToPreviewDto) => (
          <Card key={businessToPreviewDto.id} businessToPreviewDto={businessToPreviewDto} approved={approved} />
        ))}
      </InfiniteScroll>
    </div>)
  ;
};

export default InfiniteScrollCards;