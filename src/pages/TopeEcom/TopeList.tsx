import { type Topeecom } from "../../types/ABM";

type Props = {
  topes: Topeecom[];
};

const money = (n: number | string) =>
  Number(n).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const TopeList = ({ topes }: Props) => {
  const ordenados = [...topes].sort((a, b) => b.fecha.localeCompare(a.fecha));
  // sv-SE da YYYY-MM-DD en hora local (toISOString usaria UTC y corre un dia)
  const hoy = new Date().toLocaleDateString("sv-SE");
  // ordenados viene descendente: el ultimo >= hoy es la fecha vigente mas proxima
  const activa = ordenados.filter((t) => t.fecha >= hoy).at(-1)?.fecha;

  return (
    <section className="flex flex-col w-full items-center bg-vwhite-0 mr-1 rounded-2xl">
      <h2 className="text-2xl font-bold p-2 mx-auto">
        Historico de topes por rubros
      </h2>
      {topes.length < 1 ? (
        <h3>No hay topes definidos</h3>
      ) : (
        <div className="flex flex-col gap-2 w-full p-2 overflow-y-auto">
          {ordenados.map((t) => (
            <details
              key={t.fecha}
              name="topes"
              className={`w-full rounded-lg border ${
                t.fecha === activa
                  ? "bg-accent-green/15 border-accent-green"
                  : "bg-surface-2 border-surface-3"
              }`}
            >
              <summary className="flex justify-between px-3 py-2 cursor-pointer text-sm hover:bg-white/5 rounded-lg">
                <span>{t.fecha}</span>
                <span>Tope default: {money(t.tope)}</span>
              </summary>
              <ul className="border-t border-surface-3">
                {t.list.map((row) => (
                  <li
                    key={row.rubro.id}
                    className="flex justify-between px-3 py-2 text-sm"
                  >
                    <span>{row.rubro.description}</span>
                    <span>{money(row.tope)}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopeList;
