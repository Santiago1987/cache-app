import { useEffect, useRef } from "react";
import { BlocksWaveSpinner, Ring180 } from "@/components/icons/Loading";
import type { Column } from "@/types/generalTypes";

type Props<T, K extends string | number = string | number> = {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => K;
  rowClassName?: (row: T) => string;
  onSelectRow?: (id: K) => void;
  selectedRow?: K | null;
  loading?: boolean;
  loadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
};

export function Table<T, K extends string | number = string | number>({
  columns,
  data,
  getRowId,
  rowClassName,
  onSelectRow,
  selectedRow,
  loading,
  loadMore,
  hasMore,
  loadingMore,
}: Props<T, K>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = containerRef.current;

    if (!sentinel || !root || !loadMore) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      { root, rootMargin: "200px" },
    );

    obs.observe(sentinel);

    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <section className="relative flex flex-col h-full w-full border border-black rounded-lg overflow-hidden">
      {loading ? (
        <div className="absolute w-full h-full z-10 inset-0 flex items-center justify-center bg-black/50">
          <BlocksWaveSpinner
            width={80}
            height={80}
            speed={0.75}
            stroke="#59d6c6"
            fill="#59d6c6"
          />
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="flex flex-1 flex-col min-h-0 overflow-auto"
      >
        <div className="sticky top-0 z-5 grid grid-cols-12 bg-vblue-0 text-white text-md w-full h-10 shrink-0">
          {columns.map((col, idx) => (
            <div
              key={idx}
              style={{
                gridColumn: `span ${col.colSpan} / span ${col.colSpan}`,
              }}
              className="flex h-full items-center justify-center border-r last:border-r-0"
            >
              <label className="font-bold">{col.header}</label>
            </div>
          ))}
        </div>

        {data.map((row) => {
          const id = getRowId(row);
          const selected = selectedRow != null && id === selectedRow;
          return (
            <div
              key={id}
              onClick={() => onSelectRow?.(id)}
              className={`grid grid-cols-12 text-xs w-full h-10 shrink-0 ${
                onSelectRow ? "hover:cursor-pointer hover:bg-gray-400/50" : ""
              } ${selected ? "bg-vgreen-0 text-white" : "bg-white"} ${
                rowClassName?.(row) ?? ""
              }`}
            >
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  style={{
                    gridColumn: `span ${col.colSpan} / span ${col.colSpan}`,
                  }}
                  className={`flex min-w-0 h-full items-center justify-center border-b border-black px-1 ${
                    col.cellClassName?.(row) ?? ""
                  }`}
                >
                  <span className="truncate" title={col.title?.(row)}>
                    {col.cell(row)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}

        {loadingMore && (
          <span className="flex flex-row items-center w-full text-base p-2">
            <Ring180 width="16px" height="16px" />
            Cargando...
          </span>
        )}
        {hasMore === false && (
          <span className="text-base p-2 mx-auto">No hay mas registros</span>
        )}
        {/*Elemento centinela */}
        <div ref={sentinelRef} style={{ height: 1 }} />
      </div>
    </section>
  );
}
