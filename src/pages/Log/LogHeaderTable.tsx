import { BlocksWaveSpinner } from "@/components/icons/Loading";
import type { LogHeaderRow } from "@/types/generalTypes";

type Props = {
  headList: LogHeaderRow[];
  loading: boolean;
};

const LogHeaderTable = ({ headList, loading }: Props) => {
  return (
    <section className="relative h-full w-1/3 border border-black overflow-auto rounded-lg">
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
      <div className="grid bg-vblue-0 text-white text-md grid-cols-12 w-full h-10 shrink-0">
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
      <div className="flex flex-1 flex-col min-h-0 overflow-auto ">
        {headList.map((row) => {
          const { s } = row;
          const bgcol =
            s > 299 ? "bg-red-500" : s > 299 ? "bg-red-800" : "bg-green-500";
          return (
            <div key={row.i} className="grid text-xs grid-cols-12 w-full h-10">
              <div className="hidden">
                <label className="">{row.i}</label>
              </div>
              <div className="flex col-span-2 h-full w-full items-center justify-center border-b border-black">
                <label className="">{row.d}</label>
              </div>
              <div className="flex col-span-2 h-full w-full items-center justify-center border-b border-black">
                <label className="">{row.t}</label>
              </div>
              <div className="flex col-span-2 h-full w-full items-center justify-center border-b border-black">
                <label className="">{row.u}</label>
              </div>
              <div className="flex col-span-4 h-full w-full items-center justify-center border-b border-black">
                <label className="">{row.f}</label>
              </div>
              <div
                className={`flex col-span-2 h-full w-full items-center justify-center border-b border-black ${bgcol}`}
              >
                <label className="">{row.s}</label>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LogHeaderTable;
