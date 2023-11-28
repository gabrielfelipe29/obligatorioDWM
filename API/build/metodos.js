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
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerVotosActividad = exports.getRanking = exports.userExist = exports.isNullOrEmpty = exports.updateMany = exports.updateOne = exports.addMany = exports.addOne = exports.findMany = exports.findOne = void 0;
const _1 = require(".");
const mongodb_1 = require("mongodb");
function findOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).findOne(dato);
                let arr = yield _1.db.collection("administradores").find({}).toArray();
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.findOne = findOne;
function findMany(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).find(dato).toArray();
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.findMany = findMany;
function addOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).insertOne(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.addOne = addOne;
function addMany(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).insertMany(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.addMany = addMany;
function updateOne(coleccion, filtro, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).updateOne(filtro, { $set: dato }, { upsert: false });
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.updateOne = updateOne;
function updateMany(coleccion, filtro, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
            Formato del dato para actualizar. El primer parametro (rated) es el filtro, el $set es el dato a modificar
          const result = await movies.updateMany(
          { rated: Rating.G },
          {
            $set: {
              random_review: `After viewing I am ${
                100 * Math.random()
              }% more satisfied with life.`,
            },
          }
        );*/
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).updateMany(filtro, dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.updateMany = updateMany;
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
exports.isNullOrEmpty = isNullOrEmpty;
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
exports.userExist = userExist;
function getRanking(salaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let ranking = [];
        try {
            var resultado2 = yield _1.db.collection("salas").aggregate([
                {
                    $match: {
                        "_id": new mongodb_1.ObjectId(salaId)
                    }
                },
                {
                    $unwind: "$propuesta.actividades"
                },
                {
                    $sort: {
                        "propuesta.actividades.ranking.meGusta": -1
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        actividades: { $push: "$propuesta.actividades" }
                    }
                }
            ]).toArray();
            ranking = resultado2[0].actividades;
        }
        catch (error) {
            console.log(error);
            return null;
        }
        return ranking;
    });
}
exports.getRanking = getRanking;
function obtenerVotosActividad(salaId, actividadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filtro = {
                '_id': new mongodb_1.ObjectId(salaId),
                'propuesta.actividades._id': new mongodb_1.ObjectId(actividadId),
                activo: true
            };
            const sala = yield _1.db.collection('salas').findOne(filtro);
            let idRecibido = actividadId.toString();
            //console.log(sala.propuesta.actividades)
            var actividadBuscada = yield sala.propuesta.actividades.find((activdad) => {
                let id = activdad._id.toString();
                if (id == idRecibido)
                    return activdad;
            });
            if (actividadBuscada) {
                return actividadBuscada.ranking;
            }
            else {
                return "Error, no se pudo recuperar nada";
            }
        }
        catch (error) {
            return "Error, no se pudo recuperar nada";
        }
    });
}
exports.obtenerVotosActividad = obtenerVotosActividad;
//# sourceMappingURL=metodos.js.map