export interface Rubros {
  id: string;
  description: string;
}

export interface TopeRow {
  id: string;
  description: string;
  tope: number | "";
}

export interface Topeecom {
  date: string;
  topeDefault: number | string;
  list: TopeRow[];
}
