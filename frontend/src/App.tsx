import { Loading } from './components/Common/Loading/Loading.tsx';
import { ChooseToFavorite } from './components/Common/Bookmark/Bookmark.tsx';

export const App = () => {
  return (
    <div>
      <h1 className="text-black">Hello, world!</h1>
      <Loading />
      <ChooseToFavorite checked={true} />
    </div>
  );
};
