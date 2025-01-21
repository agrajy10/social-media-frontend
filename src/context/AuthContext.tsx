import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import { useFetchMyProfile } from "../feature/account/queries";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { refetch } = useFetchMyProfile();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    const { data } = await refetch();
    if (data) {
      setUser(data);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate({ to: "/" });
    queryClient.invalidateQueries();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            inset: 0,
            bgColor: "common.white",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
