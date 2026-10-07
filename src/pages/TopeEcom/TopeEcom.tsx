import { useEffect, useState } from "react";
import { type Topeecom, type TopeRow, type Rubros } from "../../types/ABM";
import FormTopeEcom from "./FormTopeEcom";
import TopeList from "./TopeList";
import useApi from "@/hooks/useApi";

const emptyRow: TopeRow = { id: "", description: "", tope: "" };

const init = {
  date: "",
  topeDefault: "",
  list: [emptyRow],
};

const TopeEcom = () => {
  const [topeecom, setTopeecom] = useState<Topeecom>(init);
  const [rubros, setRubros] = useState<Rubros[]>([]);
  const [currTopes, setCurrTopes] = useState<Topeecom[]>([]);
  const [reload, setReload] = useState(true);

  const call = useApi();

  // OBTENGO LA LISTA DE RUBROS
  useEffect(() => {
    call<Rubros[]>("GETAPRUBROS", {})
      .then((res) => {
        setRubros(res);
      })
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  }, [call]);

  //OBTENGO LISTA DE TOPES
  useEffect(() => {
    call<Topeecom[]>("GETTOPES", {})
      .then((res) => setCurrTopes(res))
      .catch((ex) => console.log("algo salio mal en el fetch topes: " + ex));
  }, [reload, call]);

  const handleOnChangeDate = (value: string) => {
    setTopeecom((prev) => ({ ...prev, date: value }));
  };

  const updateRow = (index: number, patch: Partial<TopeRow>) => {
    setTopeecom((prev) => ({
      ...prev,
      list: prev.list.map((row, i) =>
        i === index ? { ...row, ...patch } : row,
      ),
    }));
  };

  const addRow = () => {
    setTopeecom((prev) => ({ ...prev, list: [...prev.list, emptyRow] }));
  };

  const handleRubroChange = (index: number, description: string) => {
    const match = rubros.find((r) => r.description === description);
    updateRow(index, {
      description: match?.description ?? "",
      id: match?.id ?? "",
    });
  };

  const deleteRow = (index: number) => {
    setTopeecom((prev) => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index),
    }));
  };

  const handleOnChangeTope = (value: string) => {
    setTopeecom((prev) => ({ ...prev, tope: +value }));
  };

  const handleOnSubmit = () => {
    handleOnCancel();

    const body = {
      function: "SAVETOPEECOM",
      parameters: { ...topeecom },
    };

    call<void>("SAVETOPEECOM", body)
      .then(() => {
        setReload(!reload);
        return;
      })
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  };

  const handleOnCancel = () => {
    setTopeecom(init);
  };

  return (
    <div className="flex flex-col p-1 h-full items-center">
      <h1 className="p-2 text-3xl font-bold shrink-0">
        Topes Por Rubros De Ecommerce
      </h1>
      <div className="flex flex-row w-full gap-2 flex-1 min-h-0">
        <FormTopeEcom
          topeecom={topeecom}
          rubros={rubros}
          handleOnSubmit={handleOnSubmit}
          handleOnChangeDate={handleOnChangeDate}
          handleOnChangeTope={handleOnChangeTope}
          handleRubroChange={handleRubroChange}
          handleOnCancel={handleOnCancel}
          deleteRow={deleteRow}
          updateRow={updateRow}
          addRow={addRow}
        />
        <TopeList topes={currTopes} />
      </div>
    </div>
  );
};

export default TopeEcom;
