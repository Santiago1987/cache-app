type Props = {
  functionList: Set<string>;
  usersList: Set<string>;
  statusList: Set<number>;
};

const FiltrosLog = ({ functionList, usersList, statusList }: Props) => {
  return (
    <div className="flex flex-col w-full p-2 h-30 border rounded-lg">
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
                type="Date"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              />
            </label>
            <label className="text-md p-1">
              Hasta:
              <input
                type="Date"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex items-start h-full">
            <h3 className="text-lg font-bold p-1">Hora:</h3>
          </div>
          <div className="flex flex-col h-full">
            <label className="text-md p-1">
              Desde:
              <input
                type="Time"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              />
            </label>
            <label className="text-md p-1">
              Hasta:
              <input
                type="Time"
                className="rounded-md px-1 ml-1 bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col w-[20%]">
          <h3 className="text-md font-bold">Usuario:</h3>
          <select
            name="funciones"
            className="rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
          >
            <option value={"all"} selected defaultValue={"all"}>
              Todos
            </option>
            {usersList.size > 1
              ? [...usersList].map((user) => (
                  <option value={user} selected>
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
          >
            <option value={"all"} selected defaultValue={"all"}>
              Todas
            </option>
            {functionList.size > 1
              ? [...functionList].map((fun) => (
                  <option value={fun} selected>
                    {fun}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="flex flex-col w-[10%]">
          <h3 className="text-md font-bold">Status:</h3>
          <select
            name="funciones"
            className="rounded-md px-1 h-full bg-white border border-vblue-0 text-md focus:outline-none focus:ring-2 focus:ring-accent-blue hover:cursor-pointer"
          >
            <option value={"all"} selected defaultValue={"all"}>
              Todos
            </option>
            {statusList.size > 1
              ? [...statusList].map((stat) => (
                  <option value={stat} selected>
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
