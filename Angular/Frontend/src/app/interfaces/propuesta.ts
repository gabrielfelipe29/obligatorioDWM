import { Actividad } from "./actividad";

export interface Propuesta {
    _id: string;
    titulo: string;
    descripcion: string;
    actividades: Actividad[];
    imagen: string;
  }