"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Propuesta = void 0;
const actividad_1 = require("./actividad");
class Propuesta {
    constructor(nombre, creatorId, id, actividades, rutaImg) {
        this.proximaActividad = 0;
        this.creatorId = creatorId;
        this._id = id;
        this.actividades = actividades;
        this.nombre = nombre;
        this.imagen = rutaImg;
    }
    devolerSigueinteActividad() {
        if (this.proximaActividad <= this.actividades.length) {
            let actividad = this.actividades[this.proximaActividad];
            this.proximaActividad++;
            this.actividadActual = actividad;
            return actividad;
        }
    }
    comprobarUltimaActividad() {
        let esUltima = this.proximaActividad == this.actividades.length;
        return esUltima;
    }
    obtenerResultadosActividad() {
        let res = [];
        if (this.actividadActual != undefined) {
            res = this.actividadActual.obtenerResultados();
            this.actividadActual.estadoActividad = actividad_1.EstadosActividad.SeAcaboDeJugar;
        }
        return res;
    }
}
exports.Propuesta = Propuesta;
//# sourceMappingURL=propuesta.js.map