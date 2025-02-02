import Menu from './components/Menu/Menu.tsx';
import SearchAndLocation from './components/Feed/SearchAndLocation/SearchAndLocation.tsx';
import InfiniteScrollCards from './components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';
import Filters from './components/Feed/Filters/Filters.tsx';

export const App = () => {
  const handleRangeChange = () => {
    console.log('Selected range:');
  };

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <SearchAndLocation />
        <Filters />
        <InfiniteScrollCards />
      </div>
    </main>
  );
};
