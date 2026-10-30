import { SectionTitle } from "@/components/ui/Typography";
import { Table } from "@/components/ui/Table";
import { useWatch, type Control } from "react-hook-form";
import { ColsMainHeader, type ListPreRem } from "../types/schema";
import type { Column } from "@/types/generalTypes";

type Props = {
  control: Control<ListPreRem>;
};

type EsperaRow = {
  id: "capital" | "provincia";
  label: string;
  grupos: { dia: number | null; noche: number | null }[];
};

const Espera = ({ control }: Props) => {
  const [
    espacd,
    espacn,
    espccd,
    espccn,
    espmcd,
    espmcn,
    espucd,
    espucn,
    espncd,
    espncn,
    espapd,
    espcpn,
    espcpd,
    espmpn,
    espmpd,
    espupn,
    espupd,
    espnpn,
    espnpd,
    espapn,
  ] = useWatch({
    control,
    name: [
      "espacd",
      "espacn",
      "espccd",
      "espccn",
      "espmcd",
      "espmcn",
      "espucd",
      "espucn",
      "espncd",
      "espncn",
      "espapd",
      "espcpn",
      "espcpd",
      "espmpn",
      "espmpd",
      "espupn",
      "espupd",
      "espnpn",
      "espnpd",
      "espapn",
    ],
  });

  const data: EsperaRow[] = [
    {
      id: "capital",
      label: "Cap. Fed.",
      grupos: [
        { dia: espacd, noche: espacn },
        { dia: espccd, noche: espccn },
        { dia: espmcd, noche: espmcn },
        { dia: espucd, noche: espucn },
        { dia: espncd, noche: espncn },
      ],
    },
    {
      id: "provincia",
      label: "Provincia",
      grupos: [
        { dia: espapd, noche: espcpn },
        { dia: espcpd, noche: espmpn },
        { dia: espmpd, noche: espupn },
        { dia: espupd, noche: espnpn },
        { dia: espnpd, noche: espapn },
      ],
    },
  ];

  const columns: Column<EsperaRow>[] = [
    { header: "N°", colSpan: 1, cell: () => "-" },
    { header: "Hasta", colSpan: 1, cell: (r) => r.label },
    ...ColsMainHeader.map<Column<EsperaRow>>((header, i) => ({
      header,
      colSpan: 2,
      subColumns: [
        { header: "Día", cell: (r) => r.grupos[i].dia },
        { header: "Noche", cell: (r) => r.grupos[i].noche },
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
