import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { CreatePostFormValues } from "../../components/AddPost";
import { Post, PostComment } from "../../types/Post";

const fetchPosts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ data: Post[]; hasMore: boolean; page: number }> => {
  const response = await axiosInstance.get("/posts", {
    params: { limit: 10, page: pageParam },
  });
  return response.data;
};

const createPost = async (values: CreatePostFormValues): Promise<Post> => {
  const response = await axiosInstance.post("/posts/create-post", values);
  return response.data.data;
};

const editPost = async ({
  postId,
  values,
}: {
  postId: number;
  values: CreatePostFormValues;
}): Promise<Post> => {
  const response = await axiosInstance.put(
    `/posts/update-post/${postId}`,
    values
  );
  return response.data.data;
};

const deletePost = async (postId: number): Promise<void> => {
  await axiosInstance.delete(`/posts/delete-post/${postId}`);
};

const addComment = async ({
  postId,
  content,
}: {
  postId: number;
  content: string;
}): Promise<PostComment> => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, {
    content,
  });
  return response.data.data;
};

const replyComment = async ({
  postId,
  commentId,
  content,
}: {
  postId: number;
  commentId: number;
  content: string;
}): Promise<PostComment> => {
  const response = await axiosInstance.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    {
      content,
    }
  );
  return response.data.data;
};

const likePost = async ({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) => {
  let response;
  if (!isLiked) {
    response = await axiosInstance.post(`/posts/${postId}/likes`);
  } else {
    response = await axiosInstance.delete(`/posts/${postId}/likes`);
  }
  return response.data.data;
};

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
  });

export const useEditPost = () =>
  useMutation({
    mutationFn: editPost,
  });

export const useDeletePost = () =>
  useMutation({
    mutationFn: deletePost,
  });

export const useFetchPosts = () =>
  useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.hasMore) {
        return lastPageParam + 1;
      }
      return undefined;
    },
  });

export const useAddComment = () =>
  useMutation({
    mutationFn: addComment,
  });

export const useReplyComment = () =>
  useMutation({
    mutationFn: replyComment,
  });

export const useLikePost = () =>
  useMutation({
    mutationFn: likePost,
  });
