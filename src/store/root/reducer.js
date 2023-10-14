import * as actionTypes from './actionTypes';
import { initialDataState } from './constants';

export const schema = {
  ...initialDataState,
};

const initialState = schema;

export default function (state = initialState, action) {
  const { type, payload, updateReadonlyList } = action;

  switch (type) {
    case actionTypes.FETCHING_DATA:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCHING_DATA_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_DATA:
      return appendData(state, payload);
    case actionTypes.UPDATE_DATA:
      return editData(state, payload);
    case actionTypes.SET_DATA:
      return setData(state, payload, updateReadonlyList);
    case actionTypes.UPDATE_FILTERS:
      return setFilters(state, payload);
    case actionTypes.DELETE_DATA:
      return deleteData(state, payload); 
    default:
      return state;
  }
}

const appendData = (state, payload) => {
  return {
    ...state,
    loading: false,
    list: [payload.data, ...state.list],
  };
};

const setData = (state, payload, updateReadonlyList) => {
  if (!payload) {
    return {
      ...initialDataState,
    };
  }
  return {
    ...state,
    loading: false,
    list: payload?.data,
    readonlyList: updateReadonlyList
      ? state.filters?.id__in?.length === 0 //just a category ID check such that on mount of Categories, it doesn't replace the reasonly data
        ? payload?.data
        : state?.readonlyList
      : state?.readonlyList,
    metadata: payload?.metadata,
  };
};
const setFilters = (state, payload) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...payload,
    },
  };
};
const editData = (state, payload) => {
  return {
    ...state,
    loading: false,
    list: state?.list?.map((item) => {
      return item.id === payload.id ? payload : item;
    }),
  };
};

const deleteData = (state, payload) => {
  return {
    ...state,
    loading: false,
    list: state?.list?.filter((item) => {
      return item.id !== payload.id;
    }),
  };
};
