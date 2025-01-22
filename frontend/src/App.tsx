import Menu from './components/Menu/Menu.tsx';
import SearchAndLocation from './components/Feed/SearchAndLocation/SearchAndLocation.tsx';

export const App = () => {
  return (
    <main className="main">
      <Menu />
      <SearchAndLocation />
    </main>
  );
};
