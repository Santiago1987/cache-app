import { RotateCcw } from "lucide-react";

type Props = {
  total_request: number;
  total_errors: number;
  total_critical_errors: number;
  handleOnClickRefresh: () => void;
};

const InfoLog = ({
  total_request,
  total_errors,
  total_critical_errors,
  handleOnClickRefresh,
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
      <button
        onClick={handleOnClickRefresh}
        className="flex flex-row w-[8%] justify-evenly items-center px-2 py-2 rounded-lg bg-vgreen-0 text-white shadow-lg hover:cursor-pointer hover:scale-110"
      >
        <RotateCcw className="inline-block w-5 h-5 mr-2" />
        Refresh
      </button>
    </div>
  );
};

export default InfoLog;
