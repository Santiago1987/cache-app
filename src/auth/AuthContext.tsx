import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { type AuthValue } from "@/types/generalTypes";

type User = Pick<AuthValue, "user">["user"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // rehidrata el usuario desde el backend al cargar la aplicación
  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => setUser(res?.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (name: string, password: string) => {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: name, password }),
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401)
          throw new Error("Usuario o contraseña incorrectos");
        if (res.status === 403) throw new Error("Usuario no autorizado");
        if (!res.ok) throw new Error("Error inesperado al iniciar sesión");
        return res.json();
      })
      .then((res) => setUser(res?.user))
  };

  const clearSession = useCallback(() => {
    setUser(null);
  }, []);

  const logout = () => {
    return fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => clearSession());
  };

  const revalidate = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) {
        setUser((await res.json()).user);
        return true;
      }
      clearSession(); // Si la sesión no es válida, limpiar el estado del usuario
      return false;
    } catch {
      return false; // si hay un error de red, no se deslogea al usuario, solo se devuelve false
    }
  }, [clearSession]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, revalidate }}>
      {children}
    </AuthContext.Provider>
  );
}
