import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import { useFetchAccountDetails } from "../feature/account/queries";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { refetch } = useFetchAccountDetails();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
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
