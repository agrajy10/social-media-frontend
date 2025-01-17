import { PostComment } from "../types/Post";

function insertCommentReply(
  comments: PostComment[],
  newComment: PostComment
): PostComment[] {
  return comments.map((comment: PostComment) => {
    if (comment.id === newComment.parentId) {
      return {
        ...comment,
        replies: [{ ...newComment, replies: [] }, ...comment.replies],
      };
    }

    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: insertCommentReply(comment.replies, newComment),
      };
    }

    return comment;
  });
}
export default insertCommentReply;
