"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
class Administrador {
    constructor(id, contraseña) {
        this.juegoActual = "";
        this.contraseña = contraseña;
        this.id = id;
    }
    login() {
        //verificar si existe el usuario en la base de datos
    }
    jugar(idJuego) {
        this.juegoActual = idJuego;
    }
}
exports.Administrador = Administrador;
