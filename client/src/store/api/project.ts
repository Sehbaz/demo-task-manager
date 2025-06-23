import { api } from ".";

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

type Task = {
  id: string;
  title: string;
  projectId: string;
};

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<any, void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    createProjects: builder.mutation<any, any>({
      query: (project) => ({
        url: `/projects`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<any, void>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectsMutation,
  useDeleteProjectMutation,
} = projectApi;

export default projectApi;
