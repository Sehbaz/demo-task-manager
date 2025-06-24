import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject, fetchProjects } from "./api";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
};
