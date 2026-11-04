import { Table } from "@/components/ui/Table";
import { SectionTitle } from "@/components/ui/Typography";
import { useFieldArray, type Control } from "react-hook-form";
import {
  type ListPreRem,
  type TrasXKMRow,
  ColsMainHeader,
} from "@/pages/Liq_Emp_REM/ABM_Lista_Precios_MEDINET/types/schema";
import type { Column } from "@/types/generalTypes";
import { CircleMinus, CirclePlus, SquareText } from "lucide-react";
import { useModo } from "../hooks/useModo";
import { Button } from "@/components/ui/Button";
import { fmt } from "@/utils/formatNumber";
import LineTableModalABM from "./LineTableModalABM";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type Props = {
  control: Control<ListPreRem>;
};

const ValorXDistanciaTable = ({ control }: Props) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [EdiModalOpen, setEdiModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState<TrasXKMRow | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "trasladosXKm",
  });
  const { modo } = useModo();

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
          cell: (r) => fmt(r.auto),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => fmt(r.auton),
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
          cell: (r) => fmt(r.comun),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => fmt(r.comunn),
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
          cell: (r) => fmt(r.medico),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => fmt(r.medicon),
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
          cell: (r) => fmt(r.utim),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => fmt(r.utimn),
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
          cell: (r) => fmt(r.unm),
          cellClassName: () => "justify-end",
        },
        {
          header: "Noche",
          cell: (r) => fmt(r.unmn),
          cellClassName: () => "justify-end",
        },
      ],
    },
  ];
  const isEditMode = modo === "edit" || modo === "create";

  // CERRA EL MODAL
  const handleOpenModal = useCallback((oc: boolean) => {
    setEdiModalOpen(oc);
  }, []);

  // GUARDAR LOS CAMBIOS
  const handleOnConfirmChanges = useCallback(
    (row: TrasXKMRow) => {
      // 'hasta' debe ser único entre las filas (excluyendo la que se edita)
      const duplicada = fields.some(
        (r, i) => r.hasta === row.hasta && i !== editIndex,
      );
      if (duplicada) {
        toast.error(`Ya existe una fila con 'Hasta' = ${row.hasta}`);
        return; // no cierra el modal ni guarda
      }

      setEdiModalOpen(false);
      if (editIndex === null) {
        row.num = fields.length + 1;
        append(row);
        return;
      }

      update(editIndex, row);
    },
    [fields, editIndex, append, update],
  );

  // SELECCIONAR UNA LINEA
  const handleOnSelectRow = useCallback((id: number) => {
    setSelectedRow(id);
  }, []);

  // EDITAR UNA LINEA
  const handleOnClickEditRow = useCallback(() => {
    if (!selectedRow) {
      toast.error("Se debe seleccionar una fila antes");
      return;
    }
    const idx = fields.findIndex((r) => r.hasta === selectedRow);
    if (idx === -1) {
      toast.error("No se encontro la fila");
      return;
    }
    setDataModal(fields[idx]);
    setEdiModalOpen(true);
    setEditIndex(idx);
  }, [selectedRow, fields]);

  // AGREGAR NUEVA LINEA
  const handleOnClickNewLine = useCallback(() => {
    setEditIndex(null);
    setDataModal(null);
    setEdiModalOpen(true);
  }, []);

  // BORRAR LINEA
  const handleOnClickDeleteRow = useCallback(() => {
    const idx = fields.findIndex((r) => r.hasta === selectedRow);
    if (idx !== -1) remove(idx);
    setSelectedRow(null);
  }, [fields, remove, selectedRow]);

  return (
    <div className="flex flex-col w-full h-full items-center pt-1 justify-center">
      <LineTableModalABM
        isOpen={EdiModalOpen}
        onClose={() => handleOpenModal(false)}
        onConfirm={handleOnConfirmChanges}
        data={dataModal ? dataModal : undefined}
      />
      <SectionTitle>Valor por distancia</SectionTitle>
      <Table
        columns={columns}
        data={fields}
        getRowId={(r) => r.hasta ?? 1}
        selectedRow={selectedRow}
        onSelectRow={isEditMode ? handleOnSelectRow : undefined}
      />
      {isEditMode && (
        <div className="flex flex-row h-12 p-1 w-full items-center justify-end gap-4 border-t border-accent-blue">
          <Button
            variant="secondary"
            onClick={handleOnClickNewLine}
            className="gap-2"
          >
            <CirclePlus width={20} height={20} />
            Agregar fila
          </Button>
          <Button
            variant="secondary"
            onClick={handleOnClickEditRow}
            className="gap-2"
            disabled={!selectedRow}
          >
            <SquareText width={"20px"} height={"20px"} />
            Editar fila
          </Button>
          <Button
            variant="danger"
            onClick={handleOnClickDeleteRow}
            className="gap-2"
          >
            <CircleMinus width={"20px"} height={"20px"} />
            Borrar fila
          </Button>
        </div>
      )}
    </div>
  );
};

export default ValorXDistanciaTable;
