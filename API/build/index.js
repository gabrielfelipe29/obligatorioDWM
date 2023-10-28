"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = __importDefault(require("./routes/cards"));
const sala_1 = __importDefault(require("./routes/sala"));
const administrador_1 = require("./administrador");
var admin = new administrador_1.Administrador("admin", "admin");
let administradores = [];
administradores.push(admin);
const app = (0, express_1.default)();
var jwt = require('jsonwebtoken');
app.use(express_1.default.json()); //middleware
const PORT = 3000;
app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1');
});
app.use('/cards', cards_1.default);
app.use('/salas', sala_1.default);
//login del usuario
app.post('/login', (req, res) => {
    //se debe validar el usuario y asignarle el token
    try {
        var token;
        if (userExist(administradores, req.body.administrador.id, req.body.administrador.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: 'admin'
            }, 'secret', { expiresIn: '1h' });
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
});
function userExist(listaUsuario, id, contraseña) {
    var res = false;
    listaUsuario.forEach(x => {
        if (x.id === id && x.contraseña === contraseña) {
            res = true;
            return;
        }
    });
    return res;
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map