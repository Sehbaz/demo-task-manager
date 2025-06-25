// react
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// api
import {
  createTask,
  deleteTask,
  fetchTasks,
} from "@/features/task/api/task.api";

// models
import type { Task, TaskCreateDto } from "@/models/task";

// hooks
export const useTasks = (projectId: number) =>
  useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks(projectId),
    enabled: !!projectId,
  });

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation<Task, Error, TaskCreateDto>({
    mutationFn: createTask,
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, { id: number; projectId: number }>({
    mutationFn: ({ id }) => deleteTask(id),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};
