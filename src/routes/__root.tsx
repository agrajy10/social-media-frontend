import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import AppTheme from "../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppTheme disableCustomTheme={false}>
        <CssBaseline enableColorScheme />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <TanStackRouterDevtools />
      </AppTheme>
    </>
  ),
});
