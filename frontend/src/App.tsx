import Menu from './components/Menu/Menu.tsx';
import SearchAndLocation from './components/Feed/SearchAndLocation/SearchAndLocation.tsx';
import Card from './components/Common/Card/Card.tsx';

export const App = () => {
  return (
    <main className="main">
      <Menu />
      <div className="container">
        <SearchAndLocation />
        <div className="d-flex flex-column gap-4 mt-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>
    </main>
  );
};
