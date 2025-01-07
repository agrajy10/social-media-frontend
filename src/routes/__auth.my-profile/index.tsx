import { Container } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/my-profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Container maxWidth="xs" sx={{ my: 5 }}>
        123
      </Container>
    </>
  );
}
