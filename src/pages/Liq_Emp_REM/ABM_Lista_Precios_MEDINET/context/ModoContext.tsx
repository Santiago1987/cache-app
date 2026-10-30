import type { Modo } from "@/types/generalTypes";
import { useCallback, useState, type ReactNode } from "react";
import { ModoContext } from "../hooks/useModo";

const ModoProvider = ({ children }: { children: ReactNode }) => {
  const [modo, setModo] = useState<Modo>("view");

  const handleOnChangeModo = useCallback((m: Modo) => {
    setModo(m);
  }, []);

  return (
    <ModoContext.Provider value={{ modo, handleOnChangeModo }}>
      {children}
    </ModoContext.Provider>
  );
};

export default ModoProvider;
