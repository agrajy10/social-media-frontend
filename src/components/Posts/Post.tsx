import { Box, Paper, Typography, Button } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import parse from "html-react-parser";
import { formatDistanceToNow, differenceInMilliseconds } from "date-fns";
import PostUserMenu from "../PostUserMenu";
import Comments from "../Comments";
import UserAvatar from "../UserAvatar";
import usePostComments from "../../hooks/usePostComments";
import LikeButton from "../LikeButton";

function Post({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  author,
  isAuthor = false,
  comments,
  _count,
  onDeleteBtnClick,
  onEditBtnClick,
  hasMoreComments,
  queryKey,
  onLikeBtnClick,
  isLiked,
}: PostType & {
  queryKey?: string[];
  isAuthor?: boolean;
  onDeleteBtnClick?: () => void;
  onEditBtnClick?: () => void;
  onLikeBtnClick?: () => void;
}) {
  const { setPage } = usePostComments({
    postId: id,
    hasMoreComments,
    queryKey,
  });

  const wasPostUpdated =
    differenceInMilliseconds(new Date(updatedAt), new Date(createdAt)) > 0;

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, bgcolor: "common.white", position: "relative" }}
    >
      {isAuthor && (
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <PostUserMenu
            onEditBtnClick={onEditBtnClick}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </Box>
      )}
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>
      <Box
        sx={{
          borderTop: "1px solid rgba(0, 0, 0, 0.15)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
          my: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          py: 1,
        }}
      >
        <UserAvatar
          profileImage={author.profileImage}
          username={author.username}
        />
        <Typography variant="caption">{author.username}</Typography>-
        <Typography variant="caption">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Typography>
        {wasPostUpdated && (
          <Typography variant="caption">
            Last updated:{" "}
            {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
          </Typography>
        )}
        {!!onLikeBtnClick && (
          <Box sx={{ ml: "auto" }}>
            <LikeButton
              onClick={onLikeBtnClick}
              isLiked={isLiked}
              likes={_count.likes}
            />
          </Box>
        )}
      </Box>
      {parse(content)}
      {comments && (
        <Comments
          totalComments={_count.comments}
          postId={id}
          comments={comments}
        />
      )}
      {hasMoreComments && (
        <Button
          onClick={() => setPage((prev) => (prev === 0 ? 2 : prev + 1))}
          variant="outlined"
          sx={{ mt: 1, bgcolor: "#fafafa" }}
          fullWidth
        >
          View more comments
        </Button>
      )}
    </Paper>
  );
}

export default Post;
