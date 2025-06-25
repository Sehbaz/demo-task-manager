// axios
import { axiosInstance } from "@/lib/axios";

// types
import type {
  Project,
  ProjectCreateDto,
  ProjectUpdateDto,
} from "@/models/project";

export const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await axiosInstance.get<Project[]>("/projects");
  return data;
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const { data } = await axiosInstance.get<Project>(`/projects/${id}`);
  return data;
};

export const createProject = async (
  project: ProjectCreateDto
): Promise<Project> => {
  const { data } = await axiosInstance.post<Project>("/projects", project);
  return data;
};

export const updateProject = async (
  id: number,
  project: ProjectUpdateDto
): Promise<Project> => {
  const { data } = await axiosInstance.put<Project>(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}`);
};
