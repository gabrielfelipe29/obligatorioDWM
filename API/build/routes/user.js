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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const __2 = require("..");
const router = express_1.default.Router();
//todas las propuestas del usuario
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver coleccion de propuestas
    try {
        const userId = req.params.id;
        const user = yield ((0, __1.findOne)("administradores", { id: userId }));
        const propuestas = user.propuesta;
        //si haces un 
        //console.log(propuestas);
        res.status(200);
        //res.send(JSON.parse(propuestas)); 
        res.send(propuestas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }
})); /*
        const propuestas: Propuesta[] = await PropuestaModel.find({ creatorid:userId });
        */
//una propuesta
router.get('/:id/propuesta/:propuestaid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una propuesta
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid;
        const user = yield (0, __1.findOne)("administradores", { id: userId, });
        const propuestadeseada = user.propuesta.find((variable) => variable.id === propuestaid);
        res.status(200);
        res.send(propuestadeseada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la propuesta del usuario' });
    }
}));
///en memoria lo apretan 
//editar propuesta
router.put('/:id/:propuestaid/add/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una propuesta
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid;
        /*
        const user = await findOne("administradores", { id: userId });
        const propuestadeseada = user.propuestas[0];
        */
        const nuevasactividad = req.body.actividad;
        const filtro = { id: userId, 'propuesta.id': propuestaid };
        const dato = { $push: { 'propuesta.$.actividades': nuevasactividad } };
        var result = yield __2.db.collection("administradores").updateOne(filtro, dato);
        res.status(200);
        res.send();
        //manejar cuando le pasas un id mal
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }
}));
//agregar propuesta
router.post('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //generar actividad y mandarla a mongo
    try {
        const userId = req.params.id;
        const propnueva = req.body;
        const filtro = { id: userId };
        const dato = { $push: { 'propuesta': propnueva } };
        var result = yield __2.db.collection("administradores").updateOne(filtro, dato);
        // const resulto= await db.collection("administradores").insertOne(dato);
        console.log(result);
        res.status(200);
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }
}));
router.delete('/:id/propuesta/:propuestaid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid;
        const filtro = { id: userId };
        const dato = { $pull: { 'propuesta': { id: propuestaid } } };
        var result = yield __2.db.collection("administradores").updateOne(filtro, dato);
        console.log(result);
        res.status(200);
        res.send();
        //manejar querer borrar devuelta
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }
}));
router.put('/:id/propuesta/:propuestaid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid;
        const actividadnueva = req.body.actividad;
        const filtro = { id: userId, 'propuesta.id': propuestaid };
        const dato = { $set: { 'propuesta.$.actividad': actividadnueva } };
        var result = yield __2.db.collection("administradores").updateOne(filtro, dato);
        res.status(200);
        res.send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al borrar la actividad de la propuesta del usuario' });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map