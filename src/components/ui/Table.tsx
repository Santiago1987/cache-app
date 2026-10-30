import { useEffect, useRef } from "react";
import { Ring180 } from "@/components/icons/Loading";
import type { Column } from "@/types/generalTypes";

type Props<T, K extends string | number = string | number> = {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => K;
  rowClassName?: (row: T) => string;
  onSelectRow?: (id: K) => void;
  selectedRow?: K | null;
  loadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  valtype?: "number" | "text";
};

export function Table<T, K extends string | number = string | number>({
  columns,
  data,
  getRowId,
  rowClassName,
  onSelectRow,
  selectedRow,
  loadMore,
  hasMore,
  loadingMore,
  valtype,
}: Props<T, K>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const isNumber = valtype === "number";

  const hasSubColumns = columns.some((col) => col.subColumns?.length);

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
    <>
      <div
        ref={containerRef}
        className="flex flex-1 w-full flex-col min-h-0 overflow-auto"
      >
        <div
          className={`sticky top-0 z-5 grid grid-cols-12 bg-vblue-0 text-white text-md w-full shrink-0 ${
            hasSubColumns ? "h-20" : "h-10"
          }`}
        >
          {columns.map((col, idx) => (
            <div
              key={idx}
              style={{
                gridColumn: `span ${col.colSpan} / span ${col.colSpan}`,
              }}
              className="flex h-full flex-col border-r last:border-r-0"
            >
              {col.subColumns?.length ? (
                <>
                  <div className="flex flex-1 items-center justify-center border-b border-white/40">
                    <label className="font-bold">{col.header}</label>
                  </div>
                  <div className="flex flex-1">
                    {col.subColumns.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex flex-1 items-center justify-center border-r border-white/40 last:border-r-0"
                      >
                        <label className="font-bold">{sub.header}</label>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <label className="font-bold">{col.header}</label>
                </div>
              )}
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
                  className={`flex min-w-0 h-full border-b border-r border-black/20 last:border-r-0 ${
                    col.subColumns?.length
                      ? ""
                      : `items-center px-1 ${
                          col.cellClassName?.(row) ?? ""
                        } ${isNumber ? "justify-end" : "justify-start"}`
                  }`}
                >
                  {col.subColumns?.length ? (
                    col.subColumns.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className={`flex flex-1 min-w-0 w-full items-center border-r border-black/20 px-1 last:border-r-0 ${
                          sub.cellClassName?.(row) ?? ""
                        } ${isNumber ? "justify-end" : "justify-start"}`}
                      >
                        <span className="truncate" title={sub.title?.(row)}>
                          {sub.cell(row)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="truncate" title={col.title?.(row)}>
                      {col.cell?.(row)}
                    </span>
                  )}
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
    </>
  );
}
