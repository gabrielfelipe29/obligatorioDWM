import express from 'express'
import { verifyUser } from '..'
const router = express.Router()

//todas las propuestas del usuario
router.get('/user/:id', verifyUser, (req, res, next) => {
    //devolver coleccion de propuestas
})

//una propuesta
router.get('/:id', verifyUser, (req, res, next) => {
    //devolver una propuesta
})

//editar propuesta
router.put('/:id', verifyUser, (req, res, next) => {
    //devolver una actividad
})

//agregar propuesta
router.post('/', verifyUser, (req, res, next) => {
    //generar actividad y mandarla a mongo

})

export default router