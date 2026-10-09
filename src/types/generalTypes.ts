export interface AuthValue {
  user: string | null;
  loading: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<Response>;
  revalidate: () => Promise<boolean>;
}

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
}

export interface CacheRequest {
  function: string;
  paramters: Record<string, unknown>;
  user: string;
}

export interface Filtros {
  dateFrom: string;
  dateTo: string;
  user: string;
  funcion: string;
  status: number | "all";
}
