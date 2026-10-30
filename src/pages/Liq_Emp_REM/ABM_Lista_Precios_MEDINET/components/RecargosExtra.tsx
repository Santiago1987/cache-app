import { type Control } from "react-hook-form";
import type { ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const RecargosExtra = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-col min-h-0 h-[40%] items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Recargo extras</SectionTitle>
      </div>
      <DatoField
        control={control}
        name="frac"
        label="Auto nocturno:"
        maxLength={2}
        title="frac"
        type="number"
        inputClassName="w-[40%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="vta"
        label="Ambulancia nocturno:"
        maxLength={6}
        title="vta"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="reces"
        label="Ambulancia con medico:"
        maxLength={6}
        title="reces"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
    </div>
  );
};

export default RecargosExtra;
