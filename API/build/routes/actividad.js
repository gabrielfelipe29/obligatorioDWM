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
//todas las actividades
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver coleccion de actividades
    try {
    }
    catch (error) {
        res.status(400);
        res.send("Error. " + error);
    }
}));
//una actividad
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una actividad
}));
//editar actividad
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //devolver una actividad
}));
//agregar actividad
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //generar actividad y mandarla a mongo
    //verifyUser(req, res, next)
    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send("Error. Falta actividad.");
        }
        else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?
            if ((0, __1.isNullOrEmpty)(req.body.actividad.id) ||
                (0, __1.isNullOrEmpty)(req.body.actividad.titulo) ||
                (0, __1.isNullOrEmpty)(req.body.actividad.descripcion)) {
                res.status(400);
                res.send("Error en los parametros.");
            }
            else {
                //guardar actividad
                try {
                    yield (0, __2.addOne)("actividades", { id: req.body.id, titulo: req.body.titulo, descripcion: req.body.descripcion, imagen: req.body.imagen });
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
        res.send("Error. " + error);
    }
}));
exports.default = router;
//# sourceMappingURL=actividad.js.map