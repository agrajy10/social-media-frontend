import { Stack } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";
import DeletePostDialog from "../DeletePostDialog";
import { useState } from "react";
import {
  useDeletePost,
  useEditPost,
  useLikePost,
} from "../../feature/posts/queries";
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
  const { mutate: likePost } = useLikePost();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

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
        onSuccess: () => {
          enqueueSnackbar("Post updated successfully", { variant: "success" });
          refetch?.();
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

  const handlePostLike = (postId: number, isLiked: boolean) => {
    likePost(
      { postId, isLiked },
      {
        onSuccess: (newCount) => {
          queryClient.setQueryData(["posts"], (oldPosts: any) => {
            const newPosts = JSON.parse(JSON.stringify(oldPosts));
            for (let page = 0; page < newPosts.pages.length; page++) {
              let updated = false;
              for (const post of newPosts.pages[page].data) {
                if (post.id === postId) {
                  post.isLiked = !isLiked;
                  post._count.likes = newCount;
                  updated = true;
                  break;
                }
              }
              if (updated) break;
            }
            return newPosts;
          });
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
            queryKey={queryKey}
            onEditBtnClick={() =>
              onActionBtnClick(DialogType.EDIT_POST, post.id)
            }
            onDeleteBtnClick={() =>
              onActionBtnClick(DialogType.DELETE_POST, post.id)
            }
            onLikeBtnClick={() => handlePostLike(post.id, post.isLiked)}
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
