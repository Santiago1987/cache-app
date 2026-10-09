type Props = {
  total_request: number;
  total_errors: number;
  total_critical_errors: number;
};

const InfoLog = ({
  total_request,
  total_errors,
  total_critical_errors,
}: Props) => {
  return (
    <div className="w-full h-full flex flex-row items-center justify-between ">
      <div className="flex flex-row w-60 p-2 items-center border border-black rounded-lg shadow-lg">
        <label className="font-bold w-6/10">Total de request:</label>
        <label className="flex w-4/10 justify-end">{total_request}</label>
      </div>
      <div className="flex flex-row w-60 p-2 items-center border border-black rounded-lg shadow-lg">
        <label className="font-bold w-6/10">Total de errores:</label>
        <label className="flex w-4/10 justify-end">{total_errors}</label>
      </div>
      <div
        title="Errores no manejados por el backend"
        className="flex flex-row w-80 p-2 items-center border border-black rounded-lg shadow-lg"
      >
        <label className="font-bold w-6/10">Total de errores criticos:</label>
        <label className="flex w-4/10 justify-end">
          {total_critical_errors}
        </label>
      </div>
    </div>
  );
};

export default InfoLog;
