import { SectionTitle } from "@/components/ui/Typography";
import { type Control } from "react-hook-form";
import { type ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const TrasladosView = ({ control }: Props) => {
  const { modo } = useModo();
  return (
    <div className="flex flex-col w-[30%] h-full items-start justify-between p-1 border rounded-lg shadow-lg overflow-auto">
      <div className="border-b w-full">
        <SectionTitle>Valor traslado (C.F.)</SectionTitle>
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">Auto</h3>
        <DatoField
          control={control}
          name="caa"
          label="Dia:"
          maxLength={7}
          title="caa"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          name="caan"
          label="Noche:"
          maxLength={7}
          title="caan"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col w-full py-1 h-full justify-between border-b">
        <h3 className="text-lg font-bold">Ambulancia</h3>
        <DatoField
          control={control}
          name="cac"
          label="Dia"
          maxLength={7}
          title="cac"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          name="cacn"
          label="Noche:"
          maxLength={7}
          title="cacn"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">Con médico</h3>
        <DatoField
          control={control}
          name="cam"
          label="Dia"
          maxLength={7}
          title="cam"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          name="camn"
          label="Noche:"
          maxLength={7}
          title="camn"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between border-b">
        <h3 className="text-lg font-bold">UTIM</h3>
        <DatoField
          control={control}
          name="cau"
          label="Dia:"
          maxLength={7}
          title="cau"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          name="caun"
          label="Noche:"
          maxLength={7}
          title="caun"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-col py-1 w-full h-full justify-between">
        <h3 className="text-lg font-bold">Neonatologia</h3>
        <DatoField
          control={control}
          name="can"
          label="Dia:"
          maxLength={7}
          title="can"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
        <DatoField
          control={control}
          name="cann"
          label="Noche:"
          maxLength={7}
          title="cann"
          type="number"
          inputClassName="w-[60%]"
          readOnly={modo === "view"}
        />
      </div>
    </div>
  );
};

export default TrasladosView;
