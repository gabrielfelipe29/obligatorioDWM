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
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const middleware = __importStar(require("../middleware"));
const metodos = __importStar(require("../metodos"));
const router = express_1.default.Router();
const qrcode = require('qrcode');
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
            if (metodos.isNullOrEmpty(req.body.propuesta.id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }));
            }
            else {
                //no hay que verificar ya que antes pasa por el middleware
                var decoded = middleware.decode(req.headers['authorization']);
                try {
                    for (let i = 0; i < req.body.propuesta.actividades.length; i++) {
                        req.body.propuesta.actividades[i].jugadores = [];
                    }
                    //var jsonStr = JSON.stringify(obj);
                    var result = yield metodos.addOne("salas", {
                        idadmin: decoded.id,
                        propuesta: req.body.propuesta,
                        activo: true
                    });
                    if (result.acknowledged) {
                        res.status(200);
                        const { data } = result.insertedId.toString(); // Datos para generar el código QR
                        try {
                            const qrCode = yield qrcode.toDataURL(data);
                            res.send(JSON.stringify({ salaId: result.insertedId.toString(), codigoQR: qrCode }));
                        }
                        catch (error) {
                            res.status(500);
                            res.send({ error: 'No se pudo generar el código QR.' });
                        }
                    }
                    else {
                        res.status(500);
                        res.send(JSON.stringify({ mensaje: "Error al crear sala." }));
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
router.post('/:actividadid', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //no es necesario el middleware ya que la request parte de los usuarios normales, sin token ni nada
    try {
        if (!req.body.hasOwnProperty('ranking')) {
            res.status(400);
            res.send("Error. Falta ranking.");
        }
        else {
            const votacion = req.body.ranking;
            const actividadid = req.params.actividadid;
            const filtro = { id: actividadid, activo: true };
            const dato = { $push: { 'propuesta.$.actividades.$.jugadores': votacion } };
            var result = yield __1.db.collection("sala").updateOne(filtro, dato);
            if (result.acknowledged) {
                res.status(200);
                res.send();
            }
            else {
                res.status(500);
                res.send(JSON.stringify({ mensaje: "Error al enviar ranking." }));
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