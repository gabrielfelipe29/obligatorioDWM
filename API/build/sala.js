"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sala = void 0;
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
exports.Sala = Sala;
//# sourceMappingURL=sala.js.map