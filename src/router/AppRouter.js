import React from 'react';
import Loadable from 'react-loadable';
// import { AnimatePresence } from 'framer-motion';
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  withRouter,
} from 'react-router-dom';
import Loading from '../components/Loading';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Contents from '../views/Contents';
import Categories from '../views/Categories/Categories';
import { connect } from 'react-redux';
import { fetchAccessToken } from '../utils/helper';
import Users from '../views/Users';
import Experiences from '../views/Experiences';
import Contributor from '../views/Contributor';
import Dailyscope from '../views/Dailyscope';
import Management from '../views/Management';
import can from '../store/auth/can';



const Cities = Loadable({
  loader: () => import(/* Page-Companies */ '../views/Cities'),
  loading: Loading,
});

function AppRouter({ auth, ...props }) {
  const location = useLocation();
  const isLoggedIn = fetchAccessToken();
  return (
    <Switch>
      {/* //remove this not logged in  */}
      
      {isLoggedIn ? (
        <>
          <Route path="/login" component={Login} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/cities" component={Cities} /> 
          {/* {can("view","Article") || can("view","Channel") &&  */}
          <Route exact path="/content" component={Contents} /> 
                  <Route exact path="/categories" component={Categories} /> 
          <Route exact path ="/users" component={Users} />
          <Route exact path = "/experiences" component={Experiences} />
          <Route exact path = "/contributors" component={Contributor} />
          <Route exact path = "/dailyscope" component={Dailyscope} />
          <Route exact path = "/management" component={Management} />

          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          <Route path="/login">
            <Redirect to="/dashboard" />
          </Route>
        </>
      ) : (
        <>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={Login} />
          <Redirect to="/login" />
        </>
      )}
    </Switch>
  );
}

export default withRouter(connect(({ auth }) => ({ auth }), null)(AppRouter));
