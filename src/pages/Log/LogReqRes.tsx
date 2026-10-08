interface Props {
  json: object;
  type: string;
}

const LogReqRes = ({ json, type }: Props) => {
  const jsonPretty = JSON.stringify(json, null, 2);

  return (
    <section className="flex flex-col w-1/3 h-full min-h-0 border border-black rounded-lg shadow-lg">
      <div className="flex flex-col justify-center w-full h-10 shrink-0">
        <h2 className="text-2xl font-bold p-2">{type}</h2>
      </div>
      <div className="flex-1 min-h-0 overflow-auto bg-[#1e1e1e]">
        <pre className="text-[#d4d4d4] p-1">
          <code> {jsonPretty}</code>
        </pre>
      </div>
    </section>
  );
};

export default LogReqRes;
