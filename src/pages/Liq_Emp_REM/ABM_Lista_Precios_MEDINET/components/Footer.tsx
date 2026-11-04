import { Button, PrevNextButtons } from "@/components/ui/Button";
import type { Direction, MoveState } from "@/types/generalTypes";
import {
  Check,
  ClipboardPlus,
  Search,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import { useModo } from "../hooks/useModo";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useState } from "react";

type Props = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
  handleOnOpenSearch: () => void;
};

const Footer = ({ estado, handleOnChangeMove, handleOnOpenSearch }: Props) => {
  const [confirmMoldalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string | undefined>(
    undefined,
  );

  const { modo, handleOnChangeModo } = useModo();

  const isEditMode = modo === "edit" || modo === "create";
  return (
    <section className="flex flex-row items-center justify-between w-full h-15">
      <ConfirmModal
        isOpen={confirmMoldalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {}}
        title={confirmMessage}
      />
      <div className="flex flex-row gap-4 pl-1 w-[33%]">
        {!isEditMode && (
          <>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              onClick={handleOnOpenSearch}
            >
              <Search width={"20px"} height={"20px"} />
              Buscar
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-row gap-4 w-[33%] justify-center">
        {!isEditMode && (
          <PrevNextButtons
            estado={estado}
            handleOnChangeMove={handleOnChangeMove}
          />
        )}
      </div>
      <div className="flex flex-row pr-1 gap-4 w-[33%] justify-end">
        {!isEditMode && (
          <>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              onClick={() => handleOnChangeModo("create")}
            >
              <ClipboardPlus width={"20px"} height={"20px"} />
              Nuevo
            </Button>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              onClick={() => handleOnChangeModo("edit")}
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
          </>
        )}
        {isEditMode && (
          <>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              variant="secondary"
              onClick={() => handleOnChangeModo("view")}
            >
              <Check width={"20px"} height={"20px"} />
              Aceptar
            </Button>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              variant="danger"
              onClick={() => handleOnChangeModo("view")}
            >
              <X width={"20px"} height={"20px"} />
              Cancelar
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Footer;
