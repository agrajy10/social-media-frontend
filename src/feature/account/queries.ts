import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { User } from "../../types/User";
import convertToBase64 from "../../utils/convertToBase64";
import { ChangePasswordFormValues } from "../../components/ManageProfile/ChangePassword";

const fetchAccountDetails = async (): Promise<User> => {
  const response = await axiosInstance.get("/users/profile");
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

export const useFetchAccountDetails = () =>
  useQuery({
    queryKey: ["user", "accountDetails"],
    queryFn: fetchAccountDetails,
    enabled: false,
  });

export const useUpdateProfileImage = () =>
  useMutation({
    mutationFn: updateProfileImage,
  });

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: updatePassword,
  });
