import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const VisitasProvincia = ({ control }: Props) => {
  const v = useWatch({ control, name: "visitasProvincia" });

  return (
    <div className="flex flex-col w-110 items-center justify-center p-1 border rounded-lg shadow-lg">
      <SectionTitle>Visitas provincia</SectionTitle>
      <div className="flex flex-row w-full items-center gap-1 p-1">
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Dia</h3>
          <Dato label="Clíninica:" value={v.viprcdi} title="viprcdi" />
          <Dato label="Pediatría:" value={v.viprpdi} title="viprpdi" />
          <Dato label="Cardiología:" value={v.viprrdi} title="viprrdi" />
        </div>
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Noche</h3>
          <Dato label="Clíninica:" value={v.viprcno} title="vicacno" />
          <Dato label="Pediatría:" value={v.viprpno} title="vicapno" />
          <Dato label="Cardiología:" value={v.viprrno} title="vicario" />
        </div>
      </div>
    </div>
  );
};

export default VisitasProvincia;
