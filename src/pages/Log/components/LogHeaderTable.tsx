import { BlocksWaveSpinner } from "@/components/icons/Loading";
import type { LogHeaderRow } from "@/types/generalTypes";

type Props = {
  headList: LogHeaderRow[];
  loading: boolean;
  handleOnSelectRow: (id: number) => void;
  selectedRow: number | null;
};

const LogHeaderTable = ({
  headList,
  loading,
  handleOnSelectRow,
  selectedRow,
}: Props) => {
  return (
    <section className="relative flex flex-col h-full w-1/3 border border-black rounded-lg overflow-hidden">
      {loading ? (
        <div className="absolute w-full h-full z-10 inset-0 flex items-center justify-center bg-black/50">
          <BlocksWaveSpinner
            width={80}
            height={80}
            speed={0.75}
            stroke="#59d6c6"
            fill="#59d6c6"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col min-h-0 overflow-auto">
        <div className="sticky top-0 z-5 grid bg-vblue-0 text-white text-md grid-cols-12 w-full h-10 shrink-0">
          <div className="flex col-span-2 h-full items-center justify-center border-r">
            <label className="font-bold">Fecha</label>
          </div>
          <div className="flex col-span-2 h-full items-center justify-center border-r">
            <label className="font-bold">Hora</label>
          </div>
          <div className="flex col-span-2 h-full items-center justify-center border-r">
            <label className="font-bold">Usuario</label>
          </div>
          <div className="flex col-span-4 h-full items-center justify-center border-r ">
            <label className="font-bold">Funcion</label>
          </div>
          <div className="flex col-span-2 h-full items-center justify-center">
            <label className="font-bold">Status</label>
          </div>
        </div>
        {headList.map((row) => {
          const { s } = row;
          const bgcol =
            s > 299 ? "bg-red-500" : s > 299 ? "bg-red-800" : "bg-green-500";
          return (
            <div
              key={row.i}
              className={`grid text-xs grid-cols-12 w-full h-10 shrink-0 hover:cursor-pointer hover:bg-gray-400/50 ${row.i === selectedRow ? "bg-vgreen-0 text-white" : "bg-white"}`}
              onClick={() => handleOnSelectRow(row.i)}
            >
              <div className="hidden">
                <span className="">{row.i}</span>
              </div>
              <div className="flex col-span-2 min-w-0 h-full items-center justify-center border-b border-black px-1">
                <span className="truncate">{row.d}</span>
              </div>
              <div className="flex col-span-2 min-w-0 h-full items-center justify-center border-b border-black px-1">
                <span className="truncate">{row.t}</span>
              </div>
              <div className="flex col-span-2 min-w-0 h-full items-center justify-center border-b border-black px-1">
                <span className="truncate">{row.u}</span>
              </div>
              <div className="flex col-span-4 min-w-0 h-full items-center justify-center border-b border-black px-1">
                <span className="truncate" title={row.f}>
                  {row.f}
                </span>
              </div>
              <div
                className={`flex col-span-2 min-w-0 h-full items-center justify-center border-b border-black px-1 ${bgcol}`}
              >
                <span className="truncate">{row.s}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LogHeaderTable;
