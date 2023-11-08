import { Sala } from "./sala";
import { Jugador } from "./jugador";
import { Propuesta } from "./propuesta";
import { admins } from "./routes/user"

/* Para no dejar usuarios  en la sala si se desconectan en medio del juego, 
o para eviar usuarios repetidos por una reconexión de socket debemos registrar el socketID con la sala. 
Cuando se deconecta, se ve el socketID, por lo cual, lo usamos a nuestro favor, creamos un diccionario con 
socketID, como clave y como valor el codigo de la sala */
var salas: { [clave: string]: Sala } = {};

export var sockets: { [clave: string]: number } = {}

export function mostrarActividad(mensaje: any, io: any) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala) {

        let chanel = mensaje.codigoSala;

        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala]
        let propuesta = sala.propuesta
        let actividadObtenida = propuesta.devolerSigueinteActividad()

        let data = {
            asunto: "actividad",
            actividad: {
                titulo: actividadObtenida?.titulo,
                descripcion: actividadObtenida?.descripcion,
                imagen: actividadObtenida?.imageLink

            }
        }

        io.to(chanel).emit(chanel, data);
        correrActividad(io, mensaje.codigoSala)

    }
    console.log('Se recibio el pedido de otra actividad:', mensaje);
}

export function iniciarJuego(mensaje: any, io: any, socket: any) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in salas) {

        let chanel = mensaje.codigoSala;

        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala]
        sala.iniciarJuego()
        let propuesta = sala.propuesta
        let actividadObtenida = propuesta.devolerSigueinteActividad()

        let data = {
            asunto: "actividad",
            actividad: {
                titulo: actividadObtenida?.titulo,
                descripcion: actividadObtenida?.descripcion,
                imagen: actividadObtenida?.imageLink

            }
        }

        io.to(chanel).emit(chanel, data);
        correrActividad(io, mensaje.codigoSala)

    }
    console.log('Se recibio el pedido de iniciar juego:', mensaje);
}

export function join(datos: any, io: any, socket: any) {
    if (datos.codigo in salas) {
        let channel = datos.codigo
        let sala = salas[datos.codigo]
        if (sala.juegoIniciado) {
            io.to(socket.id).emit("errores", "El juego ya ha sido iniciado, no pueden unirse jugadores una vez ha comenzado")
        }


        if (datos.rol == "admin" && datos.token !== undefined && datos.userID !== undefined) {
            let admin = admins[datos.userID]
            admin.unirseJuego(datos.codigo, socket.id)
        }

        if (datos.rol == "player" && datos.pseudonomio !== undefined) {
            // Si la sala existe lo agregamos

            let newPlayer = new Jugador(sala.obtenerIDUltimoJugador(), datos.pseudonomio, socket.id)
            sala.agregarJugador(newPlayer)
            sockets[socket.id] = sala.id;
        }


        socket.join(channel);
        console.log(`El cliente se unió al canal ${channel}`);
        let propuesta: Propuesta = salas[datos.codigo].propuesta
        let data = {
            asunto: "esperaJuego",
            cantidadJugadores: salas[datos.codigo].getCantidadJugadores(),
            nombrePropuesta: propuesta.nombre,
            imagenPropuesta: propuesta.imagen
        }
        /* Ahora tenemos que avisar a todos los player existentes, que hay un player nuevo, mandando la data de nuevo*/
        io.to(channel).emit(channel, data)
    } else {
        io.to("errores").emit("errores", "No se pude encontrar la sala")
    }

}

export function obtenerRanking(mensaje: any, io: any, socket: any) {
    if (mensaje.adminID !== undefined && mensaje.codigoSala) {

        let chanel = mensaje.codigoSala;

        // Obtenemos la sala 
        let sala = salas[mensaje.codigoSala]
        let propuesta = sala.propuesta
        let ranking = propuesta.obtenerPodio()
        let respuesta = {
            primero: {
                actividad: ranking[0],
                puntaje: ranking[1],
            },
            segundo: {
                actividad: ranking[2],
                puntaje: ranking[3],
            },
            tercero: {
                actividad: ranking[4],
                puntaje: ranking[5],
            }
        }

        io.to(chanel).emit(chanel, respuesta);

    }
    console.log('Se pidio el ranking de un juego:', mensaje);
}

export function terminarJuego(mensaje: any, io: any) {
    // Obtenemos la sala 
    if (mensaje.adminID !== undefined && mensaje.codigoSala && mensaje.codigoSala in mensaje) {
        let canal = mensaje.codigoSala

        let sala = salas[mensaje.codigoSala]

        for (let socketJugador in sala.Jugadores) {
            let socketDelUsuario = io.sockets.sockets[socketJugador];

            // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
            if (socketDelUsuario) {
                socketDelUsuario.leave(canal);
            }
            delete sockets[socketJugador]
        }

        // Ahora sacamos al administrador

        let admin = admins[sala.creador]
        let socketDelAdmin = io.sockets.sockets[admin.socketID];

        // Asegúrate de que el socket del usuario existe antes de forzar la desconexión
        if (socketDelAdmin) {
            socketDelAdmin.leave(canal);
        }
        console.log(`El admin saco a todos del juego ${canal}`);

    }
}

export function salirJuego(chanel: any, socket: any) {
    if (chanel != null && socket.id in sockets) {
        let sala = salas[socket.id]
        sala.eliminarJugador(socket.id)
    }
    delete sockets[socket.id]
    socket.leave(chanel)
}

export function desconectarse(socket: any) {
    // Revisamos si estaba en la lista de sockets, por lo cual era un player
    if (socket.id in sockets) {
        let idSala = sockets[socket.id]
        let sala = salas[idSala]
        sala.eliminarJugador(socket.id)
        delete sockets[socket.id]
    }
}

async function correrActividad(io: any, idSala: number) {
    let time = 30500
    if (idSala in salas) {
        let sala = salas[idSala]
        let propuesta = sala.propuesta
        let resultadosActividad: number[] | undefined = propuesta.obtenerResultadosActividad()
        if (resultadosActividad != undefined) {
            let data = {
                asunto: "resultadosActividad",
                meGusta: resultadosActividad[0],
                noMeGusta: resultadosActividad[1],
                meDaIgual: resultadosActividad[2]
            }
            setTimeout(() => {
                io.to(idSala).emit(idSala, data)
            },
                time)
        }
    }


}