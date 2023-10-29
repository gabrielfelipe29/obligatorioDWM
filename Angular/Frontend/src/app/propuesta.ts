import { Actividad } from "./actividad";

export interface Propuesta {
    id: number;
    titulo: string;
    descripcion: string;
    actividades: Actividad[];
  }