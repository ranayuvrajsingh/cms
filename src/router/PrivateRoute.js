import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import Header from '../components/Common/Header';

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return !!user ? (
    <>
      {/* <Header /> */}
      <Route {...rest} component={(props) => <Component {...props} />} />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
