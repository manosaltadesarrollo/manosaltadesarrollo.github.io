
export type ParteCuerpo = 0 | "hombro" | "codo" | "muñeca" | "mano";

export type Causa = 0 | 1 | 2;

export interface Afeccion {
  causa: Exclude<Causa , 0>;
  descripcion: string;
}

export type Afecciones = {
  [P in Exclude<ParteCuerpo, 0>]: Afeccion[];
};