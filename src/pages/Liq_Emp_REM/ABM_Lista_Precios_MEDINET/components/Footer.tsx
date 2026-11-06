import { Button, NavigationButtons } from "@/components/ui/Button";
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
import { useCallback, useMemo, useState } from "react";

type PendingAction = "confirm" | "cancel" | "delete" | null;

type Props = {
  estado: MoveState;
  handleOnChangeMove: (m: Direction) => void;
  handleOnOpenSearch: () => void;
  onEditCreate: (mode: "create" | "edit") => void;
  onDelete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const MESSAGES = {
  DELETE: "Esta seguro de borrar esta lista de precios?",
  CREATE: "Se creara un nuevo registro. Continuar?",
  EDIT: "Los cambios seran guardados. Continuar?",
  CANCEL_CREATE: "La creacion de un nuevo registro sera cancelada. Continuar?",
  CANCEL_EDIT: "Todos los cambios hechos se perderan. Continuar?",
} as const;

const Footer = ({
  estado,
  handleOnChangeMove,
  handleOnOpenSearch,
  onEditCreate,
  onDelete,
  onConfirm,
  onCancel,
}: Props) => {
  const [pending, setPending] = useState<PendingAction>(null);
  const { modo } = useModo();

  const CONFIG = useMemo(
    () => ({
      confirm: {
        getMsg: () => (modo === "create" ? MESSAGES.CREATE : MESSAGES.EDIT),
        run: onConfirm,
      },
      cancel: {
        getMsg: () =>
          modo === "create" ? MESSAGES.CANCEL_CREATE : MESSAGES.CANCEL_EDIT,
        run: onCancel,
      },
      delete: { getMsg: () => MESSAGES.DELETE, run: onDelete },
    }),
    [modo, onConfirm, onCancel, onDelete],
  );
  // cuando se confirma en el modal
  const handleModalConfirm = useCallback(() => {
    if (pending) CONFIG[pending].run();
    setPending(null);
  }, [CONFIG, pending]);

  // en caso de borrar un registro
  const handleOnClickDelete = useCallback(() => {
    setPending("delete");
  }, [setPending]);

  //cuando se finaliza el editado o creado y se quiere guardar, requiere confirmacion antes
  const handleOncLickConfirm = useCallback(() => {
    if (modo !== "create" && modo !== "edit") return;
    setPending("confirm");
  }, [modo, setPending]);

  // en caso de cancelar la accion, se pregunta para no perder el progreso
  const handleOnClickCancel = useCallback(() => {
    if (modo !== "create" && modo !== "edit") return;
    setPending("cancel");
  }, [modo, setPending]);

  const isEditMode = modo === "edit" || modo === "create";
  return (
    <section className="flex flex-row items-center justify-between w-full h-15">
      <ConfirmModal
        isOpen={pending !== null}
        onClose={() => setPending(null)}
        onConfirm={handleModalConfirm}
        title={pending ? CONFIG[pending].getMsg() : undefined}
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
          <NavigationButtons
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
              onClick={() => onEditCreate("create")}
            >
              <ClipboardPlus width={"20px"} height={"20px"} />
              Nuevo
            </Button>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              onClick={() => onEditCreate("edit")}
            >
              <SquarePen width={"20px"} height={"20px"} />
              Editar
            </Button>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              variant="danger"
              onClick={handleOnClickDelete}
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
              onClick={handleOncLickConfirm}
            >
              <Check width={"20px"} height={"20px"} />
              Aceptar
            </Button>
            <Button
              className="flex flex-row items-center gap-1 w-30 h-10"
              variant="danger"
              onClick={handleOnClickCancel}
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
