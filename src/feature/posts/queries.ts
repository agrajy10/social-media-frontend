import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { CreatePostFormValues } from "../../components/AddPost";

const createPost = async (values: CreatePostFormValues) => {
  const response = await axiosInstance.post("/posts/create-post", values);
  return response.data.data;
};

export const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
  });
