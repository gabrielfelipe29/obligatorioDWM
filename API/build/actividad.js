"use strict";
class Actividad {
    constructor(id, titulo, descripcion, imageLink) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        if (this.imageLink != undefined) {
            this.imageLink = imageLink;
        }
        else {
            this.imageLink = "";
        }
        this.calificacion = new Ranking();
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
}
//# sourceMappingURL=actividad.js.map