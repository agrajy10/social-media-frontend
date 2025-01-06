import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/",
      });
    } else {
      throw redirect({
        to: "/my-profile/change-password",
      });
    }
  },
});

function AuthLayout() {
  return <Outlet />;
}
