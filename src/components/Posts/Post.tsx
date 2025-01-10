import { Avatar, Box, Paper, Typography } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import parse from "html-react-parser";
import { formatDistanceToNow, differenceInMilliseconds } from "date-fns";
import PostUserMenu from "../PostUserMenu";

const UserAvatar = ({
  profileImage,
  username,
}: {
  profileImage: string | null;
  username: string;
}) => {
  if (profileImage) {
    return (
      <Avatar
        sx={{ width: 24, height: 24 }}
        alt={username}
        src={profileImage}
      />
    );
  }

  return (
    <Avatar sx={{ width: 24, height: 24, fontSize: 13 }}>
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );
};

function Post({
  title,
  content,
  createdAt,
  updatedAt,
  author,
  isAuthor = false,
  onDeleteBtnClick,
  onEditBtnClick,
}: PostType & {
  isAuthor?: boolean;
  onDeleteBtnClick?: () => void;
  onEditBtnClick?: () => void;
}) {
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
      </Box>
      {parse(content)}
    </Paper>
  );
}

export default Post;
