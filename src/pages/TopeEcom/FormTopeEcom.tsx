import { type Topeecom, type Rubros } from "../../types/ABM";

type Props = {
  topeecom: Topeecom;
  rubros: Rubros[];
  handleOnSubmit: () => void;
  handleOnChangeDate: (e: string) => void;
  handleOnChangeTope: (e: string) => void;
  handleRubroChange: (i: number, e: string) => void;
  handleOnCancel: () => void;
  deleteRow: (i: number) => void;
  updateRow: (i: number, { tope }: { tope: number | "" }) => void;
  addRow: () => void;
};

const FormTopeEcom = ({
  topeecom,
  rubros,
  handleOnSubmit,
  handleOnChangeDate,
  handleOnChangeTope,
  handleRubroChange,
  handleOnCancel,
  deleteRow,
  updateRow,
  addRow,
}: Props) => {
  return (
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
                          e.target.value === "" ? "" : Number(e.target.value),
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
  );
};

export default FormTopeEcom;
