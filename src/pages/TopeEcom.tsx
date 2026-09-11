import { useEffect, useState } from "react";

interface Rubros {
  id: string;
  description: string;
}

interface TopeRow {
  rubro: Rubros;
  tope: number | "";
}

interface Topeecom {
  fecha: string;
  tope: number | string;
  list: TopeRow[];
}

const emptyRow: TopeRow = { rubro: { id: "", description: "" }, tope: "" };

const init = {
  fecha: "",
  tope: "",
  list: [emptyRow],
};

const TopeEcom = () => {
  const [topeecom, setTopeecom] = useState<Topeecom>(init);
  const [rubros, setRubros] = useState<Rubros[]>([
    { id: "AP24", description: "A.P.24 HORAS" },
    { id: "AREAG", description: "AREA PROTEGIDA GRATIS (CANJE)" },
  ]);

  // OBTENGO LA LISTA DE RUBROS
  useEffect(() => {
    const body = { function: "GETAPRUBROS", parameters: {} };
    fetch("http://lrt-desa2:3506/api/process", {
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
      .then((res) => setRubros(res.data))
      .catch((ex) => console.log("algo salio mal en el fetch rubros: " + ex));
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
    console.log(topeecom);
    handleOnCancel();

    const body = topeecom;
    fetch("http://lrt-desa2:3506/api/process", {
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
      .then((res) => setRubros(res.data))
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
        <section className="flex flex-col w-full h-full bg-surface-1 ml-1 rounded-2xl">
          <h2 className="text-2xl font-bold p-2 mx-auto">Crear nuevo record</h2>
          <form
            onSubmit={handleOnSubmit}
            className="space-y-3 border-b border-surface-3/30"
          >
            <div className="flex gap-2 p-2">
              <label className="inline text-lg mb-1">Fecha:</label>
              <input
                type="Date"
                className="px-3 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                onChange={(e) => handleOnChangeDate(e.target.value)}
                value={topeecom?.fecha.toString()}
              />
            </div>
            <div className="flex gap-2 p-2">
              <label className="inline text-lg mb-1">Tope default:</label>
              <input
                type="number"
                className="w-50 px-3 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                onChange={(e) => handleOnChangeTope(e.target.value)}
                value={topeecom.tope}
              />
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Rubro</th>
                  <th className="text-left p-2">Tope</th>
                  <th className="text-left p-2"></th>
                </tr>
              </thead>
              <tbody>
                {topeecom.list.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2">
                      <input
                        type="text"
                        list="rubros-datalist"
                        placeholder="selecciona un rubro..."
                        value={row.rubro.description}
                        onChange={(e) => handleRubroChange(i, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={row.tope}
                        onChange={(e) =>
                          updateRow(i, {
                            tope:
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => deleteRow(i)}
                        className="px-3 py-2 rounded-lg bg-surface-2 border border-surface-3 text-sm hover:bg-surface-3"
                      >
                        - Borrar fila
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <datalist id="rubros-datalist">
              {rubros.map((r) => (
                <option key={r.id} value={r.description} />
              ))}
            </datalist>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addRow}
                className="mx-2 px-3 py-1 rounded-lg bg-surface-2 border border-surface-3 text-sm hover:bg-surface-3"
              >
                + Agregar fila
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="mx-2 px-3 py-1 rounded-lg bg-surface-2 border border-surface-3 text-sm hover:bg-surface-3"
                onClick={handleOnSubmit}
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleOnCancel}
                className="mx-2 px-3 py-1 rounded-lg bg-surface-2 border border-surface-3 text-sm hover:bg-surface-3"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
        <section className="flex flex-col w-full h-full items-center bg-surface-1 mr-1 rounded-2xl">
          <h2>resultado</h2>
        </section>
      </div>
    </div>
  );
};

export default TopeEcom;
