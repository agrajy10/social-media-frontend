import { createFileRoute } from "@tanstack/react-router";
import SignIn from "../components/SignIn/SignIn";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <SignIn />;
}
