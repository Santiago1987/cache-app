import { type Filtros } from "@/types/generalTypes";

type Props = {
  functionList: Set<string>;
  usersList: Set<string>;
  statusList: Set<number>;
  filtrosVal: Filtros;
  handleOnChangeFiltro: (
    type: string,
    e:
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.SyntheticEvent<HTMLSelectElement, Event>,
  ) => void;
};

const FiltrosLog = ({
  functionList,
  usersList,
  statusList,
  filtrosVal,
  handleOnChangeFiltro,
}: Props) => {
  return (
    <div className="flex flex-col w-full p-2 h-30 border rounded-lg shadow-lg">
      <h2 className="text-2xl h-3/10 font-bold">Filtros:</h2>
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
                value={filtrosVal.dateFrom}
              />
            </label>
            <label className="text-md p-1">
              Hasta:
              <input
                type="datetime-local"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
                onChange={(e) => handleOnChangeFiltro("DT", e)}
                value={filtrosVal.dateTo}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col w-[20%]">
          <h3 className="text-md font-bold">Usuario:</h3>
          <select
            name="user"
            className="rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
            onSelect={(e) => handleOnChangeFiltro("US", e)}
          >
            <option value={"all"} defaultValue={"all"}>
              Todos
            </option>
            {usersList.size > 0
              ? [...usersList].map((user) => (
                  <option
                    key={user}
                    value={user}
                    selected={user === filtrosVal.user}
                  >
                    {user}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="text-md font-bold">Función:</h3>
          <select
            name="funciones"
            className="rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
            onChange={(e) => handleOnChangeFiltro("FU", e)}
          >
            <option value={"all"} defaultValue={"all"}>
              Todas
            </option>
            {functionList.size > 0
              ? [...functionList].map((fun) => (
                  <option
                    key={fun}
                    value={fun}
                    selected={fun === filtrosVal.funcion}
                  >
                    {fun}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="flex flex-col w-[20%]">
          <h3 className="text-md font-bold">Status:</h3>
          <select
            name="status"
            className="rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
            onSelect={(e) => handleOnChangeFiltro("ST", e)}
          >
            <option value={"all"} defaultValue={"all"}>
              Todos
            </option>
            {statusList.size > 0
              ? [...statusList].map((stat) => (
                  <option
                    key={stat}
                    value={stat}
                    selected={stat === filtrosVal.status}
                  >
                    {stat}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosLog;
