import Menu from './components/Menu/Menu.tsx';
import MainFeed from './Pages/MainFeed/MainFeed.tsx';

export const App = () => {
  return (
    <main className="main">
      <Menu />
      <div className="container">
        <MainFeed />
      </div>
    </main>
  );
};
