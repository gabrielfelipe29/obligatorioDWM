"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actividad = exports.EstadosActividad = void 0;
const ranking_1 = require("./ranking");
var EstadosActividad;
(function (EstadosActividad) {
    EstadosActividad[EstadosActividad["SinJugar"] = 0] = "SinJugar";
    EstadosActividad[EstadosActividad["Jugando"] = 1] = "Jugando";
    EstadosActividad[EstadosActividad["SeAcaboDeJugar"] = 2] = "SeAcaboDeJugar";
})(EstadosActividad || (exports.EstadosActividad = EstadosActividad = {}));
class Actividad {
    constructor(id, titulo, descripcion, imageLink) {
        this.estadoActividad = EstadosActividad.SinJugar;
        this.titulo = titulo;
        this.descripcion = descripcion;
        if (this.imageLink != undefined) {
            this.imageLink = imageLink;
        }
        else {
            this.imageLink = "";
        }
        this.calificacion = new ranking_1.Ranking();
        this.id = id;
    }
    meGusta() {
        this.calificacion.incrementarMeGusta();
    }
    noMeGusta() {
        this.calificacion.incrementarNoMeGusta();
    }
    meDaIgual() {
        this.calificacion.incrementarMeDaIgual();
    }
    obtenerResultados() {
        return [this.calificacion.meGusta, this.calificacion.noMeGusta, this.calificacion.meDaIgual];
    }
}
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map