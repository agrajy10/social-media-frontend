import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import TopBar from "../components/TopBar";

export const Route = createFileRoute("/__auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}
