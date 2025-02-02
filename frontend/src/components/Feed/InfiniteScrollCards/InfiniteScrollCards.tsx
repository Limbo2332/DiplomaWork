import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../Common/Loading/Loading.tsx';
import Card from '../../Common/Card/Card.tsx';

const InfiniteScrollCards = () => {
  const [cards, setCards] = useState<number[]>([1, 2, 3]);

  const getCards = (page: number) => {
    setCards((prev) => Array.from(Array(prev.length + 1)).map((_, i) => i + 1));
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getCards}
      hasMore
      loader={<Loading />}
    >
      <div className="d-flex flex-column gap-5 mt-3">
        {cards.map((card) => (
          <Card key={card} />
        ))}
      </div>
    </InfiniteScroll>)
  ;
};

export default InfiniteScrollCards;