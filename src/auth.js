export const isAuthenticated = () => {
  //  return true
    let user = JSON.parse(localStorage.getItem('user'));

    return (user && user.token) ? true : false
};
