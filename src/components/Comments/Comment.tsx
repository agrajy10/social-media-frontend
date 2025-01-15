import { Box, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { PostComment } from "../../types/Post";

type CommentProps = {
  comment: PostComment;
};

function Comment({ comment }: CommentProps) {
  const { author, createdAt, content } = comment;

  return (
    <Box>
      <Box
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.15)",
          py: 1,
          px: 1.5,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          {content}
        </Typography>
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
        >
          <UserAvatar
            width={15}
            height={15}
            fontSize={10}
            profileImage={author.profileImage}
            username={author.username}
          />
          <Typography variant="caption" fontSize={10}>
            {author.username}
          </Typography>
          -
          <Typography variant="caption" fontSize={10}>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Comment;
