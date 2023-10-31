import express from 'express'
import { verifyUser } from '../middleware'
import * as metodos from '../metodos'


const router = express.Router()

//devuelve la sala con el id, pero que ademas le pertenezca al admin que lo pide
router.get('/:id', (req, res, next) => {



})

//crea la sala y le devuelve el id con el link y eso
router.post('/', verifyUser, async (req, res, next) => {

    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send("Error. Falta actividad.")
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (metodos.isNullOrEmpty(req.body.actividad.id) ||
                metodos.isNullOrEmpty(req.body.actividad.titulo) ||
                metodos.isNullOrEmpty(req.body.actividad.descripcion)) {
                res.status(400);
                res.send("Error en los parametros.")
            } else {
                //guardar actividad
                try {
                    await metodos.addOne("actividades",
                        { id: req.body.actividad.id, titulo: req.body.actividad.titulo, descripcion: req.body.actividad.descripcion, imagen: req.body.actividad.imagen });
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