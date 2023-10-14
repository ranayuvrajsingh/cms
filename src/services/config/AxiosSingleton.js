import axios from 'axios';
// import API_URL from './apiUrl';
import { fetchAccessToken } from '../../utils/helper';
import Store from '../../store';

class AxiosSingleton {
  static instance = undefined;

  static createInstance(baseUrl, userToken) {
    const idInstance = Store.getState()?.auth?.data?.adminID.id;
    const token = userToken || fetchAccessToken();
    return axios.create({
      baseURL: 'https://api2.cityscope.media/',
      timeout: 1200000,
      headers: {
        Authorization: `Bearer ${token}`,
        kopiko: idInstance
      },
    });
  }

  static getInstance() {
    if (!AxiosSingleton.instance) {
      let baseUrl = '';
      AxiosSingleton.instance = AxiosSingleton.createInstance(baseUrl);
    }

    return AxiosSingleton.instance;
  }

  static resetInstance() {
    AxiosSingleton.instance = undefined;
  }
}

export default AxiosSingleton;
