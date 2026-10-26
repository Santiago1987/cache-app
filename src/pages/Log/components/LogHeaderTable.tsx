import { Table } from "@/components/ui/Table";
import type { Column, LogHeaderRow } from "@/types/generalTypes";

type Props = {
  headList: LogHeaderRow[];
  loading: boolean;
  handleOnSelectRow: (id: number) => void;
  selectedRow: number | null;
  loadMore: () => void;
  hasMore: boolean;
  loadingMoreRows: boolean;
};

const LogHeaderTable = ({
  headList,
  loading,
  handleOnSelectRow,
  selectedRow,
  loadMore,
  hasMore,
  loadingMoreRows,
}: Props) => {
  const columns: Column<LogHeaderRow>[] = [
    { header: "Fecha", colSpan: 2, cell: (r) => r.d },
    { header: "Hora", colSpan: 2, cell: (r) => r.t },
    { header: "Usuario", colSpan: 2, cell: (r) => r.u },
    { header: "Funcion", colSpan: 4, cell: (r) => r.f, title: (r) => r.f },
    {
      header: "Status",
      colSpan: 2,
      cell: (r) => r.s,
      cellClassName: (r) =>
        r.s > 499
          ? "bg-red-800 text-white"
          : r.s > 299
            ? "bg-red-500"
            : "bg-green-500",
    },
  ];

  return (
    <Table
      columns={columns}
      data={headList}
      getRowId={(r) => r.i}
      selectedRow={selectedRow}
      onSelectRow={handleOnSelectRow}
      loading={loading}
      loadMore={loadMore}
      hasMore={hasMore}
      loadingMore={loadingMoreRows}
    />
  );
};

export default LogHeaderTable;
