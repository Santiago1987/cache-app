import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import type { Column } from "@/types/generalTypes";

type Id = string | number;

type SearchSelectModalProps<T> = {
  isOpen: boolean;
  onClose: () => void;
  data: T[];
  onSelect: (item: T) => void;
  columns: Column<T>[];
  getRowId: (row: T) => Id;
  searchKeys: (keyof T)[];
  title?: string;
  placeholder?: string;
};

// Normaliza para que la búsqueda ignore mayúsculas y acentos
const normalize = (value: unknown) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function SearchSelectModal<T>({
  isOpen,
  onClose,
  data,
  onSelect,
  columns,
  getRowId,
  searchKeys,
  title = "Buscar",
  placeholder = "Escribí para filtrar...",
}: SearchSelectModalProps<T>) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<Id | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Al abrir: foco en el input. Al cerrar: limpiar estado.
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setSelectedId(null);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return data;
    return data.filter((row) =>
      searchKeys.some((key) => normalize(row[key]).includes(q)),
    );
  }, [data, query, searchKeys]);

  // Si lo filtrado deja de contener la fila elegida, descarto la selección
  useEffect(() => {
    if (selectedId == null) return;
    const stillVisible = filtered.some((row) => getRowId(row) === selectedId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stillVisible) setSelectedId(null);
  }, [filtered, selectedId, getRowId]);

  const selectedItem = useMemo(
    () =>
      selectedId == null
        ? undefined
        : filtered.find((row) => getRowId(row) === selectedId),
    [filtered, selectedId, getRowId],
  );

  const handleAccept = () => {
    if (!selectedItem) return;
    onSelect(selectedItem);
    onClose();
  };

  // Navegación con flechas + Enter para confirmar
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = filtered.findIndex(
        (row) => getRowId(row) === selectedId,
      );
      const delta = e.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        currentIndex === -1
          ? 0
          : Math.min(Math.max(currentIndex + delta, 0), filtered.length - 1);
      setSelectedId(getRowId(filtered[nextIndex]));
    }

    if (e.key === "Enter" && selectedItem) {
      e.preventDefault();
      handleAccept();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col min-h-0" onKeyDown={handleKeyDown}>
        {/* Encabezado */}
        <div className="flex items-center justify-between bg-vblue-0 px-4 py-3 text-white shrink-0">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:cursor-pointer hover:scale-110"
            aria-label="Cerrar"
          >
            <X width="20px" height="20px" />
          </button>
        </div>

        {/* Buscador */}
        <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3 shrink-0">
          <Search width="18px" height="18px" className="text-vblue-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full min-w-0 rounded border border-vblue-0 px-2 py-1 text-base focus:outline-none focus:ring-1 focus:ring-vblue-0"
          />
        </div>

        {/* Tabla de resultados */}
        <div className="flex h-80 flex-col my-2 mx-4 border border-vblue-0 rounded-lg overflow-hidden">
          {filtered.length === 0 ? (
            <span className="p-4 text-center text-base text-black/60">
              Sin resultados
            </span>
          ) : (
            <Table
              columns={columns}
              data={filtered}
              getRowId={getRowId}
              onSelectRow={setSelectedId}
              selectedRow={selectedId}
            />
          )}
        </div>

        {/* Pie con botones */}
        <div className="flex justify-end gap-3 border-t border-black/10 px-4 py-3 shrink-0">
          <Button variant="danger" className="w-28 h-10" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="secondary"
            className="w-28 h-10"
            disabled={!selectedItem}
            onClick={handleAccept}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
