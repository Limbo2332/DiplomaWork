import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

export interface NotificationContextResultProps {
  showSuccessNotification: (message: string) => void;
  showErrorNotification: (message: string) => void;
}

interface Notification {
  color: AlertColor;
  message: string;
}

export const NotificationContext = createContext<NotificationContextResultProps | null>(null);

export interface NotificationContextProps {
  children: ReactNode;
}

export const NotificationContextProvider = ({ children }: NotificationContextProps) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [notificationKey, setNotificationKey] = useState(0);

  const showSuccessNotification = useCallback((message: string) => {
    setNotificationKey((prevKeyState) => prevKeyState + 1);
    setNotification({
      color: 'success',
      message,
    });
  }, [setNotification]);

  const showErrorNotification = useCallback((message: string) => {
    setNotificationKey((prevKeyState) => prevKeyState + 1);
    setNotification({
      color: 'error',
      message,
    });
  }, [setNotification]);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, [setNotification]);

  const providerValue: NotificationContextResultProps = useMemo(() => ({
    showSuccessNotification, showErrorNotification,
  }), [showSuccessNotification, showErrorNotification]);

  return (
    <NotificationContext.Provider value={providerValue}>
      {notification && (
        <Snackbar
          key={notificationKey}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open
          color={notification.color}
          autoHideDuration={10000}
          onClose={hideNotification}
        >
          <Alert
            severity={notification.color}
            variant="filled"
            sx={{ width: '100%', zIndex: 1000000 }}
            color={notification.color}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be inside NotificationContext');
  }

  return context;
};