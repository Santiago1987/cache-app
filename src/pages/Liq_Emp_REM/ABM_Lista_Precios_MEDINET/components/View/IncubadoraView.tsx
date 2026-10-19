import { type Control, useWatch } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const IncubadoraView = ({ control }: Props) => {
  const v = useWatch({ control, name: "incubadora" });

  return (
    <div className="flex-1 flex flex-col items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Incubadora</SectionTitle>
      </div>
      <Dato label="Ambulancia:" value={v.incc} title="incc" />
      <Dato label="Médico:" value={v.incm} title="incm" />
      <Dato label="UTIM:" value={v.incu} title="incu" />
    </div>
  );
};

export default IncubadoraView;
