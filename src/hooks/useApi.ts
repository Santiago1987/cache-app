import useAuth from "@/hooks/useAuth";
import apiCall, { UnauthorizedError } from "@/services/api";
import { useCallback } from "react";

//hook para usar la función apiCall y revalidar la sesión si es necesario
const useApi = () => {
  const { revalidate } = useAuth();

  return useCallback(
    async <T>(fn: string, parameters: unknown): Promise<T> => {
      try {
        return await apiCall<T>(fn, parameters);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          await revalidate(); // revalida la sesión si es necesario, si murio la sesion se limpia el estado del usuario en el contexto de autenticación
        }
        throw error;
      }
    },
    [revalidate],
  );
};

export default useApi;
