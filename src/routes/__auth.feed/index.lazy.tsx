import { createLazyFileRoute } from "@tanstack/react-router";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import AddPost from "../../components/AddPost";
import { useCreatePost, useFetchPosts } from "../../feature/posts/queries";
import { useSnackbar } from "notistack";
import Posts from "../../components/Posts";

export const Route = createLazyFileRoute("/__auth/feed/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const { enqueueSnackbar } = useSnackbar();
  const { data: posts, isLoading: arePostsLoading, refetch } = useFetchPosts();

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
      <Box sx={{ my: 6 }}>
        {arePostsLoading && (
          <Stack spacing={2}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton sx={{ transform: "none" }} height={200} key={index} />
            ))}
          </Stack>
        )}
        {posts && (
          <Posts queryKey={["posts"]} posts={posts} refetch={refetch} />
        )}
      </Box>
    </Container>
  );
}
