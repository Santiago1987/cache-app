import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const VisitasProvinciaPlusView = ({ control }: Props) => {
  const v = useWatch({ control, name: "visitasProvinciaPlus" });

  return (
    <div className="flex flex-col w-110 items-center justify-center p-1 border rounded-lg shadow-lg">
      <SectionTitle>Visitas provincia (+)</SectionTitle>
      <div className="flex flex-row w-full items-center gap-1 p-1">
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Dia</h3>
          <Dato label="Clíninica:" value={v.vipmcdi} title="vipmcdi" />
          <Dato label="Pediatría:" value={v.vipmpdi} title="vipmpdi" />
          <Dato label="Cardiología:" value={v.vipmrdi} title="vipmrdi" />
        </div>
        <div className="flex flex-col w-full items-start justify-between p-1 border rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Noche</h3>
          <Dato label="Clíninica:" value={v.vipmcno} title="vipmcno" />
          <Dato label="Pediatría:" value={v.vipmpno} title="vipmpno" />
          <Dato label="Cardiología:" value={v.vipmrno} title="vipmrno" />
        </div>
      </div>
    </div>
  );
};

export default VisitasProvinciaPlusView;
