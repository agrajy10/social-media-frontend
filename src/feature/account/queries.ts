import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axios";

const fetchAccountDetails = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data.data;
};

export const useFetchAccountDetails = () =>
  useQuery({
    queryKey: ["user", "accountDetails"],
    queryFn: fetchAccountDetails,
    enabled: false,
  });
