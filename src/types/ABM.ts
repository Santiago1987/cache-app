export interface Rubros {
  id: string;
  description: string;
}

export interface TopeRow {
  rubro: Rubros;
  tope: number | "";
}

export interface Topeecom {
  fecha: string;
  tope: number | string;
  list: TopeRow[];
}
