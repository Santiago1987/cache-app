import { useCallback, useEffect, useState } from "react";
import { type LogHeader, type CacheRequest } from "@/types/generalTypes";
import LogHeaderTable from "./LogHeaderTable";
import LogReqRes from "./LogReqRes";
import useApi from "@/hooks/useApi";
import { Toaster, toast } from "sonner";
import InfoLog from "./InfoLog";
import FiltrosLog from "./FiltrosLog";

const initHeaderLog = {
  tce: 0,
  te: 0,
  tr: 0,
  l: [],
  u: "",
};

const headLog = {
  l: [
    {
      d: "10/08/2026",
      f: "GETAPRUBROS",
      i: 6785140077.1,
      s: 200,
      t: "11:07:57",
      u: "pepito",
    },
    {
      d: "10/08/2026",
      f: "GETTOPES",
      i: 6785140077,
      s: 200,
      t: "11:07:57",
      u: "",
    },
  ],
  tce: 0,
  te: 0,
  tr: 2,
};

const Log = () => {
  const [headerLog, setHeaderLog] = useState<LogHeader>(initHeaderLog);

  const [reqtLog, setReqLog] = useState<object | null>(null);
  const [resLog, setResLog] = useState<object | null>(null);

  const [loadingHeader, setLoadingHeader] = useState(false);
  const [loadingReq, setLoadingReq] = useState(false);
  const [loadingRes, setLoadingRes] = useState(false);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const functionList = new Set<string>();
  const usersList = new Set<string>();
  const statusList = new Set<number>();

  const call = useApi();

  // BUSCO TODAS LAS REQUEST
  useEffect(() => {
    setLoadingHeader(true);
    call<LogHeader>("LOGREST.HEADER", {})
      .then((res) => {
        setHeaderLog(res);
        const { l } = res;
        for (const record of l) {
          const { f, u, s } = record;
          functionList.add(f);
          usersList.add(u);
          statusList.add(s);
        }
      })
      .catch((ex) => toast("Error al traer la lista de request"))
      .finally(() => setLoadingHeader(false));

    setReqLog(req);
    setResLog(res);
  }, [call]);

  //BUSCO EL DETALLE DE LAS REQUEST SELECCIONADA
  useEffect(() => {
    if (!selectedRow) return;
    setLoadingReq(true);
    setLoadingRes(true);

    call<object>("LOGREST.REQUEST", { id: selectedRow })
      .then((res) => setReqLog(res))
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex))
      .finally(() => setLoadingReq(false));

    call<object>("LOGREST.RESPONSE", { id: selectedRow })
      .then((res) => setResLog(res))
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex))
      .finally(() => setLoadingRes(false));
  }, [call, selectedRow]);

  return (
    <div className="flex flex-col w-full h-full gap-2 p-2">
      <Toaster position="top-center" />
      <div className="flex flex-col w-full h-20 shrink-0 items-center gap-1">
        <h1 className="text-3xl font-bold">Registro de comunicaciones</h1>
        <InfoLog
          total_request={headerLog.tr}
          total_errors={headerLog.te}
          total_critical_errors={headerLog.tce}
        />
      </div>
      <FiltrosLog
        functionList={functionList}
        usersList={usersList}
        statusList={statusList}
      />
      <div className="flex flex-1 min-h-0 gap-2">
        <LogHeaderTable headList={headerLog.l} loading={loadingHeader} />
        <LogReqRes json={req} type={"Request:"} />
        <LogReqRes json={res} type={"Response:"} />
      </div>
    </div>
  );
};

export default Log;

