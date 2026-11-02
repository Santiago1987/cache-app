import { Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Typography";
import { useWatch, type Control } from "react-hook-form";
import {
  type ListPreRem,
  type TrasXKMRow,
  ColsMainHeader,
} from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import type { Column } from "@/types/generalTypes";

type Props = {
  control: Control<ListPreRem>;
};

const ValorXDistanciaTable = ({ control }: Props) => {
  const v = useWatch({ control, name: "trasladosXKm" });

  const columns: Column<TrasXKMRow>[] = [
    {
      header: "N°",
      colSpan: 1,
      cell: (r) => r.num,
      cellClassName: () => "justify-center",
    },
    {
      header: "Hasta",
      colSpan: 1,
      cell: (r) => r.hasta,
      cellClassName: () => "justify-center font-bold",
    },
    {
      header: ColsMainHeader[0],
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => r.auto,
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => r.auton,
          cellClassName: () => "justify-end",
        },
      ],
    },
    {
      header: ColsMainHeader[1],
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => r.comun,
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => r.comunn,
          cellClassName: () => "justify-end",
        },
      ],
    },
    {
      header: ColsMainHeader[2],
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => r.medico,
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => r.medicon,
          cellClassName: () => "justify-end",
        },
      ],
    },
    {
      header: ColsMainHeader[3],
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => r.utim,
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => r.utimn,
          cellClassName: () => "justify-end",
        },
      ],
    },
    {
      header: ColsMainHeader[4],
      colSpan: 2,
      subColumns: [
        {
          header: "Día",
          cell: (r) => r.unm,
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => r.unmn,
          cellClassName: () => "justify-end",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full h-full items-center py-1 justify-center">
      <SectionTitle>Valor por distancia</SectionTitle>
      <Table columns={columns} data={v} getRowId={(r) => r.hasta ?? 1} />
    </div>
  );
};

export default ValorXDistanciaTable;
