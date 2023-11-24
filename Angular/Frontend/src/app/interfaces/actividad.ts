import { Ranking } from "./ranking";

export enum EstadosActividad {
    SinJugar, 
    Jugando, 
    SeAcaboDeJugar
}
export class Actividad {
    public _id: string;
    public titulo: string;
    public descripcion: string;
    public calificacion: Ranking;
    public imagen?: string;


    public estadoActividad: EstadosActividad = EstadosActividad.SinJugar

    constructor(id: string, titulo: string, descripcion: string, imagen?: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        

        if (this.imagen != undefined) {
            this.imagen = imagen;
        } else {
            this.imagen = "";
        }
        this.calificacion = new Ranking();
        this._id = id;
    }

    public establecerResultado(meGusta: number , noMeGusta: number , meDaIgual: number ){
        this.calificacion.meGusta = meGusta
        this.calificacion.noMeGusta = noMeGusta
        this.calificacion.meDaIgual = meDaIgual
    }
    public obtenerResultados(): object{
        return {meGusta: this.calificacion.meGusta, noMeGusta: this.calificacion.noMeGusta, meDaIgual: this.calificacion.meDaIgual}
    }



    
}