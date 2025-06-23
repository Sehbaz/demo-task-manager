import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/index";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // ✅ add the RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
