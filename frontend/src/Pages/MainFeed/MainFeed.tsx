import React from 'react';
import SearchAndLocation from '../../components/Feed/SearchAndLocation/SearchAndLocation.tsx';
import Filters from '../../components/Feed/Filters/Filters.tsx';
import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';

const MainFeed = () => {
  return (
    <>
      <SearchAndLocation />
      <Filters />
      <InfiniteScrollCards />
    </>
  );
};

export default MainFeed;