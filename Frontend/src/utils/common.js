export const isUserLoggedIn = () => {
  return sessionStorage.getItem('uid') ? true : false;
}