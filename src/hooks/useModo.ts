import type { Modo } from "@/types/generalTypes";
import { createContext, useContext } from "react";

type ModoContextValues = {
  modo: Modo;
  handleOnChangeModo: (m: Modo) => void;
};

export const ModoContext = createContext<ModoContextValues | null>(null);

export const useModo = () => {
  const ctx = useContext(ModoContext);
  if (!ctx) {
    throw new Error("useModo debe usarse dentro de un ModoProvider.");
  }
  return ctx;
};
