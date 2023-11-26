"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectarse = exports.salirJuego = exports.terminarJuego = exports.obtenerRanking = exports.join = exports.obtenerResultadosActividad = exports.mostrarActividad = exports.socketsAdmin = exports.socketsJugadores = void 0;
const sala_1 = require("./routes/sala");
const user_1 = require("./routes/user");
const actividad_1 = require("./actividad");
const metodos_1 = require("./metodos");
/* Para no dejar usuarios  en la sala si se desconectan en medio del juego,
o para eviar usuarios repetidos por una reconexión de socket debemos registrar el socketID con la sala.
Cuando se deconecta, se ve el socketID, por lo cual, lo usamos a nuestro favor, creamos un diccionario con
socketID, como clave y como valor el codigo de la sala */
exports.socketsJugadores = {};
exports.socketsAdmin = {};
function mostrarActividad(mensaje, io) {
    return __awaiter(this, void 0, void 0, function* () {
        let chanel = "";
        try {
            chanel = mensaje.codigoSala;
        }
        catch (error) {
            console.log("No esta el parametro especificado, no se puede hacer nada");
        }
        if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in sala_1.salas) {
            // Obtenemos la sala 
            let sala = sala_1.salas[mensaje.codigoSala];
            sala.iniciarJuego();
            let propuesta = sala.propuesta;
            let actividadObtenida = propuesta.devolerSigueinteActividad();
            var data = {};
            if (actividadObtenida) {
                actividadObtenida.estadoActividad = actividad_1.EstadosActividad.Jugando;
                // Si es la última actividad le agregamos algo que le indique al front que es así
                data = {
                    actividad: {
                        idActividad: actividadObtenida._id,
                        titulo: actividadObtenida.titulo,
                        descripcion: actividadObtenida.descripcion,
                        imagen: actividadObtenida.imageLink,
                    }
                };
            }
            io.to(chanel).emit("actividad", data);
            console.log('Se recibio el pedido de iniciar juego:', mensaje);
            correrActividad(io, mensaje.codigoSala);
        }
        else {
            io.to(chanel).emit("errores", "El codigo de la sala es invalido");
        }
    });
}
exports.mostrarActividad = mostrarActividad;
function obtenerResultadosActividad(datos, io, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        if (datos.codigo in sala_1.salas) {
            let chanel = datos.codigo;
            let sala = sala_1.salas[datos.codigo];
            let propuesta = sala.propuesta;
            let resultados = propuesta.obtenerResultadosActividad();
            let res = {
                resultado: {
                    meGusta: resultados[0],
                    noMeGusta: resultados[1],
                    meDaIgual: resultados[2]
                }
            };
            io.to(chanel).emit(chanel, res);
        }
    });
}
exports.obtenerResultadosActividad = obtenerResultadosActividad;
function join(datos, io, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        if (datos.codigo in sala_1.salas) {
            let channel = datos.codigo;
            let sala = sala_1.salas[datos.codigo];
            if (sala.juegoIniciado && datos.rol == "player") {
                io.to(socket.id).emit("errores", "El juego ya ha sido iniciado, no pueden unirse jugadores una vez ha comenzado");
            }
            else {
                // El tipo o es un admin con juego iniciado, o es un admin o player sin el juego iniciado
                let propuesta = sala_1.salas[datos.codigo].propuesta;
                // En caso de que el admin 
                if (datos.rol == "admin" && datos.token !== undefined && datos.userID !== undefined) {
                    let admin = user_1.admins[datos.userID];
                    if (!admin.comprobarSalaActual(datos.codigo)) {
                        admin.unirseJuego(datos.codigo, socket.id);
                        console.log(`Admin se ha unido al canal ${channel}`);
                    }
                    else {
                        console.log("Se esta reconectando, debe devolverse la última pantalla");
                        exports.socketsAdmin[socket.id] = datos.codigo;
                        admin.socketID = socket.id;
                        console.log(`Admin se volvio a unir al canal ${channel}`);
                    }
                }
                if (datos.rol == "player" && datos.pseudonimo != undefined) {
                    // Si la sala existe lo agregamos
                    sala.agregarJugador(sala.obtenerIDUltimoJugador(), datos.pseudonimo, socket.id);
                    exports.socketsJugadores[socket.id] = sala.id;
                    console.log(`Player unido al canal ${channel}`);
                }
                var data = {
                    cantidadJugadores: sala_1.salas[datos.codigo].getCantidadJugadores(),
                    nombrePropuesta: propuesta.nombre,
                    imagenPropuesta: propuesta.imagen,
                    qrCodeSala: sala_1.salas[datos.codigo].qrCode,
                    listaJugadores: sala_1.salas[datos.codigo].Jugadores
                };
                socket.join(channel);
                /* Ahora tenemos que avisar a todos los player existentes, que hay un player nuevo, mandando la data de nuevo*/
                io.to(channel).emit("esperaJuego", data);
            }
        }
        else {
            console.log("Error, no se pudo encontrar la sala");
            io.to(datos.codigo).emit("errores", "No se pude encontrar la sala");
        }
    });
}
exports.join = join;
function obtenerRanking(mensaje, io, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mensaje.adminID !== undefined && mensaje.codigoSala) {
            let chanel = mensaje.codigoSala;
            // Obtenemos la sala 
            let sala = sala_1.salas[mensaje.codigoSala];
            let resultadosPropuesta = yield (0, metodos_1.getRanking)(mensaje.codigoSala);
            if (resultadosPropuesta == null) {
                io.to(chanel).emit("errores", "No se pudo armar el ranking, no hay actividades o ocurrio un error al buscarla");
            }
            else {
                var respuesta = {
                    resultados: {
                        primero: {},
                        segundo: {},
                        tercero: {}
                    }
                };
                if (resultadosPropuesta.length >= 3) {
                    respuesta.resultados.tercero = {
                        nombreActividad: resultadosPropuesta[2].titulo,
                        puntaje: resultadosPropuesta[2].ranking.meGusta //Los me gusta
                    };
                }
                if (resultadosPropuesta.length >= 2) {
                    respuesta.resultados.segundo = {
                        nombreActividad: resultadosPropuesta[1].titulo,
                        puntaje: resultadosPropuesta[1].ranking.meGusta //Los me gusta
                    };
                }
                if (resultadosPropuesta.length >= 1) {
                    respuesta.resultados.primero = {
                        nombreActividad: resultadosPropuesta[0].titulo,
                        puntaje: resultadosPropuesta[0].ranking.meGusta //Los me gusta
                    };
                }
                io.to(chanel).emit("ranking", respuesta);
            }
        }
        console.log('Se pidio el ranking de un juego:', mensaje);
    });
}
exports.obtenerRanking = obtenerRanking;
function terminarJuego(mensaje, io) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtenemos la sala 
        if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in mensaje) {
            let canal = mensaje.codigoSala;
            let sala = sala_1.salas[mensaje.codigoSala];
            for (let socketJugador in sala.Jugadores) {
                let socketDelUsuario = io.sockets.socketsJugadores[socketJugador];
                // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
                if (socketDelUsuario) {
                    socketDelUsuario.leave(canal);
                }
                delete exports.socketsJugadores[socketJugador];
            }
            sala.terminarJuego();
            // Ahora sacamos al administrador
            let admin = user_1.admins[sala.creador];
            let socketDelAdmin = io.sockets.socketsAdmin[admin.socketID];
            // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
            if (socketDelAdmin) {
                socketDelAdmin.leave(canal);
            }
            console.log(`El admin saco a todos del juego ${canal}`);
        }
    });
}
exports.terminarJuego = terminarJuego;
function salirJuego(chanel, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chanel != null && socket.id in exports.socketsJugadores) {
            let sala = sala_1.salas[socket.id];
            sala.eliminarJugador(socket.id);
        }
        delete exports.socketsJugadores[socket.id];
        socket.leave(chanel);
    });
}
exports.salirJuego = salirJuego;
function desconectarse(socket, io) {
    return __awaiter(this, void 0, void 0, function* () {
        // Revisamos si estaba en la lista de sockets, por lo cual era un player
        if (socket.id in exports.socketsJugadores) {
            let idSala = exports.socketsJugadores[socket.id];
            let sala = sala_1.salas[idSala];
            let jugador = sala.obtenerJugador(socket.id);
            if (!sala.juegoIniciado && jugador != null) {
                let data = {
                    aliasJugador: jugador.pseudonimo
                };
                io.to(idSala).emit("jugadorAbandonoSalaEsperaJuego", data);
            }
            sala.eliminarJugador(socket.id);
            delete exports.socketsJugadores[socket.id];
        }
        // Revisamos la lista de admins, a ver si se desconecto por error el admin
        if (socket.id in exports.socketsAdmin) {
            delete exports.socketsAdmin[socket.id];
        }
    });
}
exports.desconectarse = desconectarse;
function correrActividad(io, idSala) {
    return __awaiter(this, void 0, void 0, function* () {
        /* let time = 31000 */
        let time = 11000;
        if (idSala in sala_1.salas) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                let sala = sala_1.salas[idSala];
                let propuesta = sala.propuesta;
                if (propuesta) {
                    if (propuesta.actividadActual) {
                        let idActividad = propuesta.actividadActual._id;
                        propuesta.actividadActual.estadoActividad = actividad_1.EstadosActividad.SeAcaboDeJugar;
                        var ranking = yield (0, metodos_1.obtenerVotosActividad)(idSala, idActividad);
                        if (ranking != "Error, no se pudo recuperar nada") {
                            console.log("Ultima actividad?" + propuesta.comprobarUltimaActividad());
                            let data = {
                                ultimaActividad: propuesta.comprobarUltimaActividad(),
                                resultado: {
                                    meGusta: ranking.meGusta,
                                    noMeGusta: ranking.noMeGusta,
                                    meDaIgual: ranking.meDaIgual
                                }
                            };
                            console.log("Va a devolver resultados de la activdad");
                            io.to(idSala).emit("restultadoActividad", data);
                        }
                        else {
                            io.to(idSala).emit("errores", "No existe la actividad, error");
                            console.log("Error al recuperar el ranking");
                        }
                    }
                    else {
                        io.to(idSala).emit("errores", "No existe la actividad, error");
                        console.log("No existe la actividad, error");
                    }
                }
            }), time);
        }
    });
}
//# sourceMappingURL=sockets.js.map