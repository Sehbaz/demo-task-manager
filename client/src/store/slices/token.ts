let getToken: () => Promise<string | undefined> = async () => undefined;

export const token = {
  getToken: () => getToken(), // <-- Call the function, not return it
  setTokenGetter: (func: () => Promise<string | undefined>) =>
    (getToken = func),
};
