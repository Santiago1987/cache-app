import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const RecargosExtra = ({ control }: Props) => {
  const v = useWatch({ control, name: "recargosExtra" });

  return (
    <div className="flex flex-col min-h-0 h-[40%] items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Recargo extras</SectionTitle>
      </div>
      <Dato label="Auto nocturno:" value={v.frac} title="reca" />
      <Dato label="Ambulancia nocturno:" value={v.vta} title="recc" />
      <Dato label="Ambulancia con medico:" value={v.reces} title="recm" />
    </div>
  );
};

export default RecargosExtra;
