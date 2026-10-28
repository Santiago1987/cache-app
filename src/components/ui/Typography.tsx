export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold shrink-0">{children}</h1>;
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

export const Dato = ({
  label,
  value,
  title = "",
}: {
  label: string;
  value?: string;
  title?: string;
}) => {
  // Acepta "1234", "-12.5", "1.234,50", "$ 1.234,50", "15%"
  const isNumeric = !!value && /^[-+$%\s]*\d[\d.,\s]*[%]?$/.test(value.trim());

  return (
    <div className="flex flex-row w-full gap-1 space-between py-0.5 px-1">
      <span
        title={title}
        className="text-base font-bold shrink-0 whitespace-nowrap"
      >
        {label}
      </span>
      <span
        className={`text-base whitespace-nowrap ${isNumeric ? "ml-auto text-right" : "text-left"}`}
      >
        {value}
      </span>
    </div>
  );
};
