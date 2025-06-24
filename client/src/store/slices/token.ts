let tokenGetter = () =>
  Promise.resolve(localStorage.getItem("jwt_token") || "");

export const token = {
  getToken: () => tokenGetter(),
  setTokenGetter: (fn: () => Promise<string>) => {
    tokenGetter = fn;
  },
};
