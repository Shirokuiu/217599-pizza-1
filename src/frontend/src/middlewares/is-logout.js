export const isLogout = ({ next, store, nextMiddleware }) => {
  if (store.state.Auth.isAuth) {
    next("/");

    return;
  }

  return nextMiddleware();
};
