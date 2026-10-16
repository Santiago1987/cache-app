import { Dato, SectionTitle } from "@/components/ui/Typography";
import { useWatch, type Control } from "react-hook-form";
import { type ListPreRem } from "../types/schema";

type Props = {
  control: Control<ListPreRem>;
};

const Traslados = ({ control }: Props) => {
  const v = useWatch({ control, name: "traslados" });
  return (
    <div className="flex flex-col items-start justify-between w-70 p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Valor del traslado (C.F.)</SectionTitle>
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Auto</h3>
        <Dato label="Dia:" value={v.caa} title="caa" />
        <Dato label="Noche:" value={v.caan} title="caan" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Ambulancia</h3>
        <Dato label="Dia" value={v.cac} title="cac" />
        <Dato label="Noche:" value={v.cacn} title="cacn" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Con médico</h3>
        <Dato label="Dia" value={v.cam} title="cam" />
        <Dato label="Noche:" value={v.camn} title="camn" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">UTIM</h3>
        <Dato label="Dia:" value={v.cau} title="cau" />
        <Dato label="Noche:" value={v.caun} title="caun" />
      </div>
      <div className="w-full">
        <h3 className="text-lg font-bold">Neonatologia</h3>
        <Dato label="Dia:" value={v.can} title="can" />
        <Dato label="Noche:" value={v.cann} title="cann" />
      </div>
    </div>
  );
};

export default Traslados;
