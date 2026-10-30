import { type Control } from "react-hook-form";
import type { ListPreRem } from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import DatoField from "@/components/ui/Typography";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

const HeaderView = ({ control }: Props) => {
  const { modo } = useModo();

  return (
    <div className="flex flex-row items-center justify-between w-full p-1 border rounded-lg shadow-lg">
      <div className="flex flex-row w-50 gap-1 items-center">
        <DatoField
          control={control}
          name="codigo"
          label="Código:"
          maxLength={6}
          title="codigo"
          type="text"
          inputClassName="w-[95%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-row w-100 gap-1 items-center">
        <DatoField
          control={control}
          name="desc"
          label="Descripción:"
          maxLength={30}
          title="descr"
          type="text"
          inputClassName="w-[95%]"
          readOnly={modo === "view"}
        />
      </div>
      <div className="flex flex-row w-100 gap-1 items-center">
        <DatoField
          control={control}
          name="vigencia"
          label="Vigencia:"
          maxLength={9}
          title="vigencia"
          type="text"
          inputClassName="w-[95%]"
          readOnly={modo === "view"}
        />
      </div>
    </div>
  );
};

export default HeaderView;
