import { Ranking } from "./ranking";
import { DomSanitizer } from '@angular/platform-browser';

export enum EstadosActividad {
    SinJugar,
    Jugando,
    SeAcaboDeJugar
}
export class Actividad {
    public _id: string;
    public titulo: string;
    public descripcion: string;
    public ranking: Ranking;
    public imagen: any;
    private sanitizer: DomSanitizer;

    public estadoActividad: EstadosActividad = EstadosActividad.SinJugar

    constructor(_id: string, titulo: string, descripcion: string, imagen: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        //this.imagen = imagen;
        try {
            this.imagen = this.sanitizer.bypassSecurityTrustUrl(imagen);
        } catch (error) {
            this.imagen = imagen;
        }
        this.ranking = new Ranking();
        this._id = _id;
    }

    public establecerResultado(meGusta: number, noMeGusta: number, meDaIgual: number) {
        this.ranking.meGusta = meGusta
        this.ranking.noMeGusta = noMeGusta
        this.ranking.meDaIgual = meDaIgual
    }
    public obtenerResultados(): object {
        return { meGusta: this.ranking.meGusta, noMeGusta: this.ranking.noMeGusta, meDaIgual: this.ranking.meDaIgual }
    }




}