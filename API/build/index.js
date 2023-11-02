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
exports.jwt = exports.db = void 0;
const actividad_1 = __importDefault(require("./routes/actividad"));
const sala_1 = __importDefault(require("./routes/sala"));
const user_1 = __importDefault(require("./routes/user"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { MongoClient } = require("mongodb");
const dbName = 'obligatorio';
const uri = "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
exports.db = null;
const client = new MongoClient(uri);
//secreto esta en el middleware
exports.jwt = require('jsonwebtoken');
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