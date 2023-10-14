import { Api } from '../config/request';

export default {
  login(data) {
    return Api.postRequest(`/auth/connect`, data);
  },
  forgotPassword(data) {
    return Api.postRequest(`/auth/forgot-password`, data);
  },
};
