// axios
import { axiosInstance } from "@/lib/axios";

// models
import type { LoginRequest, LoginResponse, User } from "@/models/auth";

const TOKEN_KEY = "token";

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// hooks
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await axiosInstance.post<LoginResponse>("/auth/login", data);
    setToken(res.data.access_token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = (): void => {
  removeToken();
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await axiosInstance.get<User>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    removeToken();
    return null;
  }
};
