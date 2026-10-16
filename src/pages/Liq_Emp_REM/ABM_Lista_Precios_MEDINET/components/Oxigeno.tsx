import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const Oxigeno = ({ control }: Props) => {
  const v = useWatch({ control, name: "oxigeno" });

  return (
    <div className="flex-1 flex flex-col w-70 items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Oxígeno</SectionTitle>
      </div>
      <Dato label="Ambulancia:" value={v.oxic} title="oxic" />
      <Dato label="Médico:" value={v.oxim} title="oxim" />
      <Dato label="UTIM:" value={v.oxiu} title="oxiu" />
    </div>
  );
};

export default Oxigeno;
