import express from 'express'
import { db } from '..'
import { findMany,findOne,updateMany,updateOne} from '..';


const router = express.Router()

//devuelve la sala con el id, pero que ademas le pertenezca al admin que lo pide
router.get('/:id', (req, res, next) => {



})

//crea la sala y le devuelve el id con el link y eso
router.post('/', middleware.verifyUser, async (req, res, next) => {
    //el body tiene la propuesta o solo el id propuesta?, con la coleccion de actividades
    try {
        if (!req.body.hasOwnProperty('propuesta')) {
            res.status(400);
            res.send("Error. Falta propuesta.")
        } else {
            //como guardar la imagenes? en mongo? o en mongo guardo el url de la img que esta en otro lado?

            if (metodos.isNullOrEmpty(req.body.propuesta.id) ||
                metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
                res.status(400);
                res.send("Error en los parametros.");
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
                        res.send()
                    } else {
                        res.status(500)
                        res.send("Error al crear sala.")
                    }

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



router.post('/:actividadid', async (req, res, next) => {
    //devolver coleccion de propuestas
    try {
        const votacion=req.body;
        const actividadid=req.params.actividadid;
        const filtro = { id:actividadid };
        const dato = { $push: { 'propuesta.$.actividades.$.jugadores': votacion} };
        var result = await db.collection("sala").updateOne(filtro, dato)
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
      }
})


export default router