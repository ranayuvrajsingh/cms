import { combineReducers } from 'redux';
import commonReducer from './root/reducer';
import auth from './auth/reducer';

function createNamedWrapperReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    if (name !== reducerName && !isInitializationCall) {
      return state;
    }

    return reducerFunction(state, action);
  };
}

export default combineReducers({
  auth,
  cities: createNamedWrapperReducer(commonReducer, 'cities'),
  states: createNamedWrapperReducer(commonReducer, 'states'),
  articles: createNamedWrapperReducer(commonReducer, 'articles'),
  categories: createNamedWrapperReducer(commonReducer, 'categories'),
  tags: createNamedWrapperReducer(commonReducer, 'tags'),
  authors:createNamedWrapperReducer(commonReducer, 'authors'),
  experiences: createNamedWrapperReducer(commonReducer, 'experiences'),
  channels: createNamedWrapperReducer(commonReducer, 'channels'),
  users: createNamedWrapperReducer(commonReducer, 'users'),
  admins: createNamedWrapperReducer(commonReducer, 'admins'),
  roles: createNamedWrapperReducer(commonReducer, 'roles'),
  dailynews:createNamedWrapperReducer(commonReducer, 'dailynews'),
  bytes:createNamedWrapperReducer(commonReducer, 'bytes'),
  weathers:createNamedWrapperReducer(commonReducer, 'weathers'),
  permission:createNamedWrapperReducer(commonReducer, 'permission'),
  medium:createNamedWrapperReducer(commonReducer, 'medium'),
  classification:createNamedWrapperReducer(commonReducer, 'classification'),
  slot:createNamedWrapperReducer(commonReducer, 'slot'),
});
