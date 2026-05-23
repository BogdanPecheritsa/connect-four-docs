import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import CookiePopup from './components/CookiePopup';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <CookiePopup />
    </>
  );
};

export default App;