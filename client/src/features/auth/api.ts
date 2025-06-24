import { axiosInstance } from "../../lib/axios";

export const login = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);
  const token = res.data.access_token;
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await axiosInstance.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
