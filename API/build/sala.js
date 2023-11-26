"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sala = void 0;
const jugador_1 = require("./jugador");
class Sala {
    constructor(id, propuesta, creador) {
        this.Jugadores = [];
        this.juegoIniciado = false;
        this.qrCode = "";
        this.juegoTerminado = false;
        this.propuesta = propuesta;
        this.creador = creador;
        this.id = id;
    }
    setQRCode(qr) {
        this.qrCode = qr;
    }
    agregarJugador(id, pseudonimo, socketID) {
        this.Jugadores.push(new jugador_1.Jugador(id, pseudonimo, socketID));
    }
    eliminarJugador(socketID) {
        this.Jugadores = this.Jugadores.filter(elemento => elemento.socketID != socketID);
    }
    obtenerIDUltimoJugador() {
        const idUltimoJugador = this.Jugadores.length;
        return idUltimoJugador;
    }
    iniciarJuego() {
        this.juegoIniciado = true;
    }
    terminarJuego() {
        this.juegoIniciado = false;
        this.juegoTerminado = true;
        this.Jugadores = [];
        this.creador = "";
    }
    getCantidadJugadores() {
        return Object.keys(this.Jugadores).length;
    }
    obtenerJugador(jugadorSocketID) {
        for (let jugador of this.Jugadores) {
            if (jugador.socketID == jugadorSocketID) {
                return jugador;
            }
        }
        return null;
    }
}
exports.Sala = Sala;
//# sourceMappingURL=sala.js.map