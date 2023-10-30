import express from 'express'
import * as metodos from '../metodos'
import { verifyUser } from '../middleware'
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
        const propuestadeseada = user.propuestas[0];
        const nuevasactividad = req.body.actividad;

        const filtro = { id: userId, 'propuestas.id': propuestaid };
        const dato = { $set: { 'propuestas.actividades': nuevasactividad } };

        await metodos.updateMany("administradores", filtro, dato);
        res.status(200);
        res.send()
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
    }



})

//agregar propuesta
router.post('/', verifyUser, (req, res, next) => {
    //generar actividad y mandarla a mongo

})

export default router