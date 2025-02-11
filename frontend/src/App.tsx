import Menu from './components/Menu/Menu.tsx';
import AuthorFeed from './Pages/AuthorFeed/AuthorFeed.tsx';
import MainFeed from './Pages/MainFeed/MainFeed.tsx';

export const App = () => {
  const isAdmin = true;

  return (
    <main className="main">
      <Menu />
      <div className="container">
        {isAdmin ? <AuthorFeed /> : <MainFeed />}
      </div>
    </main>
  );
};
