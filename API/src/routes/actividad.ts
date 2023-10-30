import express from 'express'
import { verifyUser } from '..'
import { isNullOrEmpty } from '..'
import { addOne } from '..'
import { findOne } from '..'

const router = express.Router()

//todas las actividades
router.get('/', async (req, res, next) => {
    //devolver coleccion de actividades
    try {

    } catch (error) {
        res.status(400);
        res.send("Error. " + error)
    }
})

//una actividad
router.get('/:id', async (req, res, next) => {
    //devolver una actividad
    try {
        var actividad = await findOne("actividades", { "id": req.params.id })
        res.status(200)
        res.send(JSON.stringify(actividad))
    } catch (error) {
        res.status(400);
        res.send("Error. " + error)
    }
})

//editar actividad
router.put('/:id', async (req, res, next) => {
    //devolver una actividad
})

//agregar actividad
router.post('/', async (req, res, next) => {
    //generar actividad y mandarla a mongo
    //verifyUser(req, res, next)

    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send("Error. Falta actividad.")
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (isNullOrEmpty(req.body.actividad.id) ||
                isNullOrEmpty(req.body.actividad.titulo) ||
                isNullOrEmpty(req.body.actividad.descripcion)) {
                res.status(400);
                res.send("Error en los parametros.")
            } else {
                //guardar actividad
                try {
                    await addOne("actividades",
                        { id: req.body.id, titulo: req.body.titulo, descripcion: req.body.descripcion, imagen: req.body.imagen });
                    res.status(200)
                    res.send()
                } catch (error) {
                    res.status(500);
                    res.send("Error al insertar. " + error)
                }
            }
        }
    } catch (error) {
        res.status(400);
        res.send("Error. " + error)
    }

})

export default router