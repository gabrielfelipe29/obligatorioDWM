class Propuesta {
    public id: number;
    public actividades: Actividad[];

    constructor(id: number, actividades: Actividad[]) {
        this.id = id;
        this.actividades = actividades;
    }

}