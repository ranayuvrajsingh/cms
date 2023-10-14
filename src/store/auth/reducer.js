import { initialDataState } from './constants';
import * as authActionTypes from './actionTypes';

export const schema = { ...initialDataState };

const initialState = schema;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case authActionTypes.DATA_FETCHING:
      return dataFetching(state, payload);

    case authActionTypes.DATA_FETCHED:
      return dataFetched(state, payload);

    case authActionTypes.ERROR_FETCHING:
      return errorFetching(state, payload);
    case authActionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}

const reset = (state, payload) => {
  return {
    ...schema,
  };
};

const dataFetching = (state, payload) => {
  const newState = {
    data: null,
    fetching: true,
    error: null,
    loading: true,
  };

  return newState;
};
const dataFetched = (state, payload) => {
  if (!payload) {
    return {
      ...initialDataState,
    };
  }

  const newState = {
    data: payload,
    fetching: false,
    error: null,
    loading: false,
  };
  return newState;
};
const errorFetching = (state, payload) => {
  if (!payload) {
    return {
      ...initialDataState,
    };
  }

  const newState = {
    data: null,
    fetching: false,
    error: payload,
    loading: false,
  };

  return newState;
};
