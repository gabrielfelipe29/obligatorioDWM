import { salas } from "./routes/sala";
import { Propuesta } from "./propuesta";
import { admins } from "./routes/user"
import { EstadosActividad } from "./actividad";
import { obtenerVotosActividad, getRanking } from './metodos'

/* Para no dejar usuarios  en la sala si se desconectan en medio del juego, 
o para eviar usuarios repetidos por una reconexión de socket debemos registrar el socketID con la sala. 
Cuando se deconecta, se ve el socketID, por lo cual, lo usamos a nuestro favor, creamos un diccionario con 
socketID, como clave y como valor el codigo de la sala */


export var socketsJugadores: { [clave: string]: string } = {}
export var socketsAdmin: { [clave: string]: string } = {}



export async function mostrarActividad(mensaje: any, io: any) {


    let chanel = ""
    try {
        chanel = mensaje.codigoSala;

    } catch (error) {
        console.log("No esta el parametro especificado, no se puede hacer nada")
    }

    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in salas) {


        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala]
        sala.iniciarJuego()
        let propuesta = sala.propuesta
        let actividadObtenida = propuesta.devolerSigueinteActividad()

        var data = {}

        if (actividadObtenida) {
            actividadObtenida.estadoActividad = EstadosActividad.Jugando
            // Si es la última actividad le agregamos algo que le indique al front que es así
            data = {
                actividad: {
                    idActividad: actividadObtenida._id,
                    titulo: actividadObtenida.titulo,
                    descripcion: actividadObtenida.descripcion,
                    imagen: actividadObtenida.imageLink,
                }
            }
        }

        io.to(chanel).emit("actividad", data);
        console.log('Se recibio el pedido de iniciar juego:', mensaje);

        correrActividad(io, mensaje.codigoSala)

    } else {
        io.to(chanel).emit("errores", "El codigo de la sala es invalido");
    }
}

export async function obtenerResultadosActividad(datos: any, io: any, socket: any) {
    if (datos.codigo in salas) {
        let chanel = datos.codigo
        let sala = salas[datos.codigo]
        let propuesta = sala.propuesta
        let resultados: any[] = propuesta.obtenerResultadosActividad()
        let res = {
            resultado: {
                meGusta: resultados[0],
                noMeGusta: resultados[1],
                meDaIgual: resultados[2]
            }
        }
        io.to(chanel).emit(chanel, res)
    }
}

export async function join(datos: any, io: any, socket: any) {
    if (datos.codigo in salas) {
        let channel = datos.codigo
        let sala = salas[datos.codigo]
        if (sala.juegoIniciado && datos.rol == "player") {
            io.to(socket.id).emit("errores", "El juego ya ha sido iniciado, no pueden unirse jugadores una vez ha comenzado")
        } else {

            // El tipo o es un admin con juego iniciado, o es un admin o player sin el juego iniciado
            let propuesta: Propuesta = salas[datos.codigo].propuesta


            // En caso de que el admin 
            if (datos.rol == "admin" && datos.token !== undefined && datos.userID !== undefined) {

                let admin = admins[datos.userID]
                if (!admin.comprobarSalaActual(datos.codigo)) {
                    admin.unirseJuego(datos.codigo, socket.id)
                    console.log(`Admin se ha unido al canal ${channel}`);
                } else {
                    console.log("Se esta reconectando, debe devolverse la última pantalla")
                    socketsAdmin[socket.id] = datos.codigo
                    admin.socketID = socket.id
                    console.log(`Admin se volvio a unir al canal ${channel}`);
                }
            }

            if (datos.rol == "player" && datos.pseudonimo != undefined) {
                // Si la sala existe lo agregamos

                sala.agregarJugador(sala.obtenerIDUltimoJugador(), datos.pseudonimo, socket.id)
                socketsJugadores[socket._id] = sala._id;
                console.log(`Player unido al canal ${channel}`);

            }

            var data = {
                cantidadJugadores: salas[datos.codigo].getCantidadJugadores(),
                nombrePropuesta: propuesta.nombre,
                imagenPropuesta: propuesta.imagen,
                qrCodeSala: salas[datos.codigo].qrCode,
                listaJugadores: salas[datos.codigo].Jugadores

            }
            socket.join(channel);
            /* Ahora tenemos que avisar a todos los player existentes, que hay un player nuevo, mandando la data de nuevo*/
            io.to(channel).emit("esperaJuego", data)

        }
    } else {
        console.log("Error, no se pudo encontrar la sala")
        io.to(datos.codigo).emit("errores", "No se pude encontrar la sala")
    }

}

