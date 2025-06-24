import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";

import { AppRouter } from "./routes/AppRouter";
import { MantineProvider } from "@mantine/core";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { ModalsProvider } from "@mantine/modals";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    {/* <Provider store={store}> */}
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <AppRouter />
      </ModalsProvider>
    </QueryClientProvider>
    {/* </Provider> */}
  </MantineProvider>
);
