import { useCallback, useEffect, useState } from "react";
import {
  type LogHeader,
  type Filtros,
  type LogHeaderRow,
  type LogFiltersResponse,
} from "@/types/generalTypes";
import LogHeaderTable from "@/pages/Log/components/LogHeaderTable";
import LogReqRes from "./LogReqRes";
import useApi from "@/hooks/useApi";
import { Toaster, toast } from "sonner";
import InfoLog from "./InfoLog";
import FiltrosLog from "./FiltrosLog";
import { PageTitle } from "@/components/ui/Typography";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const initHeaderLog = {
  tce: 0,
  te: 0,
  tr: 0,
  l: [],
  cursor: null,
};

const initFiltrosCB = {
  fun: [],
  st: [],
  us: [],
};

const Log = () => {
  const [headerLog, setHeaderLog] = useState<LogHeader>(initHeaderLog);

  const [reqtLog, setReqLog] = useState<object | null>(null);
  const [resLog, setResLog] = useState<object | null>(null);

  const [loadingHeader, setLoadingHeader] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingRes, setLoadingRes] = useState(false);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const [filtros, setFiltos] = useState<Filtros>({
    df: "",
    dt: "",
    us: "all",
    fun: "all",
    st: "all",
  });

  const [filstrosCB, setFiltrosCB] =
    useState<LogFiltersResponse>(initFiltrosCB);
  const call = useApi();
  const { rows, loading, hasMore, loadMore, reset } = useInfiniteScroll<
    LogHeaderRow,
    LogHeader
  >("LOGREST.HEADER", { filtros }, (res) => ({
    rows: res.l,
    cursor: res.cursor,
  }));

  // inexistente para que el back devuelva solo los totales, sin filas.
  const fetchStats = useCallback(() => {
    setLoadingHeader(true);
    call<LogHeader>("LOGREST.HEADER", { fun: "inexistente" })
      .then((res) => {
        const { tr, tce, te } = res;
        setHeaderLog((prev) => ({ ...prev, tr, tce, te }));
      })
      .catch(() => {
        setHeaderLog(initHeaderLog);
        toast.error("Error al traer las estadisticas");
      })
      .finally(() => setLoadingHeader(false));
  }, [call]);

  //trae los datos para llenar los CB de los filtros
  const fetchFilstrosCB = useCallback(() => {
    call<LogFiltersResponse>("LOGREST.FILTROS", {})
      .then((res) => setFiltrosCB(res))
      .catch(() => {
        setFiltrosCB(initFiltrosCB);
        toast.error("Error al traer los filtros");
      });
  }, [call]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
    fetchFilstrosCB();
  }, [fetchStats, fetchFilstrosCB]);

  //BUSCO EL DETALLE DE LAS REQUEST SELECCIONADA
  useEffect(() => {
    if (!selectedRow) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingReq(true);
    setLoadingRes(true);

    call<object>("LOGREST.REQUEST", { id: selectedRow })
      .then((res) => setReqLog(res))
      .catch(() => {
        setReqLog({});
        return toast.error("Error al traer la request");
      })
      .finally(() => setLoadingReq(false));

    call<object>("LOGREST.RESPONSE", { id: selectedRow })
      .then((res) => setResLog(res))
      .catch(() => {
        setResLog({});
        return toast.error("Error al traer la response");
      })
      .finally(() => setLoadingRes(false));
  }, [call, selectedRow]);

  //FUNCIONES
  const handleOnSelectRow = useCallback((id: number) => {
    setSelectedRow(id);
  }, []);

  const handleOnChangeFiltro = useCallback(
    (
      type: string,
      event:
        | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
        | React.SyntheticEvent<HTMLSelectElement, Event>,
    ) => {
      event.preventDefault();

      if (event.target instanceof HTMLInputElement) {
        const { value } = event.target;
        if (type === "DF") {
          setFiltos((prev) => ({ ...prev, df: value }));
        }
        if (type === "DT") {
          setFiltos((prev) => ({ ...prev, dt: value }));
        }
        return;
      }
      if (event.target instanceof HTMLSelectElement) {
        const { value } = event.target;
        if (type === "US") {
          setFiltos((prev) => ({ ...prev, us: value }));
        }
        if (type === "FU") {
          setFiltos((prev) => ({ ...prev, fun: value }));
        }
        if (type === "ST") {
          setFiltos((prev) => ({
            ...prev,
            st: value === "all" ? "all" : +value,
          }));
        }
      }
    },
    [],
  );

  const handleOnClickRefresh = () => {
    // mismos filtros: recargo lista desde la pag. 1 + refresco estadisticas
    reset();
    void loadMore();
    fetchStats();
  };

  const handleOnClickReset = () => {
    // al cambiar los filtros, el hook resetea y recarga solo (efecto de paramsKey)
    setFiltos({
      df: "",
      dt: "",
      us: "all",
      fun: "all",
      st: "all",
    });
  };

  return (
    <div className="flex flex-col w-full h-full gap-2 p-2">
      <Toaster position="top-center" richColors />
      <div className="flex items-center justify-center">
        <PageTitle>Registro de comunicaciones</PageTitle>
      </div>
      <FiltrosLog
        filtrosCB={filstrosCB}
        filtrosVal={filtros}
        handleOnChangeFiltro={handleOnChangeFiltro}
        handleOnClickReset={handleOnClickReset}
      />
      <InfoLog
        total_request={headerLog.tr}
        total_errors={headerLog.te}
        total_critical_errors={headerLog.tce}
        handleOnClickRefresh={handleOnClickRefresh}
      />
      <div className="flex flex-1 min-h-0 gap-2">
        <LogHeaderTable
          headList={rows}
          loading={loadingHeader}
          handleOnSelectRow={handleOnSelectRow}
          selectedRow={selectedRow}
          loadMore={loadMore}
          hasMore={hasMore}
          loadingMoreRows={loading}
        />
        <LogReqRes json={reqtLog} type={"Request:"} loading={loadingReq} />
        <LogReqRes json={resLog} type={"Response:"} loading={loadingRes} />
      </div>
    </div>
  );
};

export default Log;
