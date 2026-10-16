import { useWatch, type Control } from "react-hook-form";
import type { ListPreRem } from "../types/schema";
import { Dato, SectionTitle } from "@/components/ui/Typography";

type Props = {
  control: Control<ListPreRem>;
};

const Header = ({ control }: Props) => {
  const v = useWatch({ control });

  return (
    <div className="flex flex-row items-center justify-between w-full p-1 border rounded-lg shadow-lg">
      <div className="flex flex-row w-50 gap-1 items-center">
        <SectionTitle>Código:</SectionTitle>
        <span className="text-2xl font-bold w-1/2">{v.codidgo}</span>
      </div>
      <Dato label="Descripción:" value={v.descr} title="descr" />
      <Dato label="Vigencia:" value={v.vigencia} title="vigencia" />
    </div>
  );
};

export default Header;
