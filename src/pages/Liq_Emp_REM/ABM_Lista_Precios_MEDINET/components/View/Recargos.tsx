import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const Recargos = ({ control }: Props) => {
  const v = useWatch({ control, name: "recargos" });

  return (
    <div className="flex flex-col min-h-0 h-[60%] items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Recargo por traslado</SectionTitle>
      </div>
      <Dato label="Auto nocturno:" value={v.reca} title="reca" />
      <Dato label="Ambulancia nocturno:" value={v.recc} title="recc" />
      <Dato label="Ambulancia con medico:" value={v.recm} title="recm" />
      <Dato label="UTIM nocturno:" value={v.recu} title="recu" />
      <Dato label="Unidad de neonatología:" value={v.recn} title="recn" />
    </div>
  );
};

export default Recargos;
