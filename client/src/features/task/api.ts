import { axiosInstance } from "../../lib/axios";

export const fetchTasks = async (id: string) => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res;
};

export const createTask = async (data: { name: string; projectId: string }) => {
  const res = await axiosInstance.post(`/tasks/${data.projectId}`, data);
  return res.data;
};
