import { createContext, useContext } from "react";
import { type AuthValue } from "../types/generalTypes";

export const AuthContext = createContext<AuthValue | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default useAuth;
