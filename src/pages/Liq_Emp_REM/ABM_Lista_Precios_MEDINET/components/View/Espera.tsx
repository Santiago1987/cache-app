import { SectionTitle } from "@/components/ui/Typography";
import { Table } from "@/components/ui/Table";
import { useWatch, type Control } from "react-hook-form";
import { ColsMainHeader, type ListPreRem } from "../../types/schema";
import type { Column } from "@/types/generalTypes";

type Props = {
  control: Control<ListPreRem>;
};

type EsperaRow = {
  id: "capital" | "provincia";
  label: string;
  grupos: { dia: string; noche: string }[];
};

const Espera = ({ control }: Props) => {
  const [capital, provincia] = useWatch({
    control,
    name: ["esperasCapital", "esperasProvincia"],
  });

  const data: EsperaRow[] = [
    {
      id: "capital",
      label: "Cap. Fed.",
      grupos: [
        { dia: capital.espacd, noche: capital.espacn },
        { dia: capital.espccd, noche: capital.espccn },
        { dia: capital.espmcd, noche: capital.espmcn },
        { dia: capital.espucd, noche: capital.espucn },
        { dia: capital.espncd, noche: capital.espncn },
      ],
    },
    {
      id: "provincia",
      label: "Provincia",
      grupos: [
        { dia: provincia.espapd, noche: provincia.espcpn },
        { dia: provincia.espcpd, noche: provincia.espmpn },
        { dia: provincia.espmpd, noche: provincia.espupn },
        { dia: provincia.espupd, noche: provincia.espnpn },
        { dia: provincia.espnpd, noche: provincia.espnpn },
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
