import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { User, UserFollowActions } from "../../types/User";
import convertToBase64 from "../../utils/convertToBase64";
import { ChangePasswordFormValues } from "../../components/ManageProfile/ChangePassword";
import { Post } from "../../types/Post";

const fetchMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get("/users/profile");
  return response.data.data;
};

const fetchMyPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/users/my-posts");
  return response.data.data;
};

const updateProfileImage = async (profile_image: File): Promise<User> => {
  const imageBase64 = await convertToBase64(profile_image);
  const response = await axiosInstance.put("/users/upload-profile-image", {
    profile_image: imageBase64,
  });
  return response.data.data;
};

const updatePassword = async (
  values: ChangePasswordFormValues
): Promise<User> => {
  const response = await axiosInstance.put("/users/change-password", values);
  return response.data.data;
};

const fetchAccountDetails = async (username: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${username}/profile`);
  return response.data.data;
};

const followUnfollow = async ({
  action,
  userId,
}: {
  action: UserFollowActions;
  userId: number;
}) => {
  let response;

  switch (action) {
    case UserFollowActions.FOLLOW:
      response = await axiosInstance.post(`/users/${userId}/follow`);
      break;
    case UserFollowActions.UNFOLLOW:
      response = await axiosInstance.delete(`/users/${userId}/follow`);
      break;
  }

  return response?.data.data;
};

export const useFetchMyProfile = () =>
  useQuery({
    queryKey: ["user", "accountDetails"],
    queryFn: fetchMyProfile,
    enabled: false,
  });

export const useFetchMyPosts = () =>
  useQuery({
    queryKey: ["user", "myPosts"],
    queryFn: fetchMyPosts,
  });

export const useUpdateProfileImage = () =>
  useMutation({
    mutationFn: updateProfileImage,
  });

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: updatePassword,
  });

export const useFetchAccountDetails = (username: string) =>
  useQuery({
    queryKey: [username, "accountDetails"],
    queryFn: () => fetchAccountDetails(username),
  });

export const useFollowUnFollowUser = () =>
  useMutation({
    mutationFn: followUnfollow,
  });
