import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  fetchProjects,
  fetchProjectById,
  updateProject,
} from "./api";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
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
