import { Ranking } from "./ranking";

export enum EstadosActividad {
    SinJugar, 
    Jugando, 
    SeAcaboDeJugar
}
export class Actividad {
    public _id: String;
    public titulo: string;
    public descripcion: string;
    public ranking: Ranking;
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
        this.ranking = new Ranking();
        this._id = id;
    }

    public establecerResultado(meGusta: number , noMeGusta: number , meDaIgual: number ){
        this.ranking.meGusta = meGusta
        this.ranking.noMeGusta = noMeGusta
        this.ranking.meDaIgual = meDaIgual
    }
    public obtenerResultados(): object{
        return {meGusta: this.ranking.meGusta, noMeGusta: this.ranking.noMeGusta, meDaIgual: this.ranking.meDaIgual}
    }



    
}