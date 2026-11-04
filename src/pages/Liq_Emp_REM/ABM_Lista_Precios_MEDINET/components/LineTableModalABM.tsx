import { Modal } from "@/components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import {
  type TrasXKMRow,
  TrasXKMRowSchema,
  initTableForm,
} from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import { useCallback, useEffect } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  data?: TrasXKMRow;
  title?: string;
  onClose: () => void;
  onConfirm: (data: TrasXKMRow) => void;
};

const LineTableModalABM = ({
  isOpen,
  data,
  title,
  onClose,
  onConfirm,
}: Props) => {
  const { control, reset, handleSubmit } = useForm<TrasXKMRow>({
    defaultValues: initTableForm,
    resolver: zodResolver(TrasXKMRowSchema),
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(data ?? initTableForm);
  }, [isOpen, data, reset]);

  // EN CASO DE ERROR EN LA VALIDACION DE DATOS
  const handleOnFormErrors: SubmitErrorHandler<TrasXKMRow> = useCallback(
    (errors) => {
      const mensajes = Object.values(errors)
        .map((e) => e?.message)
        .filter(Boolean) as string[];

      if (mensajes.length === 0) return;

      toast.error("No se pudo guardar la fila", {
        description: (
          <ul className="list-disc pl-4">
            {mensajes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        ),
      });
    },
    [],
  );

  const handleOnCloseModal = useCallback(() => {
    reset(initTableForm);
    onClose();
  }, [onClose, reset]);

  return (
    <Modal isOpen={isOpen} onClose={handleOnCloseModal} className="w-[40vh]!">
      <form
        onSubmit={handleSubmit(onConfirm, handleOnFormErrors)}
        className="flex flex-col px-2 min-h-0 border border-vblue-0 rounded-lg overflow-hidden shadow-lg"
      >
        <div className="flex flex-col items-center justify-center text-clip w-full px-4 py-3 shrink-0">
          <SectionTitle>{title ?? "Ingrese los datos"}</SectionTitle>
        </div>
        <div className="flex flex-col py-1 w-full h-full border-b">
          <DatoField
            control={control}
            name="hasta"
            label="Hasta:"
            maxLength={10}
            title="Hasta"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
            labelClassName="text-lg"
            autoFocus
          />
        </div>
        <div className="flex flex-col py-1 w-full h-full justify-between border-b">
          <h3 className="text-lg font-bold">Auto</h3>
          <DatoField
            control={control}
            name="auto"
            label="Día:"
            maxLength={10}
            title="auto"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
          <DatoField
            control={control}
            name="auton"
            label="Noche:"
            maxLength={10}
            title="auton"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
        </div>
        <div className="flex flex-col w-full py-1 h-full justify-between border-b">
          <h3 className="text-lg font-bold">Ambulancia Comun</h3>
          <DatoField
            control={control}
            name="comun"
            label="Dia"
            maxLength={10}
            title="comun"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
          <DatoField
            control={control}
            name="comunn"
            label="Noche:"
            maxLength={10}
            title="comunn"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
        </div>
        <div className="flex flex-col w-full py-1 h-full justify-between border-b">
          <h3 className="text-lg font-bold">Ambulancia Médico</h3>
          <DatoField
            control={control}
            name="medico"
            label="Dia"
            maxLength={10}
            title="medico"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
          <DatoField
            control={control}
            name="medicon"
            label="Noche:"
            maxLength={10}
            title="medicon"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
        </div>
        <div className="flex flex-col w-full py-1 h-full justify-between border-b">
          <h3 className="text-lg font-bold">Ambulancia UTIM</h3>
          <DatoField
            control={control}
            name="utim"
            label="Dia"
            maxLength={10}
            title="utim"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
          <DatoField
            control={control}
            name="utimn"
            label="Noche:"
            maxLength={10}
            title="utimn"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
        </div>
        <div className="flex flex-col w-full py-1 h-full justify-between border-b">
          <h3 className="text-lg font-bold">Ambulancia Neonatología</h3>
          <DatoField
            control={control}
            name="unm"
            label="Dia"
            maxLength={10}
            title="unm"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
          <DatoField
            control={control}
            name="unmn"
            label="Noche:"
            maxLength={10}
            title="unmn"
            type="number"
            inputClassName="w-[40%]"
            readOnly={false}
          />
        </div>
        <div className="flex flex-row gap-4 px-4 py-3 shrink-0 justify-center">
          <Button
            className="flex flex-row items-center gap-1 w-30 h-10"
            variant="secondary"
            type="submit"
          >
            <Check width={"24px"} height={"24px"} />
            Aceptar
          </Button>
          <Button
            className="flex flex-row items-center gap-1 w-30 h-10"
            onClick={handleOnCloseModal}
            variant="danger"
          >
            <X width={"24px"} height={"24px"} />
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LineTableModalABM;
