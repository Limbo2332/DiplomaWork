import { useAuth } from '../../Contexts/authContext.tsx';

const useMenu = () => {
  const { logout } = useAuth();

  return {
    logout,
  };
};

export default useMenu;