import React, { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../Common/Loading/Loading.tsx';
import Card from '../../Common/Card/Card.tsx';
import { MainFeedBusinessesResponseDto } from '../../../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import { PreviewBusinessDto } from '../../../Types/Businesses/previewBusinessDto.ts';

const defaultPageSize = 10;

interface InfiniteScrollCardsProps {
  getCards: (offset: number, pageSize: number) => Promise<MainFeedBusinessesResponseDto>;
}

const InfiniteScrollCards = ({
  getCards,
}: InfiniteScrollCardsProps) => {
  const [businessesToPreviewDto, setBusinessesToPreviewDto] = useState<PreviewBusinessDto[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async (pageNumber: number) => {
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
    <div className="d-flex flex-column gap-5 mt-3">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<Loading key={0} />}
        useWindow={false}
      >
        {businessesToPreviewDto.map((businessToPreviewDto) => (
          <Card key={businessToPreviewDto.id} businessToPreviewDto={businessToPreviewDto} />
        ))}
      </InfiniteScroll>
    </div>)
  ;
};

export default InfiniteScrollCards;