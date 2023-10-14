import { fetchingData, fetchingDataError } from './actionCreators';
import { GetApis } from '../../services/apis/common';
import Store from '../index';
import Toast from '../../components/Toast';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
//
export const createData = (innerTab, payload) => async (dispatch) => {
  try {
    const response = await GetApis[innerTab].create.data(payload);
    if (!!response) {
      Toast('success', ``);
      dispatch(GetApis[innerTab].create.dispatch(response));
      return response;
    }
  } catch (error) {
    dispatch(fetchingDataError());
  }
};
export const updateData = (innerTab, id, payload) => async (dispatch) => {
  try {
    const response = await GetApis[innerTab].edit.data(id, payload);
    if (!!response) {
      Toast('success', ``, 'Updated Successfully!');
      dispatch(GetApis[innerTab].edit.dispatch(response.data));
      return response;
    }
    return response;
  } catch (error) {
    dispatch(fetchingDataError());
  }
};

export const deleteData = (innerTab, id) => async (dispatch) => {
  try {
    const response = await GetApis[innerTab].delete.data(id);
    if (!!response) {
      Toast('success', ``, 'Deleted Successfully!');
      dispatch(GetApis[innerTab].delete.dispatch(id));
      return response;
    }
    return response;
  } catch (error) {
    dispatch(fetchingDataError());
  }
};

export const deleteMany = (innerTab, urlParams) => async (dispatch) => {
  try {
   
    const response = await GetApis[innerTab].deleteMany.data(urlParams);
    if (!!response) {
      Toast('success', ``, 'Deleted Successfully!');
      dispatch(GetApis[innerTab].deleteMany.dispatch(urlParams));
      return response;
    }
    return response;
  } catch (error) {
    dispatch(fetchingDataError());
  }
};

export const updateFilters = (innerTab, payload) => async (dispatch) => {
  try {
    dispatch(GetApis[innerTab].filters.dispatch(payload));
  } catch (e) {}
};

export const fetchFromReduxOrNetwork =
  (tabToFetchFor, urlParams, updateReadonlyList) => async (dispatch) => {
    if (!tabToFetchFor) return;
    if (urlParams) {
      return dispatch(fetchDataForInnerTabs(tabToFetchFor, urlParams,updateReadonlyList));
    }
    let store = Store;
    let reduxState = store.getState()?.[tabToFetchFor];
    if (reduxState?.list?.length !== 0) return reduxState?.list;
    else {
      dispatch(fetchDataForInnerTabs(tabToFetchFor, (urlParams = ''), updateReadonlyList));
    }
    return [];
  };

export const fetchDataForInnerTabs =
  (innerTab, urlParams, updateReadonlyList, reduxUpdate = true) =>
  async (dispatch) => {
    try {
      
      dispatch(fetchingData());
      const response = await GetApis[innerTab].get.data(urlParams);
      reduxUpdate &&
        dispatch(GetApis[innerTab].get.dispatch(response, updateReadonlyList));
       
      return response;

    } catch (error) {
      dispatch(fetchingDataError());
    }
  };
