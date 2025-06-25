// axios
import { axiosInstance } from "@/lib/axios";

// models
import type { Task, TaskCreateDto } from "@/models/task";

export const fetchTasks = async (projectId: number): Promise<Task[]> => {
  const { data } = await axiosInstance.get<Task[]>(`/tasks/${projectId}`);
  return data;
};

export const createTask = async (task: TaskCreateDto): Promise<Task> => {
  const { data } = await axiosInstance.post<Task>(
    `/tasks/${task.projectId}`,
    task
  );
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
