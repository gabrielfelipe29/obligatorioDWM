import express from 'express'
import cardRouter from './routes/cards'
import salaRouter from './routes/sala'
import * as jose from 'jose'


const admin = new Administrador("admin", "admin");
let administradores: Administrador[] = [];
administradores.push(admin);

const app = express()
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1')
})

app.use('/cards', cardRouter)
app.use('/salas', salaRouter)

//login del usuario
app.post('login', (req, res) => {
    //se debe validar el usuario y asignarle el token
    try {

        if (userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            //mandar token 
        } else {
            res.status(401);
            res.send("Error. Usuario no existe.")
        }


    } catch (error) {
        res.status(401);
        res.send("Error.")
    }
})
//node jason web token
function userExist(id: String, contraseña: String) {
    administradores.forEach(x => {
        if (x.id === id && x.contraseña === contraseña) {
            return true;
        }
    })
    return false;
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
