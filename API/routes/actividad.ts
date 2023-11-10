import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { ObjectId } from 'mongodb'


const router = express.Router()



//todas las actividades
router.get('/', middleware.verifyUser, async (req, res, next) => {
    //devolver coleccion de actividades
    try {
        var actividades = await metodos.findMany("actividades", {})
        res.status(200)
        res.send(JSON.stringify(actividades))
    } catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al buscar actividades." }))
    }
})

//una actividad
router.get('/:id', middleware.verifyUser, async (req, res, next) => {
    //devolver una actividad
    try {
        var actividad = await metodos.findOne("actividades", { "_id": new ObjectId(req.params.id) });
        res.status(200);
        res.send(JSON.stringify(actividad))
    } catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al buscar actividad." }))
    }
})

//agregar actividad
router.post('/', middleware.verifyUser, async (req, res, next) => {

    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send(JSON.stringify({ mensaje: "Error. Falta actividad." }))
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (
                metodos.isNullOrEmpty(req.body.actividad.titulo) ||
                metodos.isNullOrEmpty(req.body.actividad.descripcion)) {
                res.status(400);
                res.send(JSON.stringify({ mensaje: "Error en los parametros." }))
            } else {
                //guardar actividad
                if (metodos.isNullOrEmpty(req.body.actividad.imagen)) {
                    req.body.actividad.imagen = null;
                }
                try {
                    await metodos.addOne("actividades",
                        { titulo: req.body.actividad.titulo, descripcion: req.body.actividad.descripcion, imagen: req.body.actividad.imagen });
                    res.status(200)
                    res.send()
                } catch (error) {
                    res.status(500);
                    res.send(JSON.stringify({ mensaje: "Error al agregar actividad." }))
                }
            }
        }
    } catch (error) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error al agregar actividad." }))
    }

})



export default router