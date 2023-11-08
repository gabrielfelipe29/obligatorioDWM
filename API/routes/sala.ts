import express from 'express'
import { db } from '..'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Sala } from '../sala'
import { Propuesta } from '../propuesta'
import { Actividad } from '../actividad'


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

                    // Lógica implementada para los sockets
                    var codigoJuego = result.insertedId
                    // Pasamos a crear los objetos que necesitamos tener mientras funciona el programa
                    /* const user = await metodos.findOne("administradores", { id: decoded.id });
                    const propuestadeseada = user.propuesta.find((variable: any) => variable.id === req.body.propuesta.id);

                    let listaActividades: Actividad[] = []

                    for (let i = 0; i < propuestadeseada.actividades.length; i++){
                        let actividad = propuestadeseada.actividades[i]
                        listaActividades.push(new Actividad(actividad.id, actividad.titulo, actividad.descripcion, actividad.imageLink))
                    }
                    let newPropuesta = new Propuesta(propuestadeseada.nombre,decoded.id, propuestadeseada.id, listaActividades, propuestadeseada.rutaImg ) */
                    let urlGame = "http://localhost:4200/unirsePropuesta/" + codigoJuego
                    /*  let newSala = new Sala(codigoJuego, newPropuesta, urlGame, decoded.id)
                     salas[codigoJuego] = newSala */

                    // Fin de lógica para los sockets


                    if (result.acknowledged) {
                        res.status(200);

                        qrcode.toDataURL(urlGame, (err: any, url: any) => {
                            if (err) {
                                res.status(500);
                                res.send({ error: 'No se pudo generar el código QR.' + err })
                            } else {
                                res.send(JSON.stringify({ salaId: result.insertedId.toString(), codigoQR: url }))

                            }
                        });
                     
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