export interface Rubros {
  id: string;
  description: string;
}

export interface TopeRow {
  rubro: Rubros;
  tope: number | "";
}

export interface Topeecom {
  date: string;
  topeDefault: number | string;
  list: TopeRow[];
}
