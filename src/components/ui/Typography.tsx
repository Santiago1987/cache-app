export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold shrink-0">{children}</h1>;
};

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};
