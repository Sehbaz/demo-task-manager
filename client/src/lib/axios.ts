import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Change to your API base URL
  withCredentials: true, // If you use cookies/sessions
  // You can add headers or interceptors here if needed
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
