import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StyledEngineProvider } from "@mui/material/styles";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import { routeTree } from "./routeTree.gen";
import { SnackbarProvider } from "notistack";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StyledEngineProvider>
        <SnackbarProvider
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
}
