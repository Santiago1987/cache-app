import { type Control, useWatch } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const ValXDistView = ({ control }: Props) => {
  const v = useWatch({ control, name: "valxdist" });

  return (
    <div className="flex flex-col w-1/3 items-start justify-between p-1 border rounded-lg shadow-lg">
      <div className="border-b w-full">
        <SectionTitle>Valor excedente:</SectionTitle>
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Auto</h3>
        <Dato label="Valor:" value={v.kma} title="kma" />
        <Dato label="KM incluidos en el valor:" value={v.mkma} title="mkma" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Ambulancia</h3>
        <Dato label="Valor:" value={v.kmc} title="kmc" />
        <Dato label="KM incluidos en el valor:" value={v.mkmc} title="mkmc" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">Unidad con medico</h3>
        <Dato label="Valor:" value={v.kmm} title="kmm" />
        <Dato label="KM incluidos en el valor:" value={v.mkmm} title="mkmm" />
      </div>
      <div className="border-b w-full">
        <h3 className="text-lg font-bold">UTIM</h3>
        <Dato label="Valor:" value={v.kmu} title="kmu" />
        <Dato label="KM incluidos en el valor:" value={v.mkmu} title="mkmu" />
      </div>
      <div className="w-full">
        <h3 className="text-lg font-bold">Neonatología</h3>
        <Dato label="Valor:" value={v.kmn} title="kmn" />
        <Dato label="KM incluidos en el valor:" value={v.mkmn} title="mkmn" />
      </div>
    </div>
  );
};

export default ValXDistView;
