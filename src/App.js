import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App(props) {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}


export default (App);
