import type { InfiniteScrollResult } from "@/types/generalTypes";
import { useCallback, useEffect, useRef, useState } from "react";
import useApi from "./useApi";

const MAX_ROWS = 50;

const useInfiniteScroll = <T, R>(
  fun: string,
  params: Record<string, unknown>,
  select: (res: R) => { rows: T[]; cursor: number | null },
): InfiniteScrollResult<T> => {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const cursorRef = useRef<number | null>(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  // refs "vivos" de los argumentos: así loadMore NO depende de su identidad
  // (params/select llegan inline y cambian en cada render) y queda estable.
  const funRef = useRef(fun);
  const paramsRef = useRef(params);
  const selectRef = useRef(select);
  useEffect(() => {
    funRef.current = fun;
    paramsRef.current = params;
    selectRef.current = select;
  });

  const call = useApi();

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // el hook inyecta el cursor como idh; en la 1ra llamada va null (desde el inicio)
      const res = await call<R>(funRef.current, {
        ...paramsRef.current,
        idh: cursorRef.current,
      });
      const { rows: newRows, cursor } = selectRef.current(res);

      setRows((prev) => [...prev, ...newRows]);
      cursorRef.current = cursor;

      const done = cursor === null || newRows.length < MAX_ROWS;
      hasMoreRef.current = !done;
      setHasMore(!done);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [call]); // estable: solo cambia si cambia `call`

  const reset = useCallback(() => {
    cursorRef.current = null;
    hasMoreRef.current = true;
    loadingRef.current = false;
    setRows([]);
    setHasMore(true);
    setError(null);
  }, []);

  // cuando cambian los params "de verdad" (contenido, no identidad) o la función,
  // reseteo y traigo la primera página. También carga la pág. 1 en el mount.
  const paramsKey = JSON.stringify(params);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reset();
    void loadMore();
  }, [paramsKey, fun, reset, loadMore]);

  return { rows, loading, hasMore, error, loadMore, reset };
};

export default useInfiniteScroll;
