import { afecciones } from "../data/afecciones";
import type { Causa, ParteCuerpo } from "../types/afecciones.types";

export function buscarDescripcion(parte: ParteCuerpo, causa: Causa) : string | undefined {
    if(parte === 0 || causa === 0) return undefined;
    const lista = afecciones[parte];
    const caso = lista.find(item => item.causa == causa);
    return caso?.descripcion;
}