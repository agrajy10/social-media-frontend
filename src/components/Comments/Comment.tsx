import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { PostComment } from "../../types/Post";
import AddComment from "./AddComment";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

type CommentProps = {
  comment: PostComment;
  isSubmitting: boolean;
  onSubmit: (parentId: number, content: string, resetForm: () => void) => void;
};

function Comment({ comment, isSubmitting, onSubmit }: CommentProps) {
  const [reply, setReply] = useState(false);
  const { id, author, createdAt, content, replies } = comment;

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
          <Typography
            sx={{ "& a": { textDecoration: "none", color: "inherit" } }}
            variant="caption"
            fontSize={10}
          >
            <Link
              to="/$username/profile"
              params={{ username: author.username }}
            >
              {author.username}
            </Link>
          </Typography>
          -
          <Typography variant="caption" fontSize={10}>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Box>
        {reply && (
          <Box sx={{ mt: 1 }}>
            <AddComment
              isSubmitting={isSubmitting}
              onSubmit={(content, resetForm) =>
                onSubmit(id, content, resetForm)
              }
            />
          </Box>
        )}
        <ButtonBase
          onClick={() => setReply((prev) => !prev)}
          sx={{ fontSize: 10, mt: 0.5 }}
        >
          {reply ? "Cancel" : "Reply"}
        </ButtonBase>
      </Box>
      {!!replies.length && (
        <Stack spacing={1} sx={{ pl: 1, pt: 1 }}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Comment;
