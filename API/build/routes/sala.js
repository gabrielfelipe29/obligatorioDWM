"use strict";
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
exports.salas = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const middleware = __importStar(require("../middleware"));
const metodos = __importStar(require("../metodos"));
const sala_1 = require("../sala");
const propuesta_1 = require("../propuesta");
const actividad_1 = require("../actividad");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
const qrcode = require('qrcode');
exports.salas = {};
//crea la sala y le devuelve el id con el link y eso
router.post('/', middleware.verifyUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //el body tiene la propuesta o solo el id propuesta?, con la coleccion de actividades
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }));
        }
        else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?
            if (metodos.isNullOrEmpty(req.body.propuesta._id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }));
            }
            else {
                //no hay que verificar ya que antes pasa por el middleware
                var decoded = middleware.decode(req.headers['authorization']);
                try {
                    console.log(req.body.propuesta);
                    for (let i = 0; i < req.body.propuesta.actividades.length; i++) {
                        console.log(req.body.propuesta.actividades[i]);
                        req.body.propuesta.actividades[i]._id = new mongodb_1.ObjectId(req.body.propuesta.actividades[i]._id);
                        console.log("Bandera 1");
                        req.body.propuesta.actividades[i].jugadores = [];
                        req.body.propuesta.actividades[i].ranking = {
                            'meGusta': 0,
                            'noMeGusta': 0,
                            'meDaIgual': 0
                        };
                    }
                    //var jsonStr = JSON.stringify(obj);
                    var result = yield metodos.addOne("salas", {
                        idadmin: decoded.id,
                        propuesta: req.body.propuesta,
                        activo: true
                    });
                    // Lógica implementada para los sockets
                    var codigoJuego = result.insertedId;
                    // Pasamos a crear los objetos que necesitamos tener mientras funciona el programa
                    const user = yield metodos.findOne("administradores", { '_id': new mongodb_1.ObjectId(decoded.id) });
                    var propuestaDeseada = user.propuestas.find((propuesta) => {
                        if (propuesta._id == req.body.propuesta._id)
                            return propuesta;
                    });
                    if (propuestaDeseada) {
                        // Hacer algo con la propuesta deseada
                        let listaActividades = [];
                        for (let i = 0; i < propuestaDeseada.actividades.length; i++) {
                            let actividad = propuestaDeseada.actividades[i];
                            listaActividades.push(new actividad_1.Actividad(actividad._id, actividad.titulo, actividad.descripcion, actividad.imagen));
                        }
                        let newPropuesta = new propuesta_1.Propuesta(propuestaDeseada.nombre, decoded.id, propuestaDeseada._id, listaActividades, propuestaDeseada.rutaImg);
                        console.log(newPropuesta);
                        let urlGame = "http://localhost:4200/unirsePropuesta/" + codigoJuego;
                        var newSala = new sala_1.Sala(codigoJuego, newPropuesta, decoded.id);
                        exports.salas[codigoJuego] = newSala;
                        // Fin de lógica para los sockets
                        if (result.acknowledged) {
                            res.status(200);
                            qrcode.toDataURL(urlGame, (err, url) => {
                                if (err) {
                                    res.status(500);
                                    res.send({ error: 'No se pudo generar el código QR.' + err });
                                }
                                else {
                                    newSala.setQRCode(url);
                                    res.send(JSON.stringify({ salaId: result.insertedId.toString(), codigoQR: url }));
                                }
                            });
                        }
                        else {
                            res.status(500);
                            res.send(JSON.stringify({ mensaje: "Error al crear sala." }));
                        }
                    }
                    else {
                        console.log("La propuesta no fue encontrada");
                        res.status(500);
                        res.send({ error: 'La propuesta no fue encontrada' });
                    }
                }
                catch (error) {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al insertar." }));
                }
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al crear sala." }));
    }
}));
//manda el resultado de las actividades
router.post('/:salaid/actividad/:actividadid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //no es necesario el middleware ya que la request parte de los usuarios normales, sin token ni nada
    try {
        if (!req.body.hasOwnProperty('jugador')) {
            res.status(400);
            res.send("Error. Falta jugador.");
        }
        else {
            if (!req.body.jugador.hasOwnProperty('ranking')) {
                res.status(400);
                res.send("Error. Falta ranking.");
            }
            else {
                const jugador = req.body.jugador;
                const actividadid = req.params.actividadid;
                const salaid = req.params.salaid;
                const filtro = {
                    '_id': new mongodb_1.ObjectId(salaid),
                    'propuesta.actividades': {
                        $elemMatch: { _id: new mongodb_1.ObjectId(actividadid.toString()) }
                    },
                    activo: true
                };
                let dato = null;
                if (jugador.ranking.meGusta == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.meGusta': 1 }
                    };
                }
                else if (jugador.ranking.meDaIgual == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.meDaIgual': 1 }
                    };
                }
                else if (jugador.ranking.noMeGusta == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.noMeGusta': 1 }
                    };
                }
                var result = yield __1.db.collection("salas").updateOne(filtro, dato, () => { });
                if (result.acknowledged) {
                    res.status(200);
                    res.send(JSON.stringify("Voto recibido correctamente"));
                }
                else {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al enviar ranking." }));
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error al enviar ranking' }));
    }
}));
exports.default = router;
//# sourceMappingURL=sala.js.map