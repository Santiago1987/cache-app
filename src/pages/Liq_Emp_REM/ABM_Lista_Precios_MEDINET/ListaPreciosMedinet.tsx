import { PageTitle } from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TrasladosView from "./components/TrasladosView";
import {
  ListPreRemSchema,
  type ListPreRem,
  type TrasXKMRow,
  initForm,
} from "./types/schema";
import HeaderView from "./components/HeaderView";
import ValXDistView from "./components/ValXDistView";
import Recargos from "./components/Recargos";
import VisitasCapitalView from "./components/VisitasCapitalView";
import VisitasProvinciaView from "./components/VisitasProvinciaView";
import VisitasProvinciaPlusView from "./components/VisitasProvinciaPlusView";
import Espera from "./components/Espera";
import ValorXDistanciaTable from "./components/ValorXDistanciaTable";
import RecargosExtra from "./components/RecargosExtra";
import ModoProvider from "./context/ModoContext";
import ModoToolbar from "./components/ModoToolbar";
import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Toaster, toast } from "sonner";
import { BlocksWaveSpinner } from "@/components/icons/Loading";

type Data = Omit<ListPreRem, "trasladosXKm">;
type DataTable = TrasXKMRow[];

const ListaPreciosMedinet = () => {
  const { control, reset } = useForm<ListPreRem>({
    resolver: zodResolver(ListPreRemSchema),
    defaultValues: initForm,
  });
  const [loading, setLoading] = useState(false);
  const [searchCod, setSearchCod] = useState(null);

  const call = useApi();

  const getData = useCallback(
    async (id: string | null) => {
      try {
        setLoading(true);
        const resData = await call<Data>("LISPREREM.GETDATA", {
          id: id ?? "",
        });

        const { codigo } = resData;
        const resTable = await call<DataTable>("LISPREREM.GETDATATABLE", {
          id: codigo,
        });

        reset({ ...resData, trasladosXKm: resTable });
      } catch {
        reset(undefined);
        toast.error("Error al traer la infomacion de la base de datos");
      } finally {
        setLoading(false);
      }
    },
    [call, reset],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData(searchCod);
  }, [searchCod, getData]);

  return (
    <ModoProvider>
      <div className="flex flex-col w-full h-full gap-1 p-1">
        <Toaster position="top-center" richColors />
        {loading ? (
          <div className="absolute w-full h-full z-10 inset-0 flex items-center justify-center bg-black/50">
            <BlocksWaveSpinner
              width={80}
              height={80}
              speed={0.75}
              stroke="#59d6c6"
              fill="#59d6c6"
            />
          </div>
        ) : null}
        <div className="flex flex-row justify-between">
          <PageTitle>ABM De Listados De Tarifas - MEDINET</PageTitle>
          <ModoToolbar />
        </div>
        <form className="flex-1 flex flex-col gap-1">
          <HeaderView control={control} />
          <div className="flex flex-row gap-1 h-[65%] w-full">
            <section className="flex flex-row min-h-120 h-full gap-1 w-[40%]">
              <TrasladosView control={control} />
              <ValXDistView control={control} />
              <div className="flex flex-col h-full w-[35%] gap-1">
                <Recargos control={control} />
                <RecargosExtra control={control} />
              </div>
            </section>
            <section className="flex flex-col gap-2 w-[60%] h-full">
              <Espera control={control} />
              <div className="relative flex flex-col max-h-120 h-full w-full border border-vblue-0 rounded-lg overflow-hidden">
                <ValorXDistanciaTable control={control} />
              </div>
            </section>
          </div>
          <section className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <VisitasCapitalView control={control} />
              <VisitasProvinciaView control={control} />
              <VisitasProvinciaPlusView control={control} />
            </div>
          </section>
        </form>
      </div>
    </ModoProvider>
  );
};

export default ListaPreciosMedinet;
