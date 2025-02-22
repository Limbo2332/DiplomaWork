import Menu from './components/Menu/Menu.tsx';
import AuthorFeed from './Pages/AuthorFeed/AuthorFeed.tsx';
import MainFeed from './Pages/MainFeed/MainFeed.tsx';
import { useAuth } from './Contexts/authContext.tsx';

export const App = () => {
  const { isAdmin } = useAuth();

  return (
    <main className="main">
      <Menu />
      <div className="container">
        {isAdmin ? <AuthorFeed /> : <MainFeed />}
      </div>
    </main>
  );
};
