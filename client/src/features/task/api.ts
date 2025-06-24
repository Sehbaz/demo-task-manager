import { axiosInstance } from "../../lib/axios";

export const fetchTasks = async (id: string) => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res;
};

export const createTask = async (data: {
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: number;
}) => {
  const res = await axiosInstance.post(`/tasks/${data.projectId}`, data);
  return res.data;
};

export const deleteTask = async (id: string | number) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};
