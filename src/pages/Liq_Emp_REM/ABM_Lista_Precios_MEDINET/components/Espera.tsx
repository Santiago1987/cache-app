import { SectionTitle } from "@/components/ui/Typography";
import { Table } from "@/components/ui/Table";
import {
  useController,
  type Control,
  type FieldPathByValue,
} from "react-hook-form";
import { ColsMainHeader, type ListPreRem } from "../types/schema";
import type { Column } from "@/types/generalTypes";
import { fmt } from "@/utils/formatNumber";
import { useModo } from "../hooks/useModo";

type Props = {
  control: Control<ListPreRem>;
};

type EsperaField = FieldPathByValue<ListPreRem, number | null>;

type EsperaRow = {
  id: "capital" | "provincia";
  label: string;
  grupos: { dia: EsperaField; noche: EsperaField }[];
};

// Celda controlada: muestra el valor formateado en modo view y un input en
// modo edición. No modifica el componente Table: aprovecha que `cell`
// devuelve un ReactNode.
function EsperaCell({
  control,
  name,
  editable,
}: {
  control: Control<ListPreRem>;
  name: EsperaField;
  editable: boolean;
}) {
  const { field, fieldState } = useController({ control, name });

  if (!editable) return <>{fmt(field.value)}</>;

  return (
    <input
      {...field}
      value={field.value ?? ""}
      type="number"
      inputMode="decimal"
      maxLength={10}
      onFocus={(e) => e.target.select()}
      onChange={(e) => {
        const num = e.target.valueAsNumber;
        field.onChange(
          e.target.value === "" || Number.isNaN(num) ? null : num,
        );
      }}
      className={`w-full min-w-0 text-right text-xs px-1 py-0 rounded border focus:outline-none focus:ring-1 focus:ring-vblue-0 ${
        fieldState.error ? "border-red-500" : "border-vblue-0"
      }`}
    />
  );
}

const Espera = ({ control }: Props) => {
  const { modo } = useModo();
  const isEditMode = modo === "edit" || modo === "create";

  const data: EsperaRow[] = [
    {
      id: "capital",
      label: "Cap. Fed.",
      grupos: [
        { dia: "espacd", noche: "espacn" },
        { dia: "espccd", noche: "espccn" },
        { dia: "espmcd", noche: "espmcn" },
        { dia: "espucd", noche: "espucn" },
        { dia: "espncd", noche: "espncn" },
      ],
    },
    {
      id: "provincia",
      label: "Provincia",
      grupos: [
        { dia: "espapd", noche: "espapn" },
        { dia: "espcpd", noche: "espcpn" },
        { dia: "espmpd", noche: "espmpn" },
        { dia: "espupd", noche: "espupn" },
        { dia: "espnpd", noche: "espnpn" },
      ],
    },
  ];

  const columns: Column<EsperaRow>[] = [
    {
      header: "N°",
      colSpan: 1,
      cell: () => "-",
      cellClassName: () => "font-bold justify-center",
    },
    {
      header: "Hasta",
      colSpan: 1,
      cell: (r) => r.label,
      cellClassName: () => "font-bold justify-start",
    },
    ...ColsMainHeader.map<Column<EsperaRow>>((header, i) => ({
      header,
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => (
            <EsperaCell
              control={control}
              name={r.grupos[i].dia}
              editable={isEditMode}
            />
          ),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => (
            <EsperaCell
              control={control}
              name={r.grupos[i].noche}
              editable={isEditMode}
            />
          ),
          cellClassName: () => "justify-end",
        },
      ],
    })),
  ];

  return (
    <div className="flex flex-col w-full items-center justify-center py-1 border rounded-lg shadow-lg">
      <SectionTitle>Valor por espera</SectionTitle>
      <Table columns={columns} data={data} getRowId={(r) => r.id} />
    </div>
  );
};

export default Espera;
