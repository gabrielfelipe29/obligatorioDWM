"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
//todas las actividades
router.get('/', __1.verifyUser, (req, res, next) => {
    //devolver coleccion de actividades
});
//una actividad
router.get('/:id', __1.verifyUser, (req, res, next) => {
    //devolver una actividad
});
//editar actividad
router.put('/:id', __1.verifyUser, (req, res, next) => {
    //devolver una actividad
});
//agregar actividad
router.post('/', __1.verifyUser, (req, res, next) => {
    //generar actividad y mandarla a mongo
});
exports.default = router;
//# sourceMappingURL=actividad%20copy.js.map