// axios
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
const BASE_URL = "http://localhost:3000";

// create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// attach token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
