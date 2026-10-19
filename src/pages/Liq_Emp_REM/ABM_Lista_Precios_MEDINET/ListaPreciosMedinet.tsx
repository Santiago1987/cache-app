import { PageTitle } from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TrasladosView from "./components/View/TrasladosView";
import { ListPreRemSchema, type ListPreRem, initForm } from "./types/schema";
import HeaderView from "./components/View/HeaderView";
import ValXDistView from "./components/View/ValXDistView";
import RecargosView from "./components/View/RecargosView";
import OxigenoView from "./components/View/OxigenoView";
import IncubadoraView from "./components/View/IncubadoraView";
import VisitasCapitalView from "./components/View/VisitasCapitalView";
import VisitasProvinciaView from "./components/View/VisitasProvinciaView";
import VisitasProvinciaPlusView from "./components/View/VisitasProvinciaPlusView";

type Modo = "view" | "edit" | "create";

const ListaPreciosMedinet = () => {
  const { control } = useForm<ListPreRem>({
    resolver: zodResolver(ListPreRemSchema),
    defaultValues: initForm,
  });

  const [modo, setModo] = useState<Modo>("view");

  return (
    <div className="flex flex-col w-full h-full gap-2 p-1">
      <div className="mx-auto">
        <PageTitle>ABM De Listados De Tarifas - MEDINET</PageTitle>
      </div>
      <form className="flex flex-col gap-2">
        <HeaderView control={control} />
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <section className="flex flex-row h-130 gap-2">
              <TrasladosView control={control} />
              <ValXDistView control={control} />
              <div className="flex flex-col h-full w-1/3 gap-2">
                <RecargosView control={control} />
                <OxigenoView control={control} />
                <IncubadoraView control={control} />
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <VisitasCapitalView control={control} />
                <VisitasProvinciaView control={control} />
              </div>
              <div className="flex flex-row gap-2">
                <VisitasProvinciaPlusView control={control} />
              </div>
            </section>
          </div>
          <section className="flex flex-col gap-2 w-1/2 h-full border border-black"></section>
        </div>
      </form>
    </div>
  );
};

export default ListaPreciosMedinet;