export async function obtenerRanking(mensaje: any, io: any, socket: any) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala) {

        let chanel = mensaje.codigoSala;

        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala]
        let resultadosPropuesta: Array<any> = await getRanking(mensaje.codigoSala)
        if (resultadosPropuesta == null) {
            io.to(chanel).emit("errores", "No se pudo armar el ranking, no hay actividades o ocurrio un error al buscarla")
        } else {
            var respuesta = {
                resultados: {

                    primero: {

                    },
                    segundo: {

                    },
                    tercero: {

                    }
                }

            }

            if (resultadosPropuesta.length >= 3) {
                respuesta.resultados.tercero = {
                    nombreActividad: resultadosPropuesta[2].titulo,
                    puntaje: resultadosPropuesta[2].ranking.meGusta //Los me gusta
                }
            }
            if (resultadosPropuesta.length >= 2) {
                respuesta.resultados.segundo = {
                    nombreActividad: resultadosPropuesta[1].titulo,
                    puntaje:resultadosPropuesta[1].ranking.meGusta//Los me gusta
                }
            }
            if (resultadosPropuesta.length >= 1) {
                respuesta.resultados.primero = {
                    nombreActividad: resultadosPropuesta[0].titulo,
                    puntaje: resultadosPropuesta[0].ranking.meGusta //Los me gusta

                }
            }
            io.to(chanel).emit("ranking", respuesta);
        }
    }
    console.log('Se pidio el ranking de un juego:', mensaje);
}

export async function terminarJuego(mensaje: any, io: any) {
    // Obtenemos la sala 
    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in mensaje) {
        let canal = mensaje.codigoSala

        let sala = salas[mensaje.codigoSala]

        for (let socketJugador in sala.Jugadores) {
            let socketDelUsuario = io.sockets.socketsJugadores[socketJugador];

            // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
            if (socketDelUsuario) {
                socketDelUsuario.leave(canal);
            }
            delete socketsJugadores[socketJugador]
        }
        sala.terminarJuego()


        // Ahora sacamos al administrador

        let admin = admins[sala.creador]
        let socketDelAdmin = io.sockets.socketsAdmin[admin.socketID];

        // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
        if (socketDelAdmin) {
            socketDelAdmin.leave(canal);
        }
        console.log( ` El admin saco a todos del juego ${canal} `);

    }
}

export async function salirJuego(chanel: any, socket: any) {
    if (chanel != null && socket.id in socketsJugadores) {
        let sala = salas[socket.id]
        sala.eliminarJugador(socket.id)
    }
    delete socketsJugadores[socket.id]
    socket.leave(chanel)
}

export async function desconectarse(socket: any, io: any) {

    // Revisamos si estaba en la lista de sockets, por lo cual era un player
    if (socket.id in socketsJugadores) {
        let idSala = socketsJugadores[socket.id]
        let sala = salas[idSala]
        let jugador = sala.obtenerJugador(socket.id)

        if (!sala.juegoIniciado && jugador != null) {
            let data = {
                aliasJugador: jugador.pseudonimo
            }
            io.to(idSala).emit("jugadorAbandonoSalaEsperaJuego", data)
        }
        sala.eliminarJugador(socket.id)
        delete socketsJugadores[socket.id]
    }

    // Revisamos la lista de admins, a ver si se desconecto por error el admin
    if (socket.id in socketsAdmin) {
        delete socketsAdmin[socket.id]
    }


}

async function correrActividad(io: any, idSala: string) {
    let time = 31000
    if (idSala in salas) {
        setTimeout(async () => {
            let sala = salas[idSala]
            let propuesta = sala.propuesta
            if (propuesta) {
                if (propuesta.actividadActual) {
                    let idActividad = propuesta.actividadActual._id

                    propuesta.actividadActual.estadoActividad = EstadosActividad.SeAcaboDeJugar
                    var ranking = await obtenerVotosActividad(idSala, idActividad)
                    if (ranking != "Error, no se pudo recuperar nada") {
                        console.log("Ultima actividad?" + propuesta.comprobarUltimaActividad())

                        let data = {
                            ultimaActividad: propuesta.comprobarUltimaActividad(),
                            resultado: {

                                meGusta: ranking.meGusta,
                                noMeGusta: ranking.noMeGusta,
                                meDaIgual: ranking.meDaIgual
                            }

                        }
                        console.log("Va a devolver resultados de la activdad")
                        io.to(idSala).emit("restultadoActividad", data)

                    } else {
                        io.to(idSala).emit("errores", "No existe la actividad, error")
                        console.log("Error al recuperar el ranking")
                    }
                } else {
                    io.to(idSala).emit("errores", "No existe la actividad, error")
                    console.log("No existe la actividad, error")
                }
            }
        },
            time)
    }
}