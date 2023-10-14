import AuthApi from '../../services/apis/auth';
// import { handleError } from '../../../utils/logger/errorHandler';
import * as authActionCreators from './actionCreators';
import AxiosSingleton from '../../services/config/AxiosSingleton';
import Toast from '../../components/Toast';
import {unpackRules} from '@casl/ability/extra';
import jwt from 'jsonwebtoken';
import Store from '..';


export const login = (payload) => async (dispatch) => {
  try {
    dispatch(authActionCreators.dataFetching(null));
    const response = await AuthApi.login(payload);
    AxiosSingleton.resetInstance();
    if (response.status === 201) {
      Toast('success', ``, 'Logged in successfully');
      await dispatch(authActionCreators.dataFetched(response.data));
    }
    return response;
  } catch (err) {
    dispatch(authActionCreators.errorFetching(err));
    console.log(err);
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch(authActionCreators.logout());
  } catch (e) {}
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch(authActionCreators.dataFetching(null));
    const response = await AuthApi.forgotPassword(payload);
    if (response.status === 201) {
      Toast(
        'success',
        `An email has been sent to ${payload?.email}`,
        'Reset email sent'
      );
      dispatch(authActionCreators.dataFetched(response.data));
    }
    return response;
  } catch (err) {
    dispatch(authActionCreators.errorFetching(err));
    console.log(err);
  }
};
