import express from 'express'
import cardRouter from './routes/cards'
import salaRouter from './routes/sala'
import { Administrador } from './administrador';


var admin = new Administrador("admin", "admin");
let administradores: Administrador[] = [];
administradores.push(admin);

const app = express()
var jwt = require('jsonwebtoken');
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1')
})

app.use('/cards', cardRouter)
app.use('/salas', salaRouter)

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
        } else {
            //El usuario no existe
            res.status(401);
            res.send("Error. Administrador no existe.")
        }

    } catch (error) {
        //hubo un error de formato
        res.status(400);
        res.send("Error. Formato JSON invalido.")
    }
})

function userExist(listaUsuario: Administrador[], id: String, contraseña: String) {
    var res = false;
    listaUsuario.forEach(x => {
        if (x.id === id && x.contraseña === contraseña) {
            res = true;
            return;
        }
    })
    return res;
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
