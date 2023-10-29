import express from 'express'
/*
import salaRouter from './routes/sala'
import actividadRouter from './routes/actividad'
import propuestaRouter from './routes/propuesta'
*/
const { MongoClient } = require("mongodb");

const uri =
    "mongodb://admin:admin@localhost:27017/obligatorio?writeConcern=majority";
export var db: any = null;
/*
var admin = new Administrador("admin", "admin");
let administradores: Administrador[] = [];
administradores.push(admin);
*/
var secret = "secreto";
const app = express()
var jwt = require('jsonwebtoken');
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {
    console.log("hello world");
    res.send('V 1.1')
})
/*
app.use('/actividades', actividadRouter)
app.use('/salas', salaRouter)
app.use('/propuestas', propuestaRouter)
*/
//login del usuario
app.post('/login', (req, res) => {
    //se debe validar el usuario y asignarle el token
    try {
        var token;
        if (userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
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
        if (userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            res.status(400);
            res.send("Error. Usuario ya existe.")
        } else {
            if (req.body.administrador.id == null || req.body.administrador.contraseña == null) {
                res.status(400);
                res.send("Error. Faltan parametros.")
            } else {
                //agregar usuario a mongo. 
                if (db !== undefined && db.collection('administradores').exists()) {

                    db.collection('administradores').insertOne(
                        { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña }, (err: any, result: any) => {
                            if (err) {
                                console.log("Error al insertar: " + err);
                                res.status(500);
                                res.send("Error al insertar. " + err);
                            } else {
                                console.log("Dato insertado: " + result.ops[0]);
                            }
                        });

                }
            }
        }

    } catch (error) {
        res.status(400);
        res.send("Error. Mal formato de JSON.")
    }

})

function userExist(id: String, contraseña: String): boolean {
    var res = false;
    /*listaUsuario.forEach(x => {
        if (x.id === id && x.contraseña === contraseña) {
            res = true;
            return;
        }
    })
    return res;*/
    try {
        //verifico si existe la conexión y la coleccion administradores
        if (db !== null) {
            //&& db.collection('administradores').exists()
            var user = db.administradores.findOne({ "id": id, "contraseña": contraseña })

            if (user) {
                //usuario existe
                res = true;
            }
        }

    } catch (error) {
        console.log(error);
    }

    return res;
}


export const verifyUser = (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization === undefined) {
            res.status(400);
            res.send("Error. Falta auth header.")
        }

        try {
            if (req.headers.authorization.contains("Bearer")) {
                var token = req.headers.authorization.split([" ", 1]);
                jwt.verify(token, secret);
                next();
            } else {
                res.status(400);
                res.send("Error. Falta bearer.");
            }
        } catch (error) {
            res.status(401);
            res.send("Error. Token no válido.");
        }

    } catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}


// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        // Connect the client to the server
        db = await client.connect(uri, function (err: any, dd: any) {

            var user = dd.db('obligatorio').administradores.findOne({ "id": "admin", "contraseña": "admin" })
            console.log("User: " + user);
        });
        db = db.db('obligatorio');
        console.log(db);
        var user = await db.collection("administradores").findOne({ "id": "admin", "contraseña": "admin" })
        console.log("User: " + user);

        // Establish and verify connection
        await client.db().command({ ping: 1 });
        console.log("Conectado a BDD.");
    } catch (error) {
        console.log("Error al conectarse a BDD: " + error)
        await client.close();
    }
}

run().catch(console.dir);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
