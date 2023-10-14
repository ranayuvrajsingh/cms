import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ user, component: Component, ...rest }) => {
  return !!user ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest} component={(props) => <Component {...props} />} />
  );
};

export default PublicRoute;
