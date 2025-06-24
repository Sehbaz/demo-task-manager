import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks } from "./api";

export const useTasks = (id: string) =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(id),
  });

export const useCreateTasks = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["project", String(variables.projectId)],
      });
    },
  });
};

export const useDeleteTasks = () => {
  const qc = useQueryClient();
  return useMutation<
    { id: string; projectId: string },
    unknown,
    { id: string; projectId: string }
  >({
    mutationFn: ({ id }) => deleteTask(id),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["project", String(variables.projectId)],
      });
    },
  });
};
