import { Actividad } from "./actividad";

export interface Propuesta {
    id: number;
    nombre: string;
    actividades: Actividad[]
  }