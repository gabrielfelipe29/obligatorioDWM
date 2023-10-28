import express from 'express'
import salaRouter from './routes/sala'
import actividadRouter from './routes/actividad'
import propuestaRouter from './routes/propuesta'
import { Administrador } from './administrador';


var admin = new Administrador("admin", "admin");
var secret = "secreto";
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

app.use('/actividades', actividadRouter)
app.use('/salas', salaRouter)
app.use('/propuestas', propuestaRouter)

//login del usuario
app.post('/login', (req, res) => {
    //se debe validar el usuario y asignarle el token
    try {
        var token;
        if (userExist(administradores, req.body.administrador.id, req.body.administrador.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: 'admin'
            }, secret, { expiresIn: '1h' });
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

app.post('/register', (req, res) => {

    try {
        if (userExist(administradores, req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send("Error. Usuario ya existe.")
        } else {
            //agregar usuario a mongo. debo mandarle el token?

            
        }

    } catch (error) {
        res.status(400);
        res.send("Error. Mal formato de JSON.")
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


export const verifyUser = (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization === undefined) {
            res.status(400);
            res.send("Error. Falta auth header.")
        }

        try {
            var token = req.headers.authorization.split([" ", 1]);
            jwt.verify(token, secret);
            next();
        } catch (error) {
            res.status(401);
            res.send("Error. Token no válido.");
        }

    } catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
