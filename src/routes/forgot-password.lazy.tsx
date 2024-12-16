import { createLazyFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../components/ForgotPassword";

export const Route = createLazyFileRoute("/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
