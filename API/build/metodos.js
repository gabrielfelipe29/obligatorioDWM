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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanking = exports.userExist = exports.isNullOrEmpty = exports.updateMany = exports.updateOne = exports.addMany = exports.addOne = exports.findMany = exports.findOne = void 0;
const _1 = require(".");
const mongodb_1 = require("mongodb");
function findOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).findOne(dato);
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
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let ranking = [];
        try {
            var find = { '_id': new mongodb_1.ObjectId(salaId) };
            //var res = await db.collection("salas").findOne(find);
            //console.log(res);
            //ranking = res.propuesta.actividades.sort((a: any, b: any) => a.ranking.meGusta - b.ranking.meGusta).toArray();
            var cursor = _1.db.collection("salas").aggregate([
                {
                    $set: {
                        actividades: {
                            $sortArray: {
                                input: "$propuesta.actividades",
                                sortBy: { 'ranking.meGusta': 1 }
                            }
                        }
                    }
                }
            ]);
            try {
                for (var _d = true, cursor_1 = __asyncValues(cursor), cursor_1_1; cursor_1_1 = yield cursor_1.next(), _a = cursor_1_1.done, !_a; _d = true) {
                    _c = cursor_1_1.value;
                    _d = false;
                    const doc = _c;
                    console.dir(doc);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = cursor_1.return)) yield _b.call(cursor_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (error) {
            console.log(error);
        }
        return ranking;
    });
}
exports.getRanking = getRanking;
//# sourceMappingURL=metodos.js.map