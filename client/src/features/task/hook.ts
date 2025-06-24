import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTasks } from "./api";

export const useTasks = (id: string) =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(id),
  });

export const useCreateTasks = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
};
