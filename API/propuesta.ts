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

    

    public comprobarUltimaActividad(){
        let esUltima = this.proximaActividad == this.actividades.length 
        return esUltima
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
