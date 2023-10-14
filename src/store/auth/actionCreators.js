import * as actionTypes from './actionTypes';

export function dataFetching(payload) {
  return {
    type: actionTypes.DATA_FETCHING,
    payload,
  };
}

export function dataFetched(payload) {
  return {
    type: actionTypes.DATA_FETCHED,
    payload,
  };
}

export function errorFetching(payload) {
  return {
    type: actionTypes.ERROR_FETCHING,
    payload,
  };
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
