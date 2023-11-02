'use strict';
import actividadRouter from './routes/actividad'
import salaRouter from './routes/sala'
import userRouter from './routes/user'
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser'

const { MongoClient } = require("mongodb");
const dbName = 'obligatorio'
const uri =
    "mongodb://admin:admin@localhost:27017/" + dbName + "?writeConcern=majority&minPoolSize=10&maxPoolSize=20";
export var db: any = null;
const client = new MongoClient(uri);

//secreto esta en el middleware
export var jwt = require('jsonwebtoken');


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

app.use((req: any, res: any, next: any) => {
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

// Constants



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

/*   app.use(cors()); */



app.get('/test', (req: any, res: any) => {
    console.log("hello world");
    res.send('V 1.1')
})

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
