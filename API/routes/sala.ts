import express from 'express'
import { db } from '..'
import * as middleware from '../middleware'
import * as metodos from '../metodos'


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
                        req.body.propuesta.actividades[i].jugadores = [];
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
router.post('/:actividadid', async (req, res, next) => {
    //no es necesario el middleware ya que la request parte de los usuarios normales, sin token ni nada
    try {
        if (!req.body.hasOwnProperty('ranking')) {
            res.status(400);
            res.send("Error. Falta ranking.")
        } else {
            const votacion = req.body.ranking;
            const actividadid = req.params.actividadid;
            const filtro = { id: actividadid, activo: true };
            const dato = { $push: { 'propuesta.$.actividades.$.jugadores': votacion } };
            var result = await db.collection("sala").updateOne(filtro, dato)
            if (result.acknowledged) {
                res.status(200);
                res.send()
            } else {
                res.status(500)
                res.send(JSON.stringify({ mensaje: "Error al enviar ranking." }))
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error al enviar ranking' }));
    }
})



export default router