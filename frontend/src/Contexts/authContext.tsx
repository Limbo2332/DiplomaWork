import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useNotification } from './notificationContext';
import useAuthService from '../Services/authService';
import { UserLoginDto } from '../Types/User/userLoginDto';
import { UserRegisterDto } from '../Types/User/userRegisterDto';
import { clearTokens, getTokens, setTokens } from '../Utils/tokenUtils';
import { UserDto } from '../Types/User/userDto.ts';

export interface AuthContextResultProps {
  isAuthenticated: boolean;
  registerUser: (email: string, fullName: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  currentUser: UserDto | null;
}

export const AuthContext = createContext<AuthContextResultProps | null>(null);

export interface AuthContextProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  const navigate = useNavigate();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const { login, register, removeRefreshToken } = useAuthService();

  const logout = useCallback(async () => {
    if (refreshTokenValue) {
      await removeRefreshToken(refreshTokenValue);
    }

    clearTokens();

    setAccessToken(null);
    setRefreshTokenValue(null);
    setCurrentUser(null);

    navigate('/auth/login');
  }, [navigate, refreshTokenValue, removeRefreshToken]);

  useEffect(() => {
    const { accessToken, refreshToken, isAdmin, currentUser } = getTokens();

    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (refreshToken) {
      setRefreshTokenValue(refreshToken);
    }

    if (isAdmin) {
      setIsAdmin(JSON.parse(isAdmin));
    }

    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (accessToken && refreshTokenValue) {
      setTokens(accessToken, refreshTokenValue, isAdmin, currentUser);
    }
  }, [refreshTokenValue, accessToken, isAdmin, currentUser]);

  const registerUser = useCallback(async (email: string, fullName: string, password: string) => {
    const data: UserRegisterDto = { email, fullName, password };
    const result = await register(data);

    if (!result?.isOk && result?.errorMessage) {
      showErrorNotification(result.errorMessage);
    }

    if (result.data) {
      setTokens(result.data.token.accessToken, result.data.token.refreshToken, result.data.user.isAdmin, result.data.user);
      setAccessToken(result.data.token.accessToken);
      setRefreshTokenValue(result.data.token.refreshToken);
      setCurrentUser(result.data.user);

      navigate('/');
      showSuccessNotification('Ви успішно зареєструвались!');
    }
  }, [register, navigate, showSuccessNotification, showErrorNotification]);

  const loginUser = useCallback(async (email: string, password: string) => {
    const data: UserLoginDto = { email, password };
    const result = await login(data);

    if (!result?.isOk && result?.errorMessage) {
      showErrorNotification(result.errorMessage);
    }

    if (result.data) {
      setTokens(result.data.token.accessToken, result.data.token.refreshToken, result.data.user.isAdmin, result.data.user);
      setAccessToken(result.data.token.accessToken);
      setRefreshTokenValue(result.data.token.refreshToken);
      setIsAdmin(result.data.user.isAdmin);
      setCurrentUser(result.data.user);

      navigate('/');
      showSuccessNotification('Ви успішно ввійшли в систему!');
    }
  }, [login, navigate, showSuccessNotification, showErrorNotification]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const providerValue: AuthContextResultProps = useMemo(() => ({
    isAuthenticated,
    loginUser,
    registerUser,
    logout,
    isAdmin,
    currentUser,
  }), [isAuthenticated, loginUser, registerUser, logout, isAdmin, currentUser]);

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
