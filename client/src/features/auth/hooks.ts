import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, logout } from "./api";

export const useLogin = (options: any) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: ["me"] });
      options.onSuccess(...args);
    },
    onError: options.onError,
  });
};

export const useLogout = () => {
  const qc = useQueryClient();

  return () => {
    logout();
    qc.removeQueries({
      queryKey: ["me"],
    });
  };
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
