import { Loading } from './components/Common/Loading/Loading.tsx';
import { ChooseToFavorite } from './components/Common/Bookmark/Bookmark.tsx';
import Search from './components/Common/Search/Search.tsx';
import SignIn from './Pages/Auth/SignIn/SignIn.tsx';

export const App = () => {
  return (
    <main className="main">
      <Loading />
      <ChooseToFavorite checked={true} />
      <div style={{ width: '200px' }}>
        <Search placeholder="Search" doSearch={() => null} />
      </div>
      <SignIn />
    </main>
  );
};
