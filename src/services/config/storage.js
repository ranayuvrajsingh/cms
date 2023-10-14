
const ROOT_KEY = '@CITY_SCOPE';
const LS_KEY = {
  auth_token: ROOT_KEY + ':auth',
  remember_user: ROOT_KEY + ':remember_user',
};

const set = {
  
  authToken: (data) => {
  
    localStorage.setItem(
      LS_KEY.auth_token,
      JSON.stringify({
        auth_token: data,
      })
    );
  },
  rememberUser: (data) => {
    
    localStorage.setItem(
      LS_KEY.remember_user,
      JSON.stringify({ remember_user: data })
    );
  },
};

const fetch = {
  authToken: () => {
    
    const data = localStorage.getItem(LS_KEY.auth_token);
    if (data) {
      try {
        const decoded = JSON.parse(data);
        return decoded.auth_token;
      } catch (err) {
        console.log(err);
      }
    }
  },
  rememberUser: () => {
    
    const data = localStorage.getItem(LS_KEY.remember_user);
    if (data) {
      try {
        const decoded = JSON.parse(data);
        return decoded.remember_user;
      } catch (err) {
        console.log(err);
      }
    }
  },
};

const destroy = {
  authToken: () => {
    localStorage.removeItem(LS_KEY.auth_token);
  },
  rememberUser: () => {
    localStorage.removeItem(LS_KEY.remember_user);
  },
  all: () => {
    localStorage.removeItem(LS_KEY.auth_token);
    localStorage.removeItem(LS_KEY.remember_user);
  },
};

export const storage = {
  set,
  fetch,
  destroy,
};