const req = {
  function: "GETAPRUBROS",
  paramters: {},
  user: "sralvarez",
};
const res = {
  error: null,
  result: [
    {
      description: "A.P.24 HORAS",
      id: "AP24",
    },
    {
      description: "AREA PROTEGIDA GRATIS (CANJE)",
      id: "AREAG",
    },
    {
      description: "CROSS FIT, ARTES MARCIALES",
      id: "ARTMA",
    },
    {
      description: "BANCOS",
      id: "BANCO",
    },
    {
      description: "BAR, PUB, COMIDA PASO",
      id: "BAR",
    },
    {
      description: "BINGOS",
      id: "BINGO",
    },
    {
      description: "CANCHAS DE TENIS, PADDLE",
      id: "CANCH",
    },
    {
      description: "CANCHAS DE FUTBOL",
      id: "CANFU",
    },
    {
      description: "CENTRO DE DIA SIN INTERNACION",
      id: "CDIA",
    },
    {
      description: "CINES Y TEATROS",
      id: "CINES",
    },
    {
      description: "CLUBES",
      id: "CLUB",
    },
    {
      description: "COMERCIOS MENORES, OFICINAS Y QUIOSCOS",
      id: "COMER",
    },
    {
      description: "CONSULTORIOS",
      id: "CONS",
    },
    {
      description: "OBRAS EN CONSTRUCCION",
      id: "CONST",
    },
    {
      description: "CONVENIO COLECTIVO",
      id: "CONVC",
    },
    {
      description: "COUNTRIES ESPACIOS COMUNES",
      id: "COUNC",
    },
    {
      description: "COUNTRIES COBERTURA GLOBAL",
      id: "COUNT",
    },
    {
      description: "DISCOTECAS",
      id: "DISCO",
    },
    {
      description: "PARQUE DE DIVERSIONES",
      id: "DIVER",
    },
    {
      description: "EDIFICIOS Y EMPRESAS INDUSTRIALES",
      id: "EDI",
    },
    {
      description: "EDIFICIOS DE DEPARTAMENTOS",
      id: "EDIDE",
    },
    {
      description: "EMPRESAS",
      id: "EMP",
    },
    {
      description: "ESCUELAS, COLEGIOS Y JARDINES CON COSEGURO",
      id: "ESCCC",
    },
    {
      description: "ESCUELAS, COLEGIOS Y JARDINES SIN COSEGURO",
      id: "ESCSC",
    },
    {
      description: "COCHERAS",
      id: "ESTAC",
    },
    {
      description: "ESTACIONES DE SERVICIO",
      id: "ESTSE",
    },
    {
      description: "FARMACIAS",
      id: "FARM",
    },
    {
      description: "FLETES",
      id: "FLETE",
    },
    {
      description: "PLANES FULL DEBITO",
      id: "FULLD",
    },
    {
      description: "PLANES FULL EFECTIVO",
      id: "FULLE",
    },
    {
      description: "GALERIAS COMERCIALES",
      id: "GAL",
    },
    {
      description: "RETIRO, GERIATRICOS Y SALAS VELATORIAS",
      id: "GER",
    },
    {
      description: "GIMNASIOS",
      id: "GIM",
    },
    {
      description: "HOGAR PROTEGIDO",
      id: "HOGAR",
    },
    {
      description: "HOTELES",
      id: "HOTEL",
    },
    {
      description: "SERVICIO DE MENSAJERIA",
      id: "MENSA",
    },
    {
      description: "PILATES",
      id: "PILAT",
    },
    {
      description: "CASAS DE RETIRO Y ESTABLEC.RELIGIOSOS",
      id: "RELIG",
    },
    {
      description: "REMISERIAS",
      id: "REMIS",
    },
    {
      description: "RESTAURANTES",
      id: "REST",
    },
    {
      description: "SALON DE FIESTAS",
      id: "SALON",
    },
    {
      description: "SOCIEDADES DE FOMENTO",
      id: "SOCFO",
    },
    {
      description: "SUPERMERCADOS",
      id: "SUPER",
    },
    {
      description: "TAXIS",
      id: "TAXI",
    },
    {
      description: "TERCIARIOS (TECNICOS, IDIOMAS, ARTE)",
      id: "TERCI",
    },
    {
      description: "MICROS ESCOLARES",
      id: "TRANS",
    },
  ],
};
