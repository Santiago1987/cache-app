import { useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";
type User = { name: string };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => {
    setUser({ name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
