import { createFileRoute, redirect } from "@tanstack/react-router";
import ResetPassword from "../components/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (!("token" in location.search)) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return <ResetPassword />;
}
