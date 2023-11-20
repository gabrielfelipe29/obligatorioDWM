import express from 'express'
import { db } from '..'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Sala } from '../sala'
import { Propuesta } from '../propuesta'
import { Actividad } from '../actividad'
import { ObjectId } from 'mongodb'


const router = express.Router()
const qrcode = require('qrcode');

export var salas: { [clave: string]: Sala } = {};


//crea la sala y le devuelve el id con el link y eso
router.post('/', middleware.verifyUser, async (req, res, next) => {
    //el body tiene la propuesta o solo el id propuesta?, con la coleccion de actividades
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }))
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (metodos.isNullOrEmpty(req.body.propuesta._id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }));
            } else {
                //no hay que verificar ya que antes pasa por el middleware
                var decoded = middleware.decode(req.headers['authorization'])
                try {

                    for (let i = 0; i < req.body.propuesta.actividades.length; i++) {
                        //req.body.propuesta.actividades[i]._id = new ObjectId(req.body.propuesta.actividades[i]._id)
                        req.body.propuesta.actividades[i].jugadores = [];
                        req.body.propuesta.actividades[i].ranking = {
                            'meGusta': 0,
                            'noMeGusta': 0,
                            'meDaIgual': 0
                        }
                    }

                    //var jsonStr = JSON.stringify(obj);
                    var result = await metodos.addOne("salas",
                        {
                            idadmin: decoded.id,
                            propuesta: req.body.propuesta,
                            activo: true
                        });

                    // Lógica implementada para los sockets
                    var codigoJuego = result.insertedId
                    // Pasamos a crear los objetos que necesitamos tener mientras funciona el programa

                    const user = await metodos.findOne("administradores", { '_id': new ObjectId(decoded.id) });

                    var propuestaDeseada = user.propuestas.find((propuesta: any) => propuesta._id == req.body.propuesta._id);

                    if (propuestaDeseada) {
                        // Hacer algo con la propuesta deseada
                        let listaActividades: Actividad[] = []

                        for (let i = 0; i < propuestaDeseada.actividades.length; i++) {
                            let actividad = propuestaDeseada.actividades[i]
                            listaActividades.push(new Actividad(actividad.id, actividad.nombre, actividad.descripcion, actividad.imageLink))
                        }
                        let newPropuesta = new Propuesta(propuestaDeseada.nombre, decoded.id, propuestaDeseada.id, listaActividades, propuestaDeseada.rutaImg)
                        let urlGame = "http://localhost:4200/unirsePropuesta/" + codigoJuego
                        var newSala = new Sala(codigoJuego, newPropuesta, decoded.id)
                        salas[codigoJuego] = newSala


                        // Fin de lógica para los sockets
                        if (result.acknowledged) {
                            res.status(200);

                            qrcode.toDataURL(urlGame, (err: any, url: any) => {
                                if (err) {
                                    res.status(500);
                                    res.send({ error: 'No se pudo generar el código QR.' + err })
                                } else {
                                    newSala.setQRCode(url)
                                    res.send(JSON.stringify({ salaId: result.insertedId.toString(), codigoQR: url }))

                                }
                            });

                        } else {
                            res.status(500)
                            res.send(JSON.stringify({ mensaje: "Error al crear sala." }))
                        }
                    } else {
                        console.log("La propuesta no fue encontrada");
                        res.status(500);
                        res.send({ error: 'La propuesta no fue encontrada' })
                    }
                } catch (error) {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al insertar." }))
                }
            }
        }
    } catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al crear sala." }))
    }

})

//manda el resultado de las actividades
router.post('/:salaid/actividad/:actividadid', async (req, res) => {
    //no es necesario el middleware ya que la request parte de los usuarios normales, sin token ni nada
    try {
        if (!req.body.hasOwnProperty('jugador')) {
            res.status(400);
            res.send("Error. Falta jugador.")
        } else {
            if (!req.body.jugador.hasOwnProperty('ranking')) {
                res.status(400);
                res.send("Error. Falta ranking.")
            } else {
                const jugador = req.body.jugador;
                const actividadid = req.params.actividadid;
                const salaid = req.params.salaid;

                const filtro = {
                    '_id': new ObjectId(salaid),
                    'propuesta.actividades._id': actividadid,
                    activo: true
                };

                let dato = null;


                if (jugador.ranking.meGusta == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.meGusta': 1 }
                    };
                } else if (jugador.ranking.meDaIgual == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.meDaIgual': 1 }
                    };
                } else if (jugador.ranking.noMeGusta == "1") {
                    dato = {
                        $push: { 'propuesta.actividades.$.jugadores': jugador },
                        $inc: { 'propuesta.actividades.$.ranking.noMeGusta': 1 }
                    };
                }

                var result = await db.collection("salas").updateOne(filtro, dato)

                if (result.acknowledged) {
                    res.status(200);
                    res.send()
                } else {
                    res.status(500)
                    res.send(JSON.stringify({ mensaje: "Error al enviar ranking." }))
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error al enviar ranking' }));
    }
})






export default router