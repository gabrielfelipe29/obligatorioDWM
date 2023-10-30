import express from 'express'
import { verifyUser } from '../middleware'
import * as metodos from '../metodos'


const router = express.Router()


/*
function verifyUser(req: any, res: any, next: any) {
    try {
        if (req.headers.authorization === undefined) {
            res.status(400);
            res.send("Error. Falta auth header.")
        } else {

            try {
                res.status(200)
                res.send()
            } catch (error) {
                res.status(401);
                res.send("Error. Token no válido.");
            }
        }
    } catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}
*/

//todas las actividades
router.get('/', verifyUser, async (req, res, next) => {
    //devolver coleccion de actividades
    try {

        var actividades = await metodos.findMany("actividades", {})
        
        res.status(200)
        res.send(JSON.stringify(actividades))

    } catch (error) {
        res.status(400);
        res.send("Error. " + error)
    }
})

//una actividad
router.get('/:id', async (req, res, next) => {
    //devolver una actividad
    try {
        var actividad = await metodos.findOne("actividades", { "id": req.params.id })
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

    try {
        if (!req.body.hasOwnProperty('actividad')) {
            res.status(400);
            res.send("Error. Falta actividad.")
        } else {

            if (metodos.isNullOrEmpty(req.body.actividad.id) ||
                metodos.isNullOrEmpty(req.body.actividad.titulo) ||
                metodos.isNullOrEmpty(req.body.actividad.descripcion)) {
                res.status(400);
                res.send("Error en los parametros.")
            } else {
                //guardar actividad
                try {
                    await metodos.updateOne("actividades",
                        { id: req.body.actividad.id }, { titulo: req.body.actividad.titulo, descripcion: req.body.actividad.descripcion, imagen: req.body.actividad.imagen });
                    res.status(200)
                    res.send()
                } catch (error) {
                    res.status(500);
                    res.send("Error al editar. " + error)
                }
            }
        }
    } catch (error) {
        res.status(400);
        res.send("Error. " + error)
    }


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