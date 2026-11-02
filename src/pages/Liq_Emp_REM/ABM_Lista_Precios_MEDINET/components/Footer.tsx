import { Button, PrevNextButtons } from "@/components/ui/Button";
import type { Direction, Modo, MoveState } from "@/types/generalTypes";
import { ClipboardPlus, Search, SquarePen, Trash, View } from "lucide-react";
import { useModo } from "../hooks/useModo";
import { useCallback } from "react";

type Props = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
};

const Footer = ({ estado, handleOnChangeMove }: Props) => {
  const { modo, handleOnChangeModo } = useModo();

  const changeModo = useCallback((m: Modo) => {
    handleOnChangeModo(m);
  }, []);

  return (
    <section className="flex flex-row items-center justify-between w-full h-15">
      <div className="flex flex-row gap-4 pl-1 w-[33%]">
        <Button
          className="flex flex-row items-center gap-1 w-30 h-10"
          onClick={() => changeModo("view")}
        >
          <View width={"20px"} height={"20px"} />
          Ver Registro
        </Button>
        <Button
          className="flex flex-row items-center gap-1 w-30 h-10"
          onClick={() => changeModo("search")}
        >
          <Search width={"20px"} height={"20px"} />
          Buscar
        </Button>
      </div>
      <div className="flex flex-row gap-4 w-[33%] justify-center">
        <PrevNextButtons
          estado={estado}
          handleOnChangeMove={handleOnChangeMove}
        />
      </div>
      <div className="flex flex-row pr-1 gap-4 w-[33%] justify-end">
        <Button
          className="flex flex-row items-center gap-1 w-30 h-10"
          onClick={() => changeModo("create")}
        >
          <ClipboardPlus width={"20px"} height={"20px"} />
          Crear
        </Button>
        <Button
          className="flex flex-row items-center gap-1 w-30 h-10"
          onClick={() => changeModo("edit")}
        >
          <SquarePen width={"20px"} height={"20px"} />
          Editar
        </Button>
        <Button
          className="flex flex-row items-center gap-1 w-30 h-10"
          variant="danger"
        >
          <Trash width={"20px"} height={"20px"} />
          Borrar
        </Button>
      </div>
    </section>
  );
};

export default Footer;
