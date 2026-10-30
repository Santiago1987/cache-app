import { type Control } from "react-hook-form";
import type { ListPreRem } from "../types/schema";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const Recargos = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-col min-h-0 h-[60%] items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Recargo por traslado</SectionTitle>
      </div>
      <DatoField
        control={control}
        name="reca"
        label="Auto nocturno:"
        maxLength={9}
        title="reca"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="recc"
        label="Ambulancia nocturno:"
        maxLength={9}
        title="recc"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="recm"
        label="Ambulancia con medico:"
        maxLength={9}
        title="recm"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="recu"
        label="UTIM nocturno:"
        maxLength={9}
        title="recu"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
      <DatoField
        control={control}
        name="recn"
        label="Unidad de neonatología:"
        maxLength={9}
        title="recn"
        type="number"
        inputClassName="w-[60%]"
        readOnly={modo === "view"}
      />
    </div>
  );
};

export default Recargos;
