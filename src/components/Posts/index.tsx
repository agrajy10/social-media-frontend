import { Stack } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";
import DeletePostDialog from "../DeletePostDialog";
import { useState } from "react";
import { useDeletePost, useEditPost } from "../../feature/posts/queries";
import { useSnackbar } from "notistack";
import EditPostDialog from "../EditPostDialog";
import { useQueryClient } from "@tanstack/react-query";

enum DialogType {
  EDIT_POST = "EDIT_POST",
  DELETE_POST = "DELETE_POST",
}

function Posts({
  posts,
  refetch,
  queryKey,
}: {
  posts: PostType[];
  refetch?: () => void;
  queryKey?: string[];
}) {
  const [dialogOpen, setDialogOpen] = useState<DialogType | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const { user } = useAuth();
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();
  const { mutate: editPost, isPending: isEditingPost } = useEditPost();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onActionBtnClick = (type: DialogType, id: number) => {
    setPostId(id);
    setDialogOpen(type);
  };

  const closeDialog = () => {
    setDialogOpen(null);
    setPostId(null);
  };

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

  const handleEditPost = (values: { title: string; content: string }) => {
    if (!postId) return;
    editPost(
      { postId, values },
      {
        onSuccess: (updatedPost) => {
          enqueueSnackbar("Post updated successfully", { variant: "success" });
          if (queryKey?.length) {
            queryClient.setQueryData(queryKey, (oldPosts: PostType[] = []) => {
              return oldPosts.map((post) => {
                if (post.id === updatedPost.id) return updatedPost;
                return post;
              });
            });
          }
          closeDialog();
        },
        onError: () => {
          enqueueSnackbar("An error occurred. Please try again", {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Post
            onEditBtnClick={() =>
              onActionBtnClick(DialogType.EDIT_POST, post.id)
            }
            onDeleteBtnClick={() =>
              onActionBtnClick(DialogType.DELETE_POST, post.id)
            }
            key={post.id}
            isAuthor={post.author.id === user?.id}
            {...post}
          />
        ))}
      </Stack>
      <EditPostDialog
        title={posts.find((post) => post.id === postId)?.title || ""}
        content={posts.find((post) => post.id === postId)?.content || ""}
        handleEditPost={handleEditPost}
        open={dialogOpen === DialogType.EDIT_POST}
        handleClose={closeDialog}
        isSubmitting={isEditingPost}
      />
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
