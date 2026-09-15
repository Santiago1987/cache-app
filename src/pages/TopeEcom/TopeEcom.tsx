import { useEffect, useState } from "react";
import { type Topeecom, type TopeRow, type Rubros } from "../../types/ABM";
import FormTopeEcom from "./FormTopeEcom";
import TopeList from "./TopeList";

const emptyRow: TopeRow = { rubro: { id: "", description: "" }, tope: "" };

const init = {
  fecha: "",
  tope: "",
  list: [emptyRow],
};

const TopeEcom = () => {
  const [topeecom, setTopeecom] = useState<Topeecom>(init);
  const [rubros, setRubros] = useState<Rubros[]>([]);
  const [currTopes, setCurrTopes] = useState<Topeecom[]>([]);
  const [reload, setReload] = useState(true);

  // OBTENGO LA LISTA DE RUBROS
  useEffect(() => {
    const body = { function: "GETAPRUBROS", parameters: {} };
    fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.log("salio mal lo de conseguir rubros", res.text);
          return;
        }
        return res.json();
      })
      .then((res) => {
        let rubros = [];
        for (let k of Object.keys(res)) {
          rubros.push({
            id: k,
            description: res[k],
          });
        }
        setRubros(rubros);
      })
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  }, []);

  //OBTENGO LISTA DE TOPES
  useEffect(() => {
    let topList: Topeecom[] = [];

    const body = { function: "GETTOPES", parameters: {} };
    fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.log("salio mal lo de conseguir rubros");
          return;
        }
        return res.json();
      })
      .then((response) => {
        for (let res of response) {
          let { date, list, topeDefault } = res;
          let listr = [];

          for (let rub of list) {
            let { description, id, tope } = rub;
            listr.push({
              rubro: { description, id },
              tope: Number(tope),
            });
          }

          let top = {
            fecha:
              String(date).slice(0, 4) +
              "-" +
              String(date).slice(4, 6) +
              "-" +
              String(date).slice(6, 8),
            tope: Number(topeDefault),
            list: listr,
          };

          topList.push(top);
        }
        setCurrTopes(topList);
      })
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  }, [reload]);

  const handleOnChangeDate = (value: string) => {
    setTopeecom((prev) => ({ ...prev, fecha: value }));
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
    updateRow(index, { rubro: match ?? { id: "", description } });
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

    fetch("/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("salio mal lo de conseguir rubros");
          return;
        }
        setReload(!reload);
        return;
      })
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  };

  const handleOnCancel = () => {
    setTopeecom(init);
  };

  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="p-2 text-3xl text-white font-bold shrink-0">
        Topes por rubros de Ecommerce
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
