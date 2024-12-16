import { createLazyFileRoute } from "@tanstack/react-router";
import ResetPassword from "../components/ResetPassword";

export const Route = createLazyFileRoute("/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPassword />;
}
