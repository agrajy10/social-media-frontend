import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import AppTheme from "../theme/AppTheme";
import { CssBaseline } from "@mui/material";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "../context/AuthContext";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootContainer,
});

function RootContainer() {
  return (
    <>
      <AppTheme disableCustomTheme={false}>
        <CssBaseline enableColorScheme />
        <Outlet />
        <TanStackRouterDevtools />
      </AppTheme>
    </>
  );
}
