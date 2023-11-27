import { ObjectId } from "mongodb";
import { Ranking } from "./ranking";

export enum EstadosActividad {
    SinJugar, 
    Jugando, 
    SeAcaboDeJugar
}
export class Actividad {
    public _id: ObjectId;
    public titulo: String;
    public descripcion: String;
    public ranking: Ranking;
    public imageLink?: String;
 
    public estadoActividad: EstadosActividad = EstadosActividad.SinJugar

    constructor(id: ObjectId, titulo: String, descripcion: String, imageLink?: String) {
        this.titulo = titulo;
        this.descripcion = descripcion;

        if (this.imageLink != undefined) {
            this.imageLink = imageLink;
        } else {
            this.imageLink = "";
        }
        this.ranking = new Ranking();
        this._id = id;
    }

    public meGusta() {
        this.ranking.incrementarMeGusta();
    }

    public noMeGusta() {
        this.ranking.incrementarNoMeGusta();
    }

    public meDaIgual() {
        this.ranking.incrementarMeDaIgual();
    }

    public obtenerResultados(): any[]{
        return [this.ranking.meGusta, this.ranking.noMeGusta, this.ranking.meDaIgual]
    }

    
}