import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const VisitasCapitalView = ({ control }: Props) => {
  const v = useWatch({ control, name: "visitasCapital" });

  return (
    <div className="flex flex-col w-110 items-center justify-center p-1 border rounded-lg shadow-lg">
      <SectionTitle>Visitas Capital</SectionTitle>
      <div className="flex flex-row w-full items-center gap-1 p-1">
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Dia</h3>
          <Dato label="Clíninica:" value={v.vicacdi} title="vicacdi" />
          <Dato label="Pediatría:" value={v.vicapdi} title="vicapdi" />
          <Dato label="Cardiología:" value={v.vicardi} title="vicardi" />
        </div>
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Noche</h3>
          <Dato label="Clíninica:" value={v.vicacno} title="vicacno" />
          <Dato label="Pediatría:" value={v.vicapno} title="vicapno" />
          <Dato label="Cardiología:" value={v.vicario} title="vicario" />
        </div>
      </div>
    </div>
  );
};

export default VisitasCapitalView;
