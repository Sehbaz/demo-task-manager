import { api } from ".";

type Task = {
  id: string;
  title: string;
  projectId: string;
};

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<any, any>({
      query: ({ projectId, title }) => ({
        url: `/tasks/${projectId}`,
        method: "POST",
        body: {
          title: title,
        },
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteTask: builder.mutation<any, any>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation } = taskApi;

export default taskApi;
