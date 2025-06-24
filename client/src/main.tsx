import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

import { AppRouter } from "./routes/AppRouter";
import { MantineProvider } from "@mantine/core";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    {/* <Provider store={store}> */}
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
    {/* </Provider> */}
  </MantineProvider>
);
