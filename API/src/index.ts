import express from 'express'

import userRouter from './routes/user'

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
        "mongodb://0.0.0.0:27017/obligatorio";
export var db: any = null;
const client = new MongoClient(uri);
//mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority
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


app.use('/user', userRouter)

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
                    var result= await db.collection('administradores').insertOne(
                        { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña, "propuesta":[]});
                    console.log(result);
                    res.status(200);
                    res.send();
                } catch (error) {
                    res.status(500);
                    res.send("Error al insertar.")
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

        var user = await findOne("administradores", { "id": id, "contraseña": contraseña })

        if (user !== null) {
            //usuario existe
            res = true;
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

export async function findOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).findOne(dato);
            console.log(db);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function findMany(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).find(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}


run().catch(console.dir);


export async function updateOne(coleccion: String, filtro: any, dato: any) {
    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).updateOne(filtro, { $set: dato }, { upsert: false });
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}




export async function updateMany(coleccion: any, filtro: any, dato: any) {
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
        if (db !== null) {
            res = await db.colection(coleccion).updateMany(filtro, { $set: dato }, { upsert: false });
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export function isNullOrEmpty(value: any) {
    return value === null || value === undefined || value === '';
}
