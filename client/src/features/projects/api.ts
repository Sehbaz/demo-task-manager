import { axiosInstance } from "../../lib/axios";

export const fetchProjects = async () => {
  const res = await axiosInstance.get("/projects");
  return res.data;
};

export const fetchProjectById = async (id: string) => {
  const res = await axiosInstance.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (data: { name: string }) => {
  const res = await axiosInstance.post("/projects", data);
  return res.data;
};

export const deleteProject = async (id: string | number) => {
  const res = await axiosInstance.delete(`/projects/${id}`);
  return res.data;
};
