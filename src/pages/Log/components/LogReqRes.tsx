import { BlocksWaveSpinner } from "@/components/icons/Loading";

interface Props {
  json: object | null;
  type: string;
  loading: boolean;
}

const LogReqRes = ({ json, type, loading }: Props) => {
  const jsonPretty = JSON.stringify(json, null, 2);

  return (
    <section className="relative flex flex-col w-1/3 h-full min-h-0 border border-black rounded-lg shadow-lg">
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
      <div className="flex flex-col justify-center w-full h-10 shrink-0">
        <h2 className="text-2xl font-bold p-2">{type}</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-auto bg-[#1e1e1e]">
        {json ? (
          <pre className="text-[#d4d4d4] p-1">
            <code> {jsonPretty}</code>
          </pre>
        ) : null}
      </div>
    </section>
  );
};

export default LogReqRes;
