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
    <section className="flex flex-col w-full p-2 bg-vwhite-0 ml-1 rounded-2xl">
      <h2 className="text-2xl font-bold p-2 mx-auto">
        Crear nuevo tope para Ecommerce
      </h2>
      <form onSubmit={handleOnSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <label className="inline text-2xl mb-1">Fecha:</label>
          <input
            type="Date"
            className="px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
            onChange={(e) => handleOnChangeDate(e.target.value)}
            value={topeecom?.fecha.toString()}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="iinline text-2xl mb-1">Tope default:</label>
          <input
            type="number"
            className="w-50 px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
            onChange={(e) => handleOnChangeTope(e.target.value)}
            value={topeecom.tope}
          />
        </div>
        <div className="w-full border border-accent-blue rounded-2xl overflow-y-auto">
          <h2 className="text-lg font-bold p-2 mx-auto">
            Definir tope para un rubro en especifico
          </h2>
          <table className="w-full text-sm mb-2">
            <thead>
              <tr>
                <th className="text-left text-lg p-2">Rubro</th>
                <th className="text-left text-lg p-2">Tope</th>
                <th className="text-left text-lg p-2"></th>
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
                      className="w-full px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
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
                      className="w-full px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => deleteRow(i)}
                      className="px-3 py-2 rounded-lg bg-white border border-vblue-0 text-lg hover:bg-vblue-0 hover:text-white"
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
          <div className="flex gap-2 mb-2 p-2">
            <button
              type="button"
              onClick={addRow}
              className="mx-2 px-3 py-1 text-white rounded-lg bg-vgreen-0 border-2 border-vgreen-0 text-lg hover:bg-white hover:text-accent-vgreen hover:cursor-pointer"
            >
              + Agregar fila
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="mx-2 px-3 py-1 rounded-lg text-white bg-vgreen-0 border-2 border-vgreen-0 text-lg hover:bg-white hover:text-accent-vgreen hover:cursor-pointer"
            onClick={handleOnSubmit}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleOnCancel}
            className="mx-2 px-3 py-1 text-white rounded-lg bg-vgreen-0 border-2 border-vgreen-0 text-lg hover:bg-white hover:text-accent-vgreen hover:cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormTopeEcom;
