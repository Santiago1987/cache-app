import { type Control } from "react-hook-form";
import type { ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField, { SectionTitle } from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const ValXDistView = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-col w-[35%] h-full items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Valor excedente:</SectionTitle>
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">Auto</h3>
        <DatoField
          control={control}
          label="Valor:"
          maxLength={7}
          name="kma"
          title="kma"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          label="KM incluidos en el valor:"
          maxLength={4}
          name="mkma"
          title="mkma"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">Ambulancia</h3>
        <DatoField
          control={control}
          label="Valor:"
          maxLength={7}
          name="kmc"
          title="kmc"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          label="KM incluidos en el valor:"
          maxLength={4}
          name="mkmc"
          title="mkmc"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">Unidad con medico</h3>
        <DatoField
          control={control}
          label="Valor:"
          maxLength={7}
          name="kmm"
          title="kmm"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          label="KM incluidos en el valor:"
          maxLength={4}
          name="mkmm"
          title="mkmm"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">UTIM</h3>
        <DatoField
          control={control}
          label="Valor:"
          maxLength={7}
          name="kmu"
          title="kmu"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          label="KM incluidos en el valor:"
          maxLength={4}
          name="kmu"
          title="kmu"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between">
        <h3 className="text-lg font-bold">Neonatología</h3>
        <DatoField
          control={control}
          label="Valor:"
          maxLength={7}
          name="kmn"
          title="kmn"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          label="KM incluidos en el valor:"
          maxLength={4}
          name="mkmn"
          title="mkmn"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
    </div>
  );
};

export default ValXDistView;
