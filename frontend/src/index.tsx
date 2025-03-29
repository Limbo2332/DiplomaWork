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
import Business from './Pages/Business/Business.tsx';
import CreateEditBusiness from './Pages/CreateOrEditBusinessPage/CreateOrEditBusinessPage.tsx';
import AuthorProfile from './Pages/AuthorProfile/AuthorProfile.tsx';
import EditAuthorProfile from './Pages/EditAuthorProfile/EditAuthorProfile.tsx';
import ManageBusinesses from './Pages/ManageBusinesses/ManageBusinesses.tsx';

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
                <Route path="/business/:id" element={<Business />} />
                <Route path="/createoreditbusiness/:id?" element={<CreateEditBusiness />} />
                <Route path="/manage-businesses" element={<ManageBusinesses />} />
                <Route path="/authors/:id" element={<AuthorProfile />} />
                <Route path="/editprofile" element={<EditAuthorProfile />} />
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
