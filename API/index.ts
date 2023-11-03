'use strict';
import express, { Request, Response } from 'express';
import { createServer } from "http";
import { Jugador } from './jugador';
import { Administrador } from './administrador';
import { Admin } from 'mongodb';
import { Sala } from './sala';
import { Propuesta } from './propuesta';

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
    "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority";

export var db: any = null;
const client = new MongoClient(uri);

var secret = "secreto";
var jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';


/* Configuración del server  */
const app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}

app.use(express.json())
app.use(cors(corsOptions));
const httpServer = createServer(app);

const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});


/* Variables  */
var salas: { [clave: string]: Sala } = {};
var admins: { [clave: string]: Administrador } = {};

/* Para no dejar usuarios  en la sala si se desconectan en medio del juego, 
o para eviar usuarios repetidos por una reconexión de socket debemos registrar el socketID con la sala. 
Cuando se deconecta, se ve el socketID, por lo cual, lo usamos a nuestro favor, creamos un diccionario con 
socketID, como clave y como valor el codigo de la sala */

var sockets: { [clave: string]: number } = {}


/* Variables  */
/* Trabajamos con los sockets,  */



// Conexión por canales
io.on('connection', (socket: any) => {
    console.log('Cliente conectado');

    socket.on('join', (datos: any) => {
        if (datos.codigo in salas) {
            let channel = datos.codigo
            let sala = salas[datos.codigo]
            if (sala.juegoIniciado) {
                io.to(socket.id).emit("errores", "El juego ya ha sido iniciado, no pueden unirse jugadores una vez ha comenzado" )
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
            }
            /* Ahora tenemos que avisar a todos los player existentes, que hay un player nuevo, mandando la data de nuevo*/
            io.to(channel).emit(channel, data)
    } else {
        io.to("errores").emit("errores", "No se pude encontrar la sala")
    }

    });

    socket.on('iniciarJuego', (mensaje: any) => {
        if (mensaje.adminID !== undefined && mensaje.codigoSala &&  mensaje.codigoSala in salas) {
            
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
    });

    socket.on('mostrarActividad', (mensaje: any) => {

        
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

    });

    socket.on('obtenerRanking', (mensaje: any) => {

        // mensaje.body.resultado.primero, mensaje.body.resultado.segundo, mensaje.body.resultado.tercero
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

    });

    // El administrador termina el juego y saca a los jugadores de la misma
    socket.on('terminarJuego', (mensaje: any) => {

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
            console.log(`El cliente salió del canal ${canal}`);
        }
    });

    socket.on('salirJuego', (chanel: any) => {

        if (chanel != null && socket.id in sockets) {
            let sala = salas[socket.id]
            sala.eliminarJugador(socket.id)
        }
        delete sockets[socket.id]
        socket.leave(chanel)
    }
    );


    socket.on('disconnect', () => {
        // Revisamos si estaba en la lista de sockets, por lo cual era un player
        if (socket.id in sockets) {
            let idSala = sockets[socket.id]
            let sala = salas[idSala]
            sala.eliminarJugador(socket.id)
            delete sockets[socket.id]
        }
        console.log('Cliente desconectado');
    });
});

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



/* Endpoints para trabajar con las solicitudes */
app.get('/', (req, res) => {
    const json = '{"result":true, "count":42}';
    const obj = JSON.parse(json);
    res.send(obj);
});

app.post('/login', async (req, res) => {
    try {
        var token;
        //var user = await findOne("administradores", { 'id': req.body.administrador.id, "contraseña": req.body.administrador.contraseña })
        if (await userExist(req.body.id, req.body.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: "admin" //le paso el id que le asigno mongo
            }, secret, { expiresIn: '1h' });
            res.send(JSON.stringify({ "token": token }));

            /* Me parece que es mejor idea crear el objeto administrador acá, lo que representa que su 
            sesión esta activa */
            if (!(req.body.id in admins)) {
                // Si no existe, lo creamos y agregamos
                let newAdmin = new Administrador(req.body.id, req.body.contraseña)
                admins[req.body.id] = newAdmin
            }
        } else {
            //El usuario no existe
            res.status(401);
            res.send("Error. Administrador no existe.")
        }

    } catch (error) {
        //hubo un error de formato
        res.status(400);
        res.send("Error. Formato JSON invalido.")
    }
});

app.post('/register', async (req, res) => {

    try {
        if (await userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send("Error. Usuario ya existe.")
        } else {
            if (req.body.administrador.id == null || req.body.administrador.contraseña == null) {
                res.status(400);
                res.send("Error. Faltan parametros.")
            } else {
                //agregar usuario a mongo. 
                try {
                    await db.collection('administradores').insertOne(
                        { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
                    res.status(200);
                    res.send();
                } catch (error) {
                    res.status(500);
                    res.send("Error al insertar.")
                }
            }
        }

    } catch (error) {
        res.status(400);
        res.send("Error: " + error);
    }

})

/* Funciones usadas para facilitar las tareas */
export const verifyUser = (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization === undefined) {
            res.status(400);
            res.send("Error. Falta auth header.")
        }

        try {
            if (req.headers.authorization.contains("Bearer")) {
                var token = req.headers.authorization.split([" ", 1]);
                jwt.verify(token, secret);
                next();
            } else {
                res.status(400);
                res.send("Error. Falta bearer.");
            }
        } catch (error) {
            res.status(401);
            res.send("Error. Token no válido.");
        }

    } catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}

async function userExist(id: String, contraseña: String): Promise<boolean> {
    var res = false;
    try {

        var user = await findOne("administradores", { 'id': id, "contraseña": contraseña })

        if (user !== null) {
            //usuario existe
            res = true;
        }

    } catch (error) {
        console.log(error);
    }

    return res;
}

async function findOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            let temp = await db.collection("administradores").find()
            console.log(temp)
            res = await db.collection(coleccion).findOne(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

async function findMany(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).find(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
async function run() {
    try {
        // Connect the client to the server
        db = await client.connect(uri);
        db = db.db(dbName);
        await client.db().command({ ping: 1 });
        console.log("Conectado a BDD.");
        httpServer.listen(PORT, HOST, () => {
            console.log("Server running")
        })
    } catch (error) {
        console.log("Error al conectarse a BDD: " + error)
        await client.close();
    }
}


/* Corremos efectivamente el server */
run().catch(console.dir);
