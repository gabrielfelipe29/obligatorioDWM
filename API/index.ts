'use strict';
import actividadRouter from './routes/actividad'
import * as metodos from './metodos'
import * as middleware from './middleware'
import salaRouter from './routes/sala'
import userRouter from './routes/propuesta'

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
    "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
export var db: any = null;
const client = new MongoClient(uri);

var secret = "secreto";
var jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';


// App
const app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}
app.use(express.json())
app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());

app.use('/actividades', actividadRouter)
app.use('/salas', salaRouter)
app.use('/user', userRouter)

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
        console.log(error);
    }
}


run().catch(console.dir);
