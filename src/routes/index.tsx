import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "../components/SignIn/SignIn";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context }) => {
    if (context.auth.user) {
      throw redirect({
        to: "/my-profile/change-password",
      });
    }
  },
});

function Index() {
  return <SignIn />;
}
