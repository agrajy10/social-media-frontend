import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import { User } from "../../type/User";

const fetchAccountDetails = async (): Promise<User> => {
  const response = await axiosInstance.get(`/users/profile`);
  return response.data.data;
};

export const useAccountDetails = () =>
  useQuery({ queryKey: ["accountDetails"], queryFn: fetchAccountDetails });
