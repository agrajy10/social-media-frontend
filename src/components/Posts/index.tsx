import { Stack } from "@mui/material";
import { Post as PostType } from "../../types/Post";
import Post from "./Post";

function Posts({ posts }: { posts: PostType[] }) {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Stack>
  );
}

export default Posts;
