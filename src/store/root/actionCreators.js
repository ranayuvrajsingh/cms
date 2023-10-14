import * as actionTypes from './actionTypes';

export function fetchingData() {
  return {
    type: actionTypes.FETCHING_DATA,
  };
}

export function fetchingDataError(payload) {
  return {
    type: actionTypes.FETCHING_DATA_FAILED,
  };
}

export function addData(payload, reducerName) {
  return {
    type: actionTypes.ADD_DATA,
    payload,
    name: reducerName,
  };
}

export function updateData(payload, reducerName) {
  return {
    type: actionTypes.UPDATE_DATA,
    payload,
    name: reducerName,
  };
}

export function deleteData(payload, reducerName) {
  return {
    type: actionTypes.DELETE_DATA,
    payload,
    name: reducerName,
  };
}


export function deleteMany(payload, reducerName) {
  return {
    type: actionTypes.DELETE_MANY,
    payload,
    name: reducerName,
  };
}

export function updateFilters(payload, reducerName) {
  return {
    type: actionTypes.UPDATE_FILTERS,
    payload,
    name: reducerName,
  };
}

export function setData(payload, reducerName, updateReadonlyList) {
  return {
    type: actionTypes.SET_DATA,
    payload,
    name: reducerName,
    updateReadonlyList,
  };
}
