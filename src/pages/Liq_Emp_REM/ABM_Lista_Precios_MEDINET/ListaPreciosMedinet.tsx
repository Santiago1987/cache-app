import { PageTitle } from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TrasladosView from "./components/View/TrasladosView";
import { ListPreRemSchema, type ListPreRem, initForm } from "./types/schema";
import HeaderView from "./components/View/HeaderView";
import ValXDistView from "./components/View/ValXDistView";
import Recargos from "./components/View/Recargos";
import VisitasCapitalView from "./components/View/VisitasCapitalView";
import VisitasProvinciaView from "./components/View/VisitasProvinciaView";
import VisitasProvinciaPlusView from "./components/View/VisitasProvinciaPlusView";
import Espera from "./components/View/Espera";
import ValorXDistanciaTable from "./components/View/ValorXDistanciaTable";
import RecargosExtra from "./components/View/RecargosExtra";

type Modo = "view" | "edit" | "create";

const ListaPreciosMedinet = () => {
  const { control } = useForm<ListPreRem>({
    resolver: zodResolver(ListPreRemSchema),
    defaultValues: initForm,
  });

  const [modo, setModo] = useState<Modo>("view");

  return (
    <div className="flex flex-col w-full h-full gap-1 p-1">
      <div className="mx-auto">
        <PageTitle>ABM De Listados De Tarifas - MEDINET</PageTitle>
      </div>
      <form className="flex flex-col gap-1">
        <HeaderView control={control} />
        <div className="flex flex-row gap-1">
          <div className="flex flex-col gap-1 w-[40%]">
            <section className="flex flex-row h-[60vh] max-h-120 min-h-80 gap-1">
              <TrasladosView control={control} />
              <ValXDistView control={control} />
              <div className="flex flex-col h-full w-1/3 gap-1">
                <Recargos control={control} />
                <RecargosExtra control={control} />
              </div>
            </section>
            <section className="flex flex-col gap-1">
              <div className="flex flex-row gap-1">
                <VisitasCapitalView control={control} />
                <VisitasProvinciaView control={control} />
              </div>
              <div className="flex flex-row gap-1">
                <VisitasProvinciaPlusView control={control} />
              </div>
            </section>
          </div>
          <section className="flex flex-col gap-2 w-[60%] h-full">
            <Espera control={control} />
            <div className="relative flex flex-col h-[60vh] max-h-120 min-h-80 w-full border border-vblue-0 rounded-lg overflow-hidden">
              <ValorXDistanciaTable control={control} />
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default ListaPreciosMedinet;
