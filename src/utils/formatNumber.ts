const numberFormatter = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmt = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  return numberFormatter.format(value);
};
