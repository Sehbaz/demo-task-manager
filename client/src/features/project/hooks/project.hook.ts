// react
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// api
import {
  createProject,
  deleteProject,
  fetchProjects,
  fetchProjectById,
  updateProject,
  //  updateProject,
} from "@/features/project/api/project.api";

// models
import type {
  Project,
  ProjectCreateDto,
  ProjectUpdateDto,
  // ProjectUpdateDto,
} from "@/models/project";
import type { UseMutationOptions } from "@tanstack/react-query";

// hooks
export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

export const useProject = (id: number) =>
  useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });

export const useCreateProject = (
  options?: UseMutationOptions<Project, Error, ProjectCreateDto>
) => {
  const qc = useQueryClient();
  return useMutation<Project, Error, ProjectCreateDto>({
    mutationFn: createProject,
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

// Update an existing project
export const useUpdateProject = (
  options?: UseMutationOptions<
    Project,
    Error,
    { id: number; project: ProjectUpdateDto }
  >
) => {
  const qc = useQueryClient();
  return useMutation<Project, Error, { id: number; project: ProjectUpdateDto }>(
    {
      mutationFn: ({ id, project }) => updateProject(id, project),
      onSuccess: (...args) => {
        qc.invalidateQueries({ queryKey: ["projects"] });
        options?.onSuccess?.(...args);
      },
      ...options,
    }
  );
};

export const useDeleteProject = (
  options?: UseMutationOptions<void, Error, number>
) => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteProject,
    onSuccess: (...args) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
