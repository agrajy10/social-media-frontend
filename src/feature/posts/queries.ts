import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { CreatePostFormValues } from "../../components/AddPost";
import { Post } from "../../types/Post";

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data.data;
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
}): Promise<void> => {
  await axiosInstance.post(`/posts/${postId}/comments`, { content });
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
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

export const useAddComment = () =>
  useMutation({
    mutationFn: addComment,
  });
