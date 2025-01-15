import { useSnackbar } from "notistack";
import { useAddComment } from "../../feature/posts/queries";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { PostComment } from "../../types/Post";
import { Stack, Typography } from "@mui/material";

type CommentsProps = {
  postId: number;
  comments: PostComment[];
};

function Comments({ postId, comments }: CommentsProps) {
  const { mutate: addComment, isPending: isAddingComment } = useAddComment();

  const { enqueueSnackbar } = useSnackbar();

  const handleAddComment = (content: string, resetForm: () => void) => {
    addComment(
      { postId, content },
      {
        onSuccess: () => {
          enqueueSnackbar("Comment added successfully", { variant: "success" });
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
            Comments
          </Typography>
          <Stack spacing={1}>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
}

export default Comments;
