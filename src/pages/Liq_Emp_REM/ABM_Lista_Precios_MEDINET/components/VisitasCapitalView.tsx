import { type Control } from "react-hook-form";
import type { ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const InputStyles = "w-[50%]";

const VisitasCapitalView = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-col w-110 items-center justify-center p-1 border rounded-lg shadow-lg">
      <SectionTitle>Visitas Capital</SectionTitle>
      <div className="flex flex-row w-full items-center gap-1 p-1">
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Dia</h3>
          <DatoField
            control={control}
            name="vicacdi"
            label="Clíninica:"
            maxLength={10}
            title="vicacdi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="vicapdi"
            label="Pediatría:"
            maxLength={10}
            title="vicapdi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="vicardi"
            label="Cardiología:"
            maxLength={10}
            title="vicardi"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
        </div>
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Noche</h3>
          <DatoField
            control={control}
            name="vicacno"
            label="Clíninica:"
            maxLength={10}
            title="vicacno"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="vicapno"
            label="Pediatría:"
            maxLength={10}
            title="vicapno"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
          <DatoField
            control={control}
            name="vicario"
            label="Cardiología:"
            maxLength={10}
            title="vicario"
            type="number"
            inputClassName={InputStyles}
            readOnly={modo === "view"}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitasCapitalView;
