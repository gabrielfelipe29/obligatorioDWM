"use strict";
class Sala {
    constructor(id, propuesta, link, creador) {
        this.propuesta = propuesta;
        this.creador = creador;
        this.Jugadores = [];
        this.id = id;
    }
    agregarJugador(jugador) {
        this.Jugadores.push(jugador);
    }
}
//# sourceMappingURL=sala.js.map