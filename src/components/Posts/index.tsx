import { Stack } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";
import DeletePostDialog from "../DeletePostDialog";
import { useState } from "react";
import { useDeletePost } from "../../feature/posts/queries";
import { useSnackbar } from "notistack";

enum DialogType {
  DELETE_POST = "DELETE_POST",
}

function Posts({
  posts,
  refetch,
}: {
  posts: PostType[];
  refetch?: () => void;
}) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState<DialogType | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();
  const { enqueueSnackbar } = useSnackbar();

  const onDeleteBtnClick = (id: number) => {
    setPostId(id);
    setDialogOpen(DialogType.DELETE_POST);
  };

  const closeDialog = () => setDialogOpen(null);

  const handleDeletePost = () => {
    if (!postId) return;
    deletePost(postId, {
      onSuccess: () => {
        enqueueSnackbar("Post deleted successfully", { variant: "success" });
        closeDialog();
        refetch?.();
      },
      onError: () => {
        enqueueSnackbar("An error occurred. Please try again", {
          variant: "error",
        });
      },
    });
  };

  return (
    <>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Post
            onDeleteBtnClick={() => onDeleteBtnClick(post.id)}
            key={post.id}
            {...post}
            isAuthor={post.author.id === user?.id}
          />
        ))}
      </Stack>
      <DeletePostDialog
        handleDeletePost={handleDeletePost}
        isSubmitting={isDeletingPost}
        open={dialogOpen === DialogType.DELETE_POST}
        handleClose={closeDialog}
      />
    </>
  );
}

export default Posts;
