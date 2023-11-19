import { Actividad } from "./actividad";

export interface Propuesta {
    id: string;
    titulo: string;
    descripcion: string;
    actividades: Actividad[];
    imagen: string;
  }