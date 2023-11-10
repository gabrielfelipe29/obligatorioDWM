import { Ranking } from "./ranking";
export class Actividad {
    public id: number;
    public titulo: String;
    public descripcion: String;
    public calificacion: Ranking;
    public imageLink?: String;
    
    constructor(id: number, titulo: String, descripcion: String, imageLink?: String) {
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

    public obtenerResultados(){
        return [this.calificacion.meGusta, this.calificacion.noMeGusta, this.calificacion.meDaIgual]
    }

    
}