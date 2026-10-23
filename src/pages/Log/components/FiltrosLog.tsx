import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { SectionTitle } from "@/components/ui/Typography";
import { type Filtros, type LogFiltersResponse } from "@/types/generalTypes";
import { ListRestart } from "lucide-react";

type Props = {
  filtrosCB: LogFiltersResponse;
  filtrosVal: Filtros;
  handleOnChangeFiltro: (
    type: string,
    e:
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.SyntheticEvent<HTMLSelectElement, Event>,
  ) => void;
  handleOnClickReset: () => void;
};

const FiltrosLog = ({
  filtrosCB,
  filtrosVal,
  handleOnChangeFiltro,
  handleOnClickReset,
}: Props) => {
  return (
    <div className="flex flex-col w-full p-2 h-30 border rounded-lg shadow-lg">
      <div className="flex flex-row h-3/10 items-center justify-between">
        <SectionTitle>Filtros:</SectionTitle>
        <Button className="w-30" onClick={handleOnClickReset}>
          <ListRestart className="inline-block w-5 h-5 mr-2" />
          Reset filtros
        </Button>
      </div>
      <div className="flex flex-row justify-between gap-2 h-7/10">
        <div className="flex flex-row ">
          <div className="flex items-start h-full">
            <h3 className="text-lg font-bold p-1">Fechas:</h3>
          </div>
          <div className="flex flex-col h-full">
            <label className="text-md p-1">
              Desde:
              <input
                type="datetime-local"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
                onChange={(e) => handleOnChangeFiltro("DF", e)}
                value={filtrosVal.df}
              />
            </label>
            <label className="text-md p-1">
              Hasta:
              <input
                type="datetime-local"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
                onChange={(e) => handleOnChangeFiltro("DT", e)}
                value={filtrosVal.dt}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col w-[20%]">
          <h3 className="text-md font-bold">Usuario:</h3>
          <Select
            name="user"
            placeholder="Todos"
            value={filtrosVal.us}
            options={[...filtrosCB.us].map((u) => ({ value: u, label: u }))}
            onChange={(e) => handleOnChangeFiltro("US", e)}
          />
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="text-md font-bold">Función:</h3>
          <Select
            name="function"
            placeholder="Todas"
            value={filtrosVal.fun}
            options={[...filtrosCB.fun].map((f) => ({ value: f, label: f }))}
            onChange={(e) => handleOnChangeFiltro("FU", e)}
          />
        </div>
        <div className="flex flex-col w-[20%]">
          <h3 className="text-md font-bold">Status:</h3>
          <Select
            name="status"
            placeholder="Todos"
            value={filtrosVal.st}
            options={[...filtrosCB.st].map((s) => ({
              value: s,
              label: String(s),
            }))}
            onChange={(e) => handleOnChangeFiltro("ST", e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltrosLog;
