import { Actividad, EstadosActividad } from "./actividad";
export class Propuesta {
    public id: number;
    public creatorId: String;
    public actividades: Actividad[];
    public proximaActividad: number = 0;
    public nombre: string;
    public imagen: string;
    public actividadActual: Actividad | undefined;

    constructor(nombre:string, creatorId: String, id: number, actividades: Actividad[], rutaImg: string) {
        this.creatorId = creatorId;
        this.id = id;
        this.actividades = actividades;
        this.nombre = nombre
        this.imagen = rutaImg
    }

    public devolerSigueinteActividad(){
        if (this.proximaActividad < this.actividades.length) {
            let actividad = this.actividades[this.proximaActividad]
            this.proximaActividad++
            this.actividadActual = actividad
            return actividad
        } 
    }

    public obtenerPodio(){
        // Esto es solo una manera, pero me parece que no es la mejor en realidad
        let primero;
        let calificacionPrimero = 0
        let segundo; 
        let calificacionSegundo = 0
        let tercero; 
        let calificacionTercero = 0
        for( let actividad of this.actividades) {
            let puntaje = actividad.calificacion
            if (puntaje.meGusta > calificacionPrimero) {
                primero = actividad
                calificacionPrimero = puntaje.meGusta
            } else if (puntaje.meGusta > calificacionSegundo) {
                segundo = actividad
                calificacionSegundo = puntaje.meGusta

            } else if (puntaje.meGusta > calificacionTercero) {
                tercero = actividad
                calificacionTercero = puntaje.meGusta
            }
        }

        return [primero, calificacionPrimero, segundo,calificacionSegundo, tercero, calificacionTercero,]

    }

    public obtenerResultadosActividad(): any[]{
        let res: any[] = []
        if (this.actividadActual != undefined) {
            res = this.actividadActual.obtenerResultados()
            this.actividadActual.estadoActividad = EstadosActividad.SeAcaboDeJugar
        }
        return res
    }


}
