'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const { MongoClient } = require("mongodb");
const dbName = 'obligatorio';
const uri = "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority";
exports.db = null;
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
const app = (0, express_1.default)();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
};
app.use(express_1.default.json());
app.use(cors(corsOptions));
const httpServer = (0, http_1.createServer)(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
/* Variables  */
var propuestas = [];
var admins = {};
// Agregar elementos al diccionario
/* miDiccionario["clave1"] = "valor1";
miDiccionario["clave2"] = "valor2";
miDiccionario["clave3"] = 42; */
/* Variables  */
/* Trabajamos con los sockets,  */
// Conexión por canales
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('join', (channel) => {
        socket.join(channel);
        console.log(`El cliente se unió al canal ${channel}`);
    });
    socket.on('mensaje', (mensaje) => {
        // Recibes un mensaje del cliente Angular y puedes responder o realizar acciones según sea necesario.
        console.log('Mensaje recibido del cliente Angular:', mensaje);
        // Por ejemplo, puedes enviar una respuesta al cliente Angular en el mismo canal:
        io.to('nombreDelCanal').emit('respuesta', 'Respuesta desde el servidor');
    });
    // Salir de un canal
    socket.on('leave', (channel) => {
        socket.leave(channel);
        console.log(`El cliente salió del canal ${channel}`);
    });
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
/* Endpoints para trabajar con las solicitudes */
app.get('/', (req, res) => {
    const json = '{"result":true, "count":42}';
    const obj = JSON.parse(json);
    res.send(obj);
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var token;
        //var user = await findOne("administradores", { 'id': req.body.administrador.id, "contraseña": req.body.administrador.contraseña })
        if (yield userExist(req.body.id, req.body.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: "admin" //le paso el id que le asigno mongo
            }, secret, { expiresIn: '1h' });
            res.send(JSON.stringify({ "token": token }));
        }
        else {
            //El usuario no existe
            res.status(401);
            res.send("Error. Administrador no existe.");
        }
    }
    catch (error) {
        //hubo un error de formato
        res.status(400);
        res.send("Error. Formato JSON invalido.");
    }
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send("Error. Usuario ya existe.");
        }
        else {
            if (req.body.administrador.id == null || req.body.administrador.contraseña == null) {
                res.status(400);
                res.send("Error. Faltan parametros.");
            }
            else {
                //agregar usuario a mongo. 
                try {
                    yield exports.db.collection('administradores').insertOne({ 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
                    res.status(200);
                    res.send();
                }
                catch (error) {
                    res.status(500);
                    res.send("Error al insertar.");
                }
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send("Error: " + error);
    }
}));
/* Funciones usadas para facilitar las tareas */
const verifyUser = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            res.status(400);
            res.send("Error. Falta auth header.");
        }
        try {
            if (req.headers.authorization.contains("Bearer")) {
                var token = req.headers.authorization.split([" ", 1]);
                jwt.verify(token, secret);
                next();
            }
            else {
                res.status(400);
                res.send("Error. Falta bearer.");
            }
        }
        catch (error) {
            res.status(401);
            res.send("Error. Token no válido.");
        }
    }
    catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
};
exports.verifyUser = verifyUser;
function userExist(id, contraseña) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = false;
        try {
            var user = yield findOne("administradores", { 'id': id, "contraseña": contraseña });
            if (user !== null) {
                //usuario existe
                res = true;
            }
        }
        catch (error) {
            console.log(error);
        }
        return res;
    });
}
function findOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (exports.db !== null) {
                let temp = yield exports.db.collection("administradores").find();
                console.log(temp);
                res = yield exports.db.collection(coleccion).findOne(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
function findMany(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (exports.db !== null) {
                res = yield exports.db.collection(coleccion).find(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
/* Hacemos la conexión a la base de datos y hacemos que el serve quede corriendo */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            exports.db = yield client.connect(uri);
            exports.db = exports.db.db(dbName);
            yield client.db().command({ ping: 1 });
            console.log("Conectado a BDD.");
            httpServer.listen(PORT, HOST, () => {
                console.log("Server running");
            });
        }
        catch (error) {
            console.log("Error al conectarse a BDD: " + error);
            yield client.close();
        }
    });
}
/* Corremos efectivamente el server */
run().catch(console.dir);
