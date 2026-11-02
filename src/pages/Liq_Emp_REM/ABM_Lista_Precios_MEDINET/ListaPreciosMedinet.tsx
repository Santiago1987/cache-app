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
import { useCallback, useEffect, useRef, useState } from "react";
import useApi from "@/hooks/useApi";
import { Toaster, toast } from "sonner";
import { BlocksWaveSpinner } from "@/components/icons/Loading";
import Footer from "./components/Footer";
import type { Column, Direction, Move, MoveState } from "@/types/generalTypes";
import { SearchSelectModal } from "@/components/ui/SearchSelectModal";

type Data = Omit<ListPreRem, "trasladosXKm"> & {
  isPrev: boolean;
  isNext: boolean;
};
type DataTable = TrasXKMRow[] | "nodata";
type CodigoList = { c: string; d: string };

const ListaPreciosMedinet = () => {
  const { control, reset } = useForm<ListPreRem>({
    resolver: zodResolver(ListPreRemSchema),
    defaultValues: initForm,
  });
  const [codigoList, setCodigoList] = useState<CodigoList[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  //const [searchCod, setSearchCod] = useState(null);
  const [move, setMove] = useState<Move>({ go: false, direction: null });
  const [moveState, setMoveState] = useState<MoveState>({
    isPrev: false,
    isNext: false,
  });

  const precCod = useRef<string | null>(null);

  const call = useApi();

  const getData = useCallback(
    async (move: Move) => {
      try {
        setLoading(true);
        const { direction } = move;
        const resData = await call<Data>("LISPREREM.GETDATA", {
          id: precCod.current ?? "",
          move: direction ? direction : "",
        });

        const { codigo } = resData;
        const resTable = await call<DataTable>("LISPREREM.GETDATATABLE", {
          id: codigo,
        });

        const { isNext, isPrev, ...data } = resData;
        precCod.current = codigo;

        reset({
          ...data,
          trasladosXKm: resTable === "nodata" ? [] : resTable,
        });
        setMoveState({ isNext, isPrev });
      } catch (err) {
        reset(undefined);
        precCod.current = null;
        toast.error("" + err);
      } finally {
        setLoading(false);
      }
    },
    [call, reset],
  );

  const getCodigoList = useCallback(() => {
    call<CodigoList[]>("LISPREREM.GETLISTA", {})
      .then((res) => setCodigoList(res))
      .catch((err) => toast.error("" + err));
  }, [call]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData(move); //obtengo la infomacion completa para el form
    getCodigoList(); //obtengo la lista de codigos para el search
  }, [move, getData, getCodigoList]);

  const handleOnChangeMove = useCallback((d: Direction) => {
    setMove((prev) => ({ go: !prev.go, direction: d }));
  }, []);

  //============================ MODAL =======================================
  const handleOnOpenSearch = useCallback(() => {
    setSearchModalOpen(true);
  }, []);

  const handleOnCloseSearch = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  const handleOnSelectSearch = useCallback((selected: CodigoList) => {
    if (!selected) return;
    precCod.current = selected.c;
    setMove((prev) => ({ go: !prev.go, direction: null }));
  }, []);

  const columns: Column<CodigoList>[] = [
    {
      header: "Código",
      colSpan: 4,
      cell: (r) => r.c,
      cellClassName: () => "font-bold",
    },
    {
      header: "Descripción",
      colSpan: 8,
      cell: (r) => r.d,
      cellClassName: () => "text-left",
    },
  ];

  return (
    <ModoProvider>
      <SearchSelectModal
        isOpen={searchModalOpen}
        onClose={handleOnCloseSearch}
        data={codigoList}
        columns={columns}
        getRowId={(r) => r.c}
        searchKeys={["c", "d"]}
        onSelect={handleOnSelectSearch}
        title="Buscar Listado de Tarifas"
      />
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
        <form className="flex-1 flex flex-col gap-1 border-b border-vblue-0 pb-1">
          <HeaderView control={control} />
          <div className="flex flex-row gap-1 h-full w-full">
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
              <div className="relative flex flex-col min-h-100 h-full w-full border border-vblue-0 rounded-lg overflow-hidden">
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
        <Footer
          estado={moveState}
          handleOnChangeMove={handleOnChangeMove}
          handleOnOpenSearch={handleOnOpenSearch}
        />
      </div>
    </ModoProvider>
  );
};

export default ListaPreciosMedinet;
