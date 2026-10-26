import type { ReactNode } from "react";

export interface AuthValue {
  user: string | null;
  loading: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<Response>;
  revalidate: () => Promise<boolean>;
}

//========================= LOG =======================

export interface LogHeaderRow {
  d: string;
  f: string;
  s: number;
  t: string;
  i: number;
  u: string;
}

export interface LogHeader {
  tce: number;
  te: number;
  tr: number;
  l: LogHeaderRow[];
  cursor: number | null;
}

export interface CacheRequest {
  function: string;
  paramters: Record<string, unknown>;
  user: string;
}

export interface Filtros {
  df: string;
  dt: string;
  us: string;
  fun: string;
  st: number | "all";
}

export interface InfiniteScrollResult<T> {
  rows: T[];
  loading: boolean;
  hasMore: boolean;
  error: Error | null;
  loadMore: () => Promise<void>;
  reset: () => void;
}

export interface LogFiltersResponse {
  fun: string[];
  st: string[];
  us: string[];
}

//========================= TABLE =======================
export type Column<T> = {
  header: string;
  colSpan: number;
  cell: (row: T) => ReactNode;
  cellClassName?: (row: T) => string;
  title?: (row: T) => string;
};
