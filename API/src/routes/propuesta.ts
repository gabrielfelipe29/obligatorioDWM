import express from 'express'
import * as metodos from '../metodos'
import { verifyUser } from '../middleware'
import { db } from '..'
const router = express.Router()

//todas las propuestas del usuario
router.get('/user/:id', verifyUser, (req, res, next) => {
    //devolver coleccion de propuestas
})

//una propuesta
router.get('/:id', verifyUser, (req, res, next) => {
    //devolver una propuesta
})

router.put('/:id/propuestas/:propuestaid', verifyUser, async (req, res, next) => {
    //devolver una propuesta
    try {
        const userId = req.params.id;
        const propuestaid = req.params.propuestaid
        const user = await metodos.findOne("administradores", { id: userId });
        //const propuestadeseada = user.propuesta[propuestaid];
        const nuevasactividad = req.body.actividad;

        const filtro = { id: userId, 'propuestas.id': propuestaid };
        const dato = { $push: { 'propuestas.$.actividades': nuevasactividad } };
        var result = await db.collection("administradores").updateOne(filtro, dato)
        console.log(result)
        res.status(200)
        res.send()
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }



})
export default router