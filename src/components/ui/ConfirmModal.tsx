import { Info, TriangleAlert, CircleAlert } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import type { MessageType } from "@/types/generalTypes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  messageType?: MessageType;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  messageType = "info",
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-row min-h-0 border border-vblue-0 rounded-lg overflow-hidden shadow-lg">
        <div className="flex w-[20%]">
          {messageType === "info" && (
            <Info
              width="100%"
              height="100%"
              className="text-white"
              fill="#3b82f6"
              stroke="#ffffff"
            />
          )}
          {messageType === "warning" && (
            <TriangleAlert
              width="100%"
              height="100%"
              className="text-white"
              fill="#F8F363"
              stroke="#000000"
            />
          )}
          {messageType === "danger" && (
            <CircleAlert
              width="100%"
              height="100%"
              stroke="#ffffff"
              fill="#EF4444"
            />
          )}
        </div>
        <div className="flex flex-col justify-between w-[80%]">
          <div className="flex flex-col items-center justify-center text-clip w-full px-4 py-3 shrink-0">
            <h2 className="text-3xl font-bold">{title ?? "¿Esta seguro?"}</h2>
          </div>
          <div className="flex flex-row gap-4 px-4 py-3 shrink-0 justify-center">
            <Button
              className="flex flex-row text-2xl items-center justify-center gap-1 w-[50%] h-12"
              onClick={onConfirm}
              variant="secondary"
            >
              Aceptar
            </Button>
            <Button
              className="flex flex-row text-2xl items-center justify-center gap-1 w-[50%] h-12"
              onClick={onClose}
              variant="danger"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
