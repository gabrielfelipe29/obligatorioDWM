"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
class Administrador {
    constructor(id, contraseña) {
        // Sala del juego creado recientemente
        this.salaID = "";
        this.socketID = "";
        this.contraseña = contraseña;
        this.id = id;
    }
    unirseJuego(salaID, idSocket) {
        this.salaID = salaID;
        this.socketID = idSocket;
    }
    comprobarSalaActual(salaIDRecibida) {
        return this.salaID == salaIDRecibida;
    }
}
exports.Administrador = Administrador;
//# sourceMappingURL=administrador.js.map