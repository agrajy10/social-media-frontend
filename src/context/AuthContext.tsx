import { createContext, ReactNode, useEffect, useState } from "react";
import { useAccountDetails } from "../feature/account/queries";
import { User } from "../type/User";
import { Box, CircularProgress } from "@mui/material";
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { refetch } = useAccountDetails();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

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
