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
  return (
    <div className="flex flex-row gap-1 space-between px-1 py-1">
      <span title={title} className="text-base font-bold">
        {label}
      </span>
      <span className={`text-base`}>{value}</span>
    </div>
  );
};
