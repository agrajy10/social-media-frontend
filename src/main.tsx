import { StrictMode, useContext } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StyledEngineProvider } from "@mui/material/styles";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return enqueueSnackbar(error.response?.data.message.text, {
          variant: "error",
        });
      }
      return enqueueSnackbar("An error occurred. Please try again later.", {
        variant: "error",
      });
    },
  }),
});

function InnerApp() {
  const auth = useContext(AuthContext);
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <StyledEngineProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <AuthProvider>
              <InnerApp />
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
    </StrictMode>
  );
}
