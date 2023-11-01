import { Schema, model, Document,Types } from 'mongoose';
import { Actividad,ActividadSchema } from "./actividad";
export class Propuesta {
    public id: number;
    public creatorId: String;
    public actividades: Actividad[];

    constructor(creatorId: String, id: number, actividades: Actividad[]) {
        this.creatorId = creatorId;
        this.id = id;
        this.actividades = actividades;
    }

}
