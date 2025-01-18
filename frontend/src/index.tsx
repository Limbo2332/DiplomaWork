import ReactDOM from 'react-dom/client';
import React from 'react';
import { App } from './App.tsx';

import './assets/styles/styles.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignIn from './Pages/Auth/SignIn/SignIn.tsx';
import SignUp from './Pages/Auth/SignUp/SignUp.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
