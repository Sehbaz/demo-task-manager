import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { token } from "../slices/token";

const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: async (headers) => {
      const accessToken = await token.getToken();
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

      return headers;
    },
  });

  return await baseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  tagTypes: ["Projects"],
});

export default api;
