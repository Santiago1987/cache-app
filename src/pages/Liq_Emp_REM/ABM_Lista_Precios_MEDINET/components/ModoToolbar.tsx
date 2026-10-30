import { Button } from "@/components/ui/Button";
import { useModo } from "../hooks/useModo";

const ModoToolbar = () => {
  const { modo, handleOnChangeModo } = useModo();

  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="text-sm font-bold">
        Modo: <span className="uppercase">{modo}</span>
      </span>
      <Button
        type="button"
        variant={modo === "view" ? "primary" : "secondary"}
        onClick={() => handleOnChangeModo("view")}
      >
        Ver
      </Button>
      <Button
        type="button"
        variant={modo === "edit" ? "primary" : "secondary"}
        onClick={() => handleOnChangeModo("edit")}
      >
        Editar
      </Button>
      <Button
        type="button"
        variant={modo === "create" ? "primary" : "secondary"}
        onClick={() => handleOnChangeModo("create")}
      >
        Nuevo
      </Button>
    </div>
  );
};

export default ModoToolbar;
