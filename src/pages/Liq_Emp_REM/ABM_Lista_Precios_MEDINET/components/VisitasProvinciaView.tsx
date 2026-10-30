import { type Control } from "react-hook-form";
import type { ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const InputStyles = "w-[50%]";

const VisitasProvinciaView = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-col w-110 items-center justify-center p-1 border rounded-lg shadow-lg">
      <SectionTitle>Visitas provincia</SectionTitle>
      <div className="flex flex-row w-full items-center gap-1 p-1">
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Dia</h3>
          <DatoField
            control={control}
            name="viprcdi"
            label="Clíninica:"
            maxLength={10}
            title="viprcdi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="viprpdi"
            label="Pediatría:"
            maxLength={10}
            title="viprpdi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="viprrdi"
            label="Cardiología:"
            maxLength={10}
            title="viprrdi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
        </div>
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Noche</h3>
          <DatoField
            control={control}
            name="viprcno"
            label="Clíninica:"
            maxLength={10}
            title="viprcno"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="viprpno"
            label="Pediatría:"
            maxLength={10}
            title="viprpno"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="viprrno"
            label="Cardiología:"
            maxLength={10}
            title="viprrno"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitasProvinciaView;
