import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import * as actionTypes from './auth/actionTypes';

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : compose;

const ROOT_REDUCER = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }

  return rootReducer(state, action);
};
const Store = createStore(
  ROOT_REDUCER,
  compose(applyMiddleware(thunk), devTool)
);

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//         const nextReducer = require('./rootReducer').default;
//         Store.replaceReducer(nextReducer);
//     });
// }
export default Store;
