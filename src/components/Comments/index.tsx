import { useSnackbar } from "notistack";
import { useAddComment, useReplyComment } from "../../feature/posts/queries";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { Post, PostComment } from "../../types/Post";
import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

type CommentsProps = {
  postId: number;
  comments: PostComment[];
  totalComments: number;
};

function Comments({ postId, comments, totalComments }: CommentsProps) {
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();
  const { mutate: replyComment, isPending: isReplying } = useReplyComment();
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const handleAddComment = (content: string, resetForm: () => void) => {
    addComment(
      { postId, content },
      {
        onSuccess: (newComment) => {
          enqueueSnackbar("Comment added successfully", { variant: "success" });
          queryClient.setQueryData(["posts"], (oldPosts: Post[] = []) => {
            return oldPosts.map((post) => {
              if (post.id === newComment.postId)
                return { ...post, comments: [newComment, ...post.comments] };
              return post;
            });
          });
          resetForm();
        },
        onError: () => {
          enqueueSnackbar("An error occurred. Please try again", {
            variant: "error",
          });
        },
      }
    );
  };

  const replyToComment = (
    commentId: number,
    content: string,
    resetForm: () => void
  ) => {
    replyComment(
      { postId, commentId, content },
      {
        onSuccess: () => {
          resetForm();
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
      <AddComment isSubmitting={isAddingComment} onSubmit={handleAddComment} />
      {!!comments.length && (
        <>
          <Typography
            fontWeight={700}
            fontSize={14}
            sx={{ my: 2, pb: 1, borderBottom: "1px solid #efefef" }}
          >
            Comments ({totalComments})
          </Typography>
          <Stack spacing={1}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                isSubmitting={isReplying}
                onSubmit={replyToComment}
                comment={comment}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
}

export default Comments;
