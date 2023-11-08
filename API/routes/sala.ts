import express from 'express'
import { db } from '..'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { ObjectId } from 'mongodb'


const router = express.Router()


//crea la sala y le devuelve el id con el link y eso
router.post('/', middleware.verifyUser, async (req, res, next) => {
    //el body tiene la propuesta o solo el id propuesta?, con la coleccion de actividades
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }))
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (metodos.isNullOrEmpty(req.body.propuesta.id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }));
            } else {
                //no hay que verificar ya que antes pasa por el middleware
                var decoded = middleware.decode(req.headers['authorization'])
                try {

                    for (let i = 0; i < req.body.propuesta.actividades.length; i++) {
                        req.body.propuesta.actividades[i]._id = new ObjectId(req.body.propuesta.actividades[i]._id)
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

                    if (result.acknowledged) {
                        res.status(200);
                        res.send(JSON.stringify({ salaId: result.insertedId.toString() }))
                    } else {
                        res.status(500)
                        res.send(JSON.stringify({ mensaje: "Error al crear sala." }))
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
                    'propuesta.actividades._id': new ObjectId(actividadid),
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