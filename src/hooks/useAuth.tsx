import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// the type of auth context can possibly be null.
// to handle that case created this hook
const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return auth;
};

export default useAuth;
