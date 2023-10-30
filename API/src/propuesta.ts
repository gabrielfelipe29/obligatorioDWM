<<<<<<< HEAD
import { Actividad } from "./actividad";
export class Propuesta {
    public id: number;
    public creatorId: String;
    public actividades: Actividad[];

    constructor(creatorId: String, id: number, actividades: Actividad[]) {
        this.creatorId = creatorId;
        this.id = id;
        this.actividades = actividades;
    }

=======
import { Actividad } from "./actividad";
export class Propuesta {
    public id: number;
    public creatorId: String;
    public actividades: Actividad[];

    constructor(creatorId: String, id: number, actividades: Actividad[]) {
        this.creatorId = creatorId;
        this.id = id;
        this.actividades = actividades;
    }

>>>>>>> b40f81b840f2ad8dbca8a9d7fe72966e69af7b3c
}