import { Stack } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import Post from "./Post";
import useAuth from "../../hooks/useAuth";

function Posts({ posts }: { posts: PostType[] }) {
  const { user } = useAuth();

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Post key={post.id} {...post} isAuthor={post.author.id === user?.id} />
      ))}
    </Stack>
  );
}

export default Posts;
