export const isAuth = ({ next, store, nextMiddleware }) => {
  if (!store.state.Auth.isAuth) {
    next("/");

    return;
  }

  return nextMiddleware();
};
