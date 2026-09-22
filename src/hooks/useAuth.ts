import { createContext, useContext } from "react";

type User = { name: string };

type AuthValue = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default useAuth;
