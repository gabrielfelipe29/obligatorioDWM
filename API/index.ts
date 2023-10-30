'use strict';
import express, { Request, Response } from 'express';

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
    "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority";

export var db: any = null;
const client = new MongoClient(uri);

<<<<<<< HEAD:API/index.ts
=======


/*
var admin = new Administrador("admin", "admin");
let administradores: Administrador[] = [];
administradores.push(admin);
*/
>>>>>>> 30d1f179ea86c737f93af96035a3fe7198f30259:API/src/index.ts
var secret = "secreto";
var jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';


<<<<<<< HEAD:API/index.ts

// App
const app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, 
    methods: "GET, PUT"
}
app.use(express.json())
app.use(cors(corsOptions));
let cards = [];

app.get('/', (req, res) => {
  const json = '{"result":true, "count":42}';
  const obj = JSON.parse(json);
  res.send(obj);
});

app.post('/login', async (req, res) => {
  try {
    var token;
    //var user = await findOne("administradores", { 'id': req.body.administrador.id, "contraseña": req.body.administrador.contraseña })
    if (await userExist(req.body.id, req.body.contraseña)) {
        //usuario es administrador, entonces le mando el token
        token = jwt.sign({
            data: "admin" //le paso el id que le asigno mongo
        }, secret, { expiresIn: '1h' });
        res.send(JSON.stringify({ "token": token }));
    } else {
        //El usuario no existe
        res.status(401);
        res.send("Error. Administrador no existe.")
=======
const cors = require('cors');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Constants
const HOST = '0.0.0.0';



/* Funciones del servidor
     - Dar listas (datos para agregarlo) 
     - Agregar lista al map
     - Quitar lista del mapDeListas
     - Mover card entre listas
     - Agregar card a lista
     - Quitar card de lista
     - Devolver card
     - Actualizar info card
     - Actualizar info lista
  */


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(express.json())
//app.use(cors(corsOptions));
/* app.options('/', cors()) // enable pre-flight request for DELETE request

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  next();
}); */

/* const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // Algunos navegadores requieren esta opción
  }; */
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
/*   app.use(cors()); */

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());
///////////////////////////////////
///////////////////////////////////

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
app.post('/login', async (req, res) => {
    //se debe validar el usuario y asignarle el token
    console.log("llego")
    try {
        var token;
        //var user = await findOne("administradores", { 'id': req.body.administrador.id, "contraseña": req.body.administrador.contraseña })
        if (await userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
            //usuario es administrador, entonces le mando el token
            token = jwt.sign({
                data: "admin" //le paso el id que le asigno mongo
            }, secret, { expiresIn: '1h' });
            res.status(200);
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
>>>>>>> 30d1f179ea86c737f93af96035a3fe7198f30259:API/src/index.ts
    }

} catch (error) {
    //hubo un error de formato
    res.status(400);
    res.send("Error. Formato JSON invalido.")
}
});

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
                    await db.collection('administradores').insertOne(
                        { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
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

async function userExist(id: String, contraseña: String): Promise<boolean> {
    var res = false;
    try {

        var user = await findOne("administradores", { 'id': id, "contraseña": contraseña })

        if (user !== null) {
            //usuario existe
            res = true;
        }

    } catch (error) {
        console.log(error);
    }

    return res;
}

async function findOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            let temp = await db.collection("administradores").find()
            console.log(temp)
            res = await db.collection(coleccion).findOne(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

async function findMany(coleccion: String, dato: any) {

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

async function run() {
    try {
        // Connect the client to the server
        db = await client.connect(uri);
        db = db.db(dbName);
        await client.db().command({ ping: 1 });
        console.log("Conectado a BDD.");
        app.listen(PORT,  HOST, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Error al conectarse a BDD: " + error)
        await client.close();
    }
}


run().catch(console.dir);
