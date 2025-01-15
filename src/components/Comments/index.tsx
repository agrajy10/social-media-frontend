import { useSnackbar } from "notistack";
import { useAddComment } from "../../feature/posts/queries";
import AddComment from "./AddComment";
import Comment from "./Comment";

type CommentsProps = {
  postId: number;
};

function Comments({ postId }: CommentsProps) {
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
      <Comment />
    </>
  );
}

export default Comments;
