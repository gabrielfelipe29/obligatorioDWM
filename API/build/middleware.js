"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const _1 = require(".");
const _2 = require(".");
const metodos_1 = require("./metodos");
function verifyUser(req, res, next) {
    try {
        if ((0, metodos_1.isNullOrEmpty)(req.headers['authorization'])) {
            res.status(400);
            res.send("Error. Falta auth header.");
        }
        else {
            try {
                if (req.headers['authorization'].split(' ')[0] == "Bearer") {
                    var token = req.headers['authorization'].split(' ')[1];
                    _2.jwt.verify(token, _1.secret);
                    next();
                }
                else {
                    res.status(400);
                    res.send("Error. Falta Bearer.");
                }
            }
            catch (error) {
                res.status(401);
                res.send("Error. Token no válido.");
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=middleware.js.map