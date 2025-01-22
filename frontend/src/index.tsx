import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './App.tsx';

import './assets/styles/styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignIn from './Pages/Auth/SignIn/SignIn.tsx';
import SignUp from './Pages/Auth/SignUp/SignUp.tsx';
import { LoadingContextProvider } from './Contexts/loadingContext.tsx';
import { NotificationContextProvider } from './Contexts/notificationContext.tsx';
import { AuthContextProvider } from './Contexts/authContext.tsx';
import ErrorBoundary from './Errors/ErrorBoundary.tsx';
import PageNotFound from './Pages/PageNotFound/PageNotFound.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={(error) => <PageNotFound text={error} />}>
        <LoadingContextProvider>
          <NotificationContextProvider>
            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/register" element={<SignUp />} />
                <Route path="*" element={<PageNotFound text="Сторінка не знайдена" />} />
              </Routes>
            </AuthContextProvider>
          </NotificationContextProvider>
        </LoadingContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
