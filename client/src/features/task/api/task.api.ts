// axios
import { axiosInstance } from "@/lib/axios";

// models
import type { Task, TaskCreateDto, TaskUpdateDto } from "@/models/task";

export const fetchTasks = async (projectId: number): Promise<Task[]> => {
  const { data } = await axiosInstance.get<Task[]>(
    `/tasks/project/${projectId}`
  );
  return data;
};

export const createTask = async (task: TaskCreateDto): Promise<Task> => {
  const { data } = await axiosInstance.post<Task>(
    `/tasks/project/${task.projectId}`,
    task
  );
  return data;
};

export const updateTask = async (
  id: number,
  task: TaskUpdateDto
): Promise<Task> => {
  const { data } = await axiosInstance.put<Task>(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
