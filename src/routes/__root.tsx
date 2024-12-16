import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import AppTheme from "../theme/AppTheme";
import { CssBaseline } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppTheme disableCustomTheme={false}>
        <CssBaseline enableColorScheme />
        <Outlet />
        <TanStackRouterDevtools />
      </AppTheme>
    </>
  ),
});
