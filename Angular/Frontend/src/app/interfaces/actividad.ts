import { Ranking } from "./ranking";

export enum EstadosActividad {
    SinJugar, 
    Jugando, 
    SeAcaboDeJugar
}
export class Actividad {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public calificacion: Ranking;
    public imagen?: string;
 
    public estadoActividad: EstadosActividad = EstadosActividad.SinJugar

    constructor(id: number, titulo: string, descripcion: string, imagen?: string) {
        this.nombre = titulo;
        this.descripcion = descripcion;

        if (this.imagen != undefined) {
            this.imagen = imagen;
        } else {
            this.imagen = "";
        }
        this.calificacion = new Ranking();
        this.id = id;
    }

    public establecerResultado(meGusta: number , noMeGusta: number , meDaIgual: number ){
        this.calificacion.meGusta = meGusta
        this.calificacion.noMeGusta = noMeGusta
        this.calificacion.meDaIgual = meDaIgual
    }
    public obtenerResultados(): any[]{
        return [this.calificacion.meGusta, this.calificacion.noMeGusta, this.calificacion.meDaIgual]
    }

    
}