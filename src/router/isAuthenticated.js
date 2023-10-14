const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn && isLoggedIn != 'undefined' ? true : false;
};
export default isAuthenticated;
