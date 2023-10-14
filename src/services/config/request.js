/* eslint-disable no-undef */
import { storage } from '../../services/config/storage';
/**
 **
 **/
import axios from 'axios';
import AxiosSingleton from './AxiosSingleton';
import Toast from '../../components/Toast';
import { fetchAccessToken } from '../../utils/helper';
import Store from '../../store';
import { LOGOUT } from '../../store/auth/actionTypes';

const connectionHandler = () => {
  return navigator.onLine;
};

/*const errHandler = (res) => {
    if (res.status === 401) {
        // call for refresh token
        // refreshAuthToken();
        // > logout
    } else if (res.status === 400) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            res.json().then((res) => {
                if (
                    res.error &&
                    res.message &&
                    (typeof res.message === 'string' || res.message instanceof String)
                ) {
                    Toast('error', `Opps! Error.. ${res.message}`);
                } else {
                    Toast('error', `Opps! Error`);
                }
            });
        } else {
            res.text().then((res) => {
                Toast('error', `Opps! Error. ${res.error ? res.message : ''}`);
            });
        }
    } else if (res.status === 403) {
        Toast('error', 'Your session has expired, please, re-login.');
        storage.destroy.authToken();
        setTimeout(() => {
            window.href = '/login';
        }, 100);
    }
};

export const get = async (url, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }

    if (connectionHandler()) {
        return new Promise(async (resolve, reject) => {
            // await checkExpiry();
            fetch(url, {headers})
                .then((res) => {
                    if (res.status !== 200) {
                        throw res;
                    }
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return res.json();
                    } else {
                        return res.text();
                    }
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    errHandler(err);
                    reject(err);
                });
        });
    }
};

export const post = async (url, data = {}, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }
    if (connectionHandler()) {
        return new Promise(async (resolve, reject) => {
            // await checkExpiry();
            fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw res;
                    }
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return res?.json();
                    } else {
                        return res?.text();
                    }
                })
                .then((res) => {
                    if (res.error) {
                        reject(
                            res?.errorData
                                ? res.errorData.message
                                : res.message
                                ? res.message
                                : res.error
                        );
                    } else {
                        resolve(res.result ? res.result : res);
                    }
                })
                .catch((err) => {
                    errHandler(err);
                    reject(err);
                });
        });
    }
};

export const put = async (url, data = {}, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }
    if (connectionHandler()) {
        return new Promise(async (resolve, reject) => {
            // await checkExpiry();
            fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw res;
                    }
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return res.json();
                    } else {
                        return res.text();
                    }
                })
                .then((res) => {
                    if (res.error) {
                        reject(res.message ? res.message : res.error);
                    } else {
                        resolve(res);
                    }
                })
                .catch((err) => {
                    window.err = err;
                    reject(err);
                });
        });
    }
};

export const externalPut = async (url, data = {}, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }
    if (connectionHandler()) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers,
                body: data,
            })
                .then((res) => {
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(res);
                    }
                })
                .catch((err) => {
                    window.err = err;
                    reject(err);
                });
        });
    }
};

export const patch = async (url, data = {}, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }
    if (connectionHandler()) {
        return new Promise(async (resolve, reject) => {
            // await checkExpiry();
            fetch(url, {
                method: 'PATCH',
                headers,
                body: JSON.stringify(data),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw res;
                    }
                    const contentType = res.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return res.json();
                    } else {
                        return res.text();
                    }
                })
                .then((res) => {
                    if (res.error) {
                        reject(res.error);
                    } else {
                        resolve(res.result);
                    }
                })
                .catch((err) => {
                    window.err = err;
                    reject(err);
                });
        });
    }
};

export const deleteCall = async (url, headers) => {
    if (!!headers) {
        const data = await _AuthHeaders();
        headers = data;
    }
    if (connectionHandler()) {
        return new Promise(async (resolve, reject) => {
            // await checkExpiry();
            fetch(url, {
                method: 'DELETE',
                headers,
            })
                .then((res) => (res && res.json()) || {})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
};*/
const errHandler = (res) => {
  if (res.response?.status === 401) {
    const store = Store; // comment for IT setup
    storage.destroy.all();
    store.dispatch({ type: LOGOUT });
  } else if (res.status === 400) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      res.json().then((res) => {
        if (
          res.error &&
          res.message &&
          (typeof res.message === 'string' || res.message instanceof String)
        ) {
          Toast('error', `Opps! Error.. ${res.message}`);
        } else {
          Toast('error', `Opps! Error`);
        }
      });
    } else {
      res.text().then((res) => {
        Toast('error', `Opps! Error. ${res.error ? res.message : ''}`);
      });
    }
  } else if (res.status === 403) {
    Toast('error', 'Your session has expired, please, re-login.');
    storage.destroy.authToken();
    setTimeout(() => {
      window.href = '/login';
    }, 100);
  } else {
    let errorMessage = res?.response?.data?.message;
    Toast('error', typeof errorMessage === 'string' ? errorMessage : '');
  }
};
const _authorizationHeaders = async () => {
  const token = fetchAccessToken();
  return {
    Authorization: `${token}`,
    'Content-Type': 'application/json',
  };
};
const handleError = (err) => {
  return Promise.reject(err);
};

export const getRequest = async (url, headers = _authorizationHeaders()) => {
  try {
    const res = await AxiosSingleton.getInstance().get(url, headers);
    
    return res?.data;
  
  } catch (err) {
    errHandler(err);
    handleError(err);
  }
};

export const getExternalRequest = async (url) => {
  try {
    return await axios.get(url);
  } catch (err) {
    handleError(err);
  }
};

export const postRequest = async (
  url,
  data = {},
  headers = _authorizationHeaders()
) => {
  try {
    const res = await AxiosSingleton.getInstance().post(url, data, headers);

    return res;
  } catch (err) {
    errHandler(err);
    handleError(err);
  }
};

export const putRequest = async (
  url,
  data = {},
  headers = _authorizationHeaders(),
  absoluteUrl = false
) => {
  try {
    const res = await AxiosSingleton.getInstance().put(url, data, headers);
    return res;
  } catch (err) {
    errHandler(err);
    handleError(err);
  }
};

export const patchRequest = async (
  url,
  data = {},
  headers = _authorizationHeaders()
) => {
  try {
    const res = await AxiosSingleton.getInstance().patch(url, data, headers);
    return res;
  } catch (err) {
    handleError(err);
  }
};

export const deleteRequest = async (
  url,
  data = {},
  headers = _authorizationHeaders()
) => {
  try {
    const res = await AxiosSingleton.getInstance().delete(url, data, headers);
    return res;
  } catch (err) {
    errHandler(err);
    handleError(err);
  }
};


export const Api = {
  deleteRequest,
  getRequest,
  getExternalRequest,
  postRequest,
  putRequest,
  patchRequest,
};
