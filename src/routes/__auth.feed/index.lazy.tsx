import { createLazyFileRoute } from "@tanstack/react-router";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import AddPost from "../../components/AddPost";
import { useCreatePost, useFetchPosts } from "../../feature/posts/queries";
import { useSnackbar } from "notistack";
import Posts from "../../components/Posts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/Post";

export const Route = createLazyFileRoute("/__auth/feed/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px 0px 0px 0px",
  });
  const {
    data,
    isLoading: arePostsLoading,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchPosts();

  useEffect(() => {
    if (!inView) return;
    fetchNextPage();
  }, [inView]);

  const handleCreatePost = async (title: string, content: string) => {
    try {
      await createPost(
        { title, content },
        {
          onSuccess: (newPost: Post) => {
            queryClient.setQueryData(["posts"], (oldPosts: any) => {
              const newPosts = { ...oldPosts };
              newPosts.pages[0].data = [newPost, ...newPosts.pages[0].data];
              return newPosts;
            });
          },
        }
      );
      enqueueSnackbar("Post created successfully", { variant: "success" });
      refetch();
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
        {data && (
          <Posts
            queryKey={["posts"]}
            posts={data.pages.map((page) => page.data).flat()}
            refetch={refetch}
          />
        )}
        {(arePostsLoading || isFetchingNextPage) && (
          <Stack sx={{ mt: 2 }} spacing={2}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton sx={{ transform: "none" }} height={200} key={index} />
            ))}
          </Stack>
        )}
        {hasNextPage && <Box ref={ref}></Box>}
      </Box>
    </Container>
  );
}
