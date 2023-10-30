import express from 'express'
import actividadRouter from './routes/actividad'
import * as metodos from './metodos'

//import salaRouter from './routes/sala'
import userRouter from './routes/propuesta'

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
    "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
export var db: any = null;
const client = new MongoClient(uri);


const app = express()
export var secret = "secreto";
export var jwt = require('jsonwebtoken');
app.use(express.json()) //middleware

const PORT = 3000


app.use('/actividades', actividadRouter)

//app.use('/salas', salaRouter)
app.use('/user', userRouter)


app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1')
})

//login del usuario
app.post('/login', async (req, res) => {
    //se debe validar el usuario y asignarle el token
    try {
        var token;
        //var user = await findOne("administradores", { 'id': req.body.administrador.id, "contraseña": req.body.administrador.contraseña })
        if (await userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: "admin" //le paso el id que le asigno mongo
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

app.post('/register', async (req, res) => {

    try {
        if (await userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send("Error. Usuario ya existe.")
        } else {
            if (req.body.administrador.id == null || req.body.administrador.contraseña == null) {
                res.status(400);
                res.send("Error. Faltan parametros.")
            } else {
                //agregar usuario a mongo. 
                try {
                    await metodos.addOne("administradores",
                        { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
                    res.status(200);
                    res.send();
                } catch (error) {
                    res.status(500);
                    res.send("Error al insertar. " + error)
                }
            }
        }

    } catch (error) {
        res.status(400);
        res.send("Error: " + error);
    }

})

async function userExist(id: String, contraseña: String): Promise<boolean> {
    var res = false;
    try {

        var user = await metodos.findOne("administradores", { 'id': id, "contraseña": contraseña })

        if (user !== null) {
            //usuario existe
            res = true;
        }

    } catch (error) {
        console.log(error);
    }

    return res;
}



async function run() {
    try {
        // Connect the client to the server
        db = await client.connect(uri);
        db = db.db(dbName);
        await client.db().command({ ping: 1 });
        console.log("Conectado a BDD.");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Error al conectarse a BDD: " + error)
        await client.close();
    }
}


run().catch(console.dir);


