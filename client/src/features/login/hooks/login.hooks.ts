// react
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// types
import type { UseMutationOptions } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse, User } from "@/models/auth";

// api
import { getCurrentUser, login, logout } from "@/features/login/api/login.api";

// axios
import type { AxiosError } from "axios";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>
) => {
  const qc = useQueryClient();
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: login,
    ...options,
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: ["me"] });
      options?.onSuccess?.(...args);
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  return () => {
    logout();
    qc.removeQueries({ queryKey: ["me"] });
  };
};

export const useCurrentUser = () =>
  useQuery<User | null>({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
