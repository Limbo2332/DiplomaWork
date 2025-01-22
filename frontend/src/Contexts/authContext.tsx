import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useNotification } from './notificationContext.tsx';
import useAuthService from '../Services/authService.ts';
import axios from 'axios';

export interface AuthContextResultProps {
  isAuthenticated: boolean;
  currentUser: string | null; // TODO: replace with real entity
  token: string | null;
  registerUser: (email: string, fullName: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextResultProps | null>(null);

export interface AuthContextProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null); // TODO: replace with real entity

  const navigate = useNavigate();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const {
    login,
    register,
  } = useAuthService();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization =
        token
          ? `Bearer ${token}`
          : config.headers.Authorization;

      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  const registerUser = useCallback(async (email: string, fullName: string, password: string) => {
    const data = {
      email,
      fullName,
      password,
    };

    const result = await register(data);

    if (!result?.isOk && result?.errorMessage) {
      showErrorNotification(result.errorMessage);
    }

    if (result.data) {
      // localStorage.setItem('token', res?.data.token);
      // localStorage.setItem('user', res?.data.user);
      //
      // setToken(res?.data.token);
      // setUser(res?.data.user);

      navigate('/');
      showSuccessNotification('Ви успішно зареєструвались!');
    }
  }, [register, navigate, showSuccessNotification, showErrorNotification]);

  const loginUser = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const result = await login(data);

    if (!result?.isOk && result?.errorMessage) {
      showErrorNotification(result.errorMessage);
    }

    if (result.data) {
      // localStorage.setItem('token', res?.data.token);
      // localStorage.setItem('user', res?.data.user);
      //
      // setToken(res?.data.token);
      // setUser(res?.data.user);

      navigate('/');
      showSuccessNotification('Ви успішно ввійшли в систему!');
    }

  }, [login, navigate, showSuccessNotification, showErrorNotification]);

  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setToken(null);

    navigate('/auth/login');
  }, [navigate]);

  const providerValue: AuthContextResultProps = useMemo(() => ({
    isAuthenticated,
    loginUser,
    registerUser,
    logout,
    currentUser: user,
    token,
  }), [isAuthenticated, loginUser, registerUser, logout, user, token]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be inside AuthContext');
  }

  return context;
};