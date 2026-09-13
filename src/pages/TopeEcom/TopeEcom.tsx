import { useEffect, useState } from "react";
import { type Topeecom, type TopeRow, type Rubros } from "../../types/ABM";
import FormTopeEcom from "./FormTopeEcom";

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
          console.log("salio mal lo de conseguir rubros");
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
    const response = [
      {
        date: 20260908,
        list: [
          {
            description: "A.P.24 HORAS",
            id: "AP24",
            tope: "200000.00",
          },
        ],
        topeDefault: "1500000.00",
      },
      {
        date: 20260909,
        list: [
          {
            description: "CINES Y TEATROS",
            id: "CINES",
            tope: 600,
          },
          {
            description: "CLUBES",
            id: "CLUB",
            tope: 500,
          },
        ],
        topeDefault: 200,
      },
    ];

    let topList: Topeecom[] = [];
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
          String(date).slice(5, 6) +
          "-" +
          String(date).slice(7, 8),
        tope: Number(topeDefault),
        list: { ...listr },
      };

      topList.push(top);
    }

    setCurrTopes(topList);
  }, []);

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
        return res.json();
      })
      .then((res) => setCurrTopes(res.data))
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
  };

  const handleOnCancel = () => {
    setTopeecom(init);
  };

  return (
    <div className="flex flex-col h-full items-center">
      <h1 className="p-2 text-3xl font-bold shrink-0">
        Topes por rubros de Ecommerce
      </h1>
      <div className="flex flex-row gap-2 w-full flex-1 min-h-0">
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
        <section className="flex flex-col w-full h-full items-center bg-surface-1 mr-1 rounded-2xl">
          <h2>resultado</h2>
        </section>
      </div>
    </div>
  );
};

export default TopeEcom;
