import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

const Router = (props) => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default Router;
