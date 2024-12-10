import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Loading } from '../Common/Loading/Loading.tsx';

export interface LoadingContextResultProps {
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextResultProps | null>(null);

export interface LoadingContextProps {
  children: ReactNode;
}

export const LoadingContextProvider = ({ children }: LoadingContextProps) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const providerValue: LoadingContextResultProps = useMemo(() => ({
    showLoading,
    hideLoading,
  }), [showLoading, hideLoading]);

  return (
    <LoadingContext.Provider value={providerValue}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be inside LoadingContext');
  }

  return context;
};