import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type LogHeader,
  type Filtros,
  type LogHeaderRow,
} from "@/types/generalTypes";
import LogHeaderTable from "@/pages/Log/components/LogHeaderTable";
import LogReqRes from "./LogReqRes";
import useApi from "@/hooks/useApi";
import { Toaster, toast } from "sonner";
import InfoLog from "./InfoLog";
import FiltrosLog from "./FiltrosLog";
import { stampFromData, stampFromInput } from "../helpers/dateFunctions";

const initHeaderLog = {
  tce: 0,
  te: 0,
  tr: 0,
  l: [],
  u: "",
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
    dateFrom: "",
    dateTo: "",
    user: "all",
    funcion: "all",
    status: "all",
  });

  const [refresh, setRefresh] = useState(false);
  const call = useApi();

  // BUSCO TODAS LAS REQUEST
  useEffect(() => {
    setLoadingHeader(true);
    call<LogHeader>("LOGREST.HEADER", {})
      .then((res) => setHeaderLog(res))
      .catch(() => {
        setHeaderLog(initHeaderLog);
        return toast.error("Error al traer la lista de request");
      })
      .finally(() => setLoadingHeader(false));
  }, [call, refresh]);

  //BUSCO EL DETALLE DE LAS REQUEST SELECCIONADA
  useEffect(() => {
    if (!selectedRow) return;
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
          setFiltos((prev) => ({ ...prev, dateFrom: value }));
        }
        if (type === "DT") {
          setFiltos((prev) => ({ ...prev, dateTo: value }));
        }
        return;
      }
      if (event.target instanceof HTMLSelectElement) {
        const { value } = event.target;
        if (type === "US") {
          setFiltos((prev) => ({ ...prev, user: value }));
        }
        if (type === "FU") {
          setFiltos((prev) => ({ ...prev, funcion: value }));
        }
        if (type === "ST") {
          setFiltos((prev) => ({
            ...prev,
            status: value === "all" ? "all" : +value,
          }));
        }
      }
    },
    [],
  );

  const handleOnClickRefresh = () => {
    setRefresh((prev) => !prev);
  };
  //COMBOBOX
  const functionList = useMemo(() => {
    const res = new Set<string>();
    const { l } = headerLog;
    if (l.length === 0) return res;

    for (const record of l) {
      const { f } = record;
      res.add(f);
    }

    return res;
  }, [headerLog]);

  const usersList = useMemo(() => {
    const res = new Set<string>();
    const { l } = headerLog;
    if (l.length === 0) return res;

    for (const record of l) {
      const { u } = record;
      res.add(u === "" ? "Sin usuario" : u);
    }

    return res;
  }, [headerLog]);

  const statusList = useMemo(() => {
    const res = new Set<number>();
    const { l } = headerLog;
    if (l.length === 0) return res;

    for (const record of l) {
      const { s } = record;
      res.add(s);
    }
    return res;
  }, [headerLog]);

  //Filtro
  const logHeaderRow: LogHeaderRow[] = useMemo(
    () =>
      headerLog.l.filter((row) => {
        const { dateFrom, dateTo, funcion, status } = filtros;
        let { user } = filtros;
        const { d, f, s, t, u } = row;

        user = user === "Sin usuario" ? "" : user;

        const dateRow = stampFromData(d, t);
        const dFrom = stampFromInput(dateFrom);
        const dTo = stampFromInput(dateTo);

        if (dFrom && dateRow < dFrom) return false;
        if (dTo && dateRow > dTo) return false;
        if (funcion !== "all" && funcion !== f) return false;
        if (user !== "all" && user !== u) return false;
        if (status !== "all" && status !== s) return false;

        return true;
      }),
    [filtros, headerLog.l],
  );

  return (
    <div className="flex flex-col w-full h-full gap-2 p-2">
      <Toaster position="top-center" richColors />
      <div className="flex flex-col w-full h-20 shrink-0 items-center gap-1">
        <h1 className="text-3xl font-bold">Registro de comunicaciones</h1>
        <InfoLog
          total_request={headerLog.tr}
          total_errors={headerLog.te}
          total_critical_errors={headerLog.tce}
          handleOnClickRefresh={handleOnClickRefresh}
        />
      </div>
      <FiltrosLog
        functionList={functionList}
        usersList={usersList}
        statusList={statusList}
        filtrosVal={filtros}
        handleOnChangeFiltro={handleOnChangeFiltro}
      />
      <div className="flex flex-1 min-h-0 gap-2">
        <LogHeaderTable
          headList={logHeaderRow}
          loading={loadingHeader}
          handleOnSelectRow={handleOnSelectRow}
        />
        <LogReqRes json={reqtLog} type={"Request:"} loading={loadingReq} />
        <LogReqRes json={resLog} type={"Response:"} loading={loadingRes} />
      </div>
    </div>
  );
};

export default Log;
