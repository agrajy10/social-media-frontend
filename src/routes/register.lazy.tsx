import { createLazyFileRoute } from "@tanstack/react-router";
import SignUp from "../components/SignUp";

export const Route = createLazyFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
