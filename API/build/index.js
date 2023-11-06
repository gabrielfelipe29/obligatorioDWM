'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.jwt = exports.db = void 0;
const actividad_1 = __importDefault(require("./routes/actividad"));
const metodos = __importStar(require("./metodos"));
const middleware = __importStar(require("./middleware"));
const sala_1 = __importDefault(require("./routes/sala"));
const user_1 = __importDefault(require("./routes/user"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { MongoClient } = require("mongodb");
const dbName = 'obligatorio';
const uri = "mongodb://0.0.0.0:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
exports.db = null;
const client = new MongoClient(uri);
//secreto esta en el middleware
exports.jwt = require('jsonwebtoken');
/*
var admin = new Administrador("admin", "admin");
let administradores: Administrador[] = [];
administradores.push(admin);
*/
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
// App
const app = (0, express_1.default)();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
};
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const bodyParserJSON = body_parser_1.default.json();
const bodyParserURLEncoded = body_parser_1.default.urlencoded({ extended: true });
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors());
app.use('/actividades', actividad_1.default);
app.use('/salas', sala_1.default);
app.use('/user', user_1.default);
app.get('/', (req, res) => {
    const json = '{"result":true, "count":42}';
    const obj = JSON.parse(json);
    res.send(obj);
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //se debe validar el usuario y asignarle el token
    try {
        var token;
        var user = yield metodos.findOne("administradores", {
            'id': req.body.administrador.id,
            'contraseña': req.body.administrador.contraseña
        });
        if (user) {
            //usuario es administrador, entonces le mando el token
            token = middleware.sign(user._id.toString());
            res.status(200);
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
// Constants
/* Funciones del servidor
     - Dar listas (datos para agregarlo)
     - Agregar lista al map
     - Quitar lista del mapDeListas
     - Mover card entre listas
     - Agregar card a lista
     - Quitar card de lista
     - Devolver card
     - Actualizar info card
     - Actualizar info lista
  */
/*   app.use(cors()); */
app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});
//login del usuario
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //se debe validar el usuario y asignarle el token
    console.log("llego");
    try {
        var token;
        var user = yield metodos.findOne("administradores", {
            'id': req.body.administrador.id,
            'contraseña': req.body.administrador.contraseña
        });
        if (user) {
            //usuario es administrador, entonces le mando el token
            token = middleware.sign(user._id.toString());
            res.status(200);
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
                    yield metodos.addOne("administradores", { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
                    res.status(200);
                    res.send();
                }
                catch (error) {
                    res.status(500);
                    res.send("Error al insertar. " + error);
                }
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send("Error: " + error);
    }
}));
function userExist(id, contraseña) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = false;
        try {
            var user = yield metodos.findOne("administradores", { 'id': id, "contraseña": contraseña });
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            exports.db = yield client.connect(uri);
            exports.db = exports.db.db(dbName);
            yield client.db().command({ ping: 1 });
            console.log("Conectado a BDD.");
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
run().catch(console.dir);
//# sourceMappingURL=index.js.map