import { createFileRoute } from "@tanstack/react-router";
import SignIn from "../SignIn";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <SignIn />;
}
