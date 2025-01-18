import { useSnackbar } from "notistack";
import { useAddComment, useReplyComment } from "../../feature/posts/queries";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { Post, PostComment } from "../../types/Post";
import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import insertCommentReply from "../../utils/insertCommentReply";

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
          queryClient.setQueryData(["posts"], (oldPosts: any) => {
            let newPosts = JSON.parse(JSON.stringify(oldPosts));
            for (let page = 0; page < newPosts.pages.length; page++) {
              let updated = false;
              for (const post of newPosts.pages[page].data) {
                if (post.id === newComment.postId) {
                  post.comments = [
                    { ...newComment, replies: [] },
                    ...post.comments,
                  ];
                  post._count.comments++;
                  updated = true;
                  break;
                }
              }
              if (updated) break;
            }
            return newPosts;
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
        onSuccess: (newComment) => {
          queryClient.setQueryData(["posts"], (oldPosts: any) => {
            let newPosts = JSON.parse(JSON.stringify(oldPosts));
            for (let page = 0; page < newPosts.pages.length; page++) {
              let updated = false;
              for (const post of newPosts.pages[page].data) {
                if (post.id === newComment.postId) {
                  post.comments = insertCommentReply(post.comments, newComment);
                  updated = true;
                  break;
                }
              }
              if (updated) break;
            }
            return newPosts;
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
