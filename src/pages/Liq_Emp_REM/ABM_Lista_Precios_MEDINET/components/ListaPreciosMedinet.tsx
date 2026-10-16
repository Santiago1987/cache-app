import { PageTitle } from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Traslados from "./Traslados";
import { ListPreRemSchema, type ListPreRem, initForm } from "../types/schema";
import Header from "./Header";
import ValXDist from "./ValXDist";
import Recargos from "./Recargos";
import Oxigeno from "./Oxigeno";
import Incubadora from "./Incubadora";
import VisitalCapital from "./VisitasCapital";
import VisitasProvincia from "./VisitasProvincia";
import VisitasProvinciaPlus from "./VisitasProvinciaPlus";

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
      <form className="flex flex-col gap-2">
        <Header control={control} />
        <section className="flex flex-row h-130 gap-1">
          <Traslados control={control} />
          <ValXDist control={control} />
          <div className="flex flex-col h-full gap-1">
            <Recargos control={control} />
            <Oxigeno control={control} />
            <Incubadora control={control} />
          </div>
        </section>
        <section className="flex flex-row gap-1">
          <VisitalCapital control={control} />
          <VisitasProvincia control={control} />
          <VisitasProvinciaPlus control={control} />
        </section>
      </form>
    </div>
  );
};

export default ListaPreciosMedinet;
