import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@mui/material";
import AddPost from "../../components/AddPost";
import { useCreatePost } from "../../feature/posts/queries";
import { useSnackbar } from "notistack";

export const Route = createLazyFileRoute("/__auth/feed/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreatePost = async (title: string, content: string) => {
    try {
      await createPost({ title, content });
      enqueueSnackbar("Post created successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("An error occurred. Please try again", {
        variant: "error",
      });
      throw error;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AddPost onSubmit={handleCreatePost} isSubmitting={isCreatingPost} />
    </Container>
  );
}
