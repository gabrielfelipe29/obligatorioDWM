import { Ranking } from "./ranking";

export enum EstadosActividad {
    SinJugar, 
    Jugando, 
    SeAcaboDeJugar
}
export class Actividad {
    public id: String;
    public titulo: String;
    public descripcion: String;
    public calificacion: Ranking;
    public imageLink?: String;
 
    public estadoActividad: EstadosActividad = EstadosActividad.SinJugar

    constructor(id: string, titulo: String, descripcion: String, imageLink?: String) {
        this.titulo = titulo;
        this.descripcion = descripcion;

        if (this.imageLink != undefined) {
            this.imageLink = imageLink;
        } else {
            this.imageLink = "";
        }
        this.calificacion = new Ranking();
        this.id = id;
    }

    public meGusta() {
        this.calificacion.incrementarMeGusta();
    }

    public noMeGusta() {
        this.calificacion.incrementarNoMeGusta();
    }

    public meDaIgual() {
        this.calificacion.incrementarMeDaIgual();
    }

    public obtenerResultados(): any[]{
        return [this.calificacion.meGusta, this.calificacion.noMeGusta, this.calificacion.meDaIgual]
    }

    
}