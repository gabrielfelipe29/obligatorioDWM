import express from 'express'
import { verifyUser } from '..'
const router = express.Router()

//todas las actividades
router.get('/', verifyUser, (req, res, next) => {
    //devolver coleccion de actividades
})

//una actividad
router.get('/:id', verifyUser, (req, res, next) => {
    //devolver una actividad
})

//editar actividad
router.put('/:id', verifyUser, (req, res, next) => {
    //devolver una actividad
})

//agregar actividad
router.post('/', verifyUser, (req, res, next) => {
    //generar actividad y mandarla a mongo
    
})

export default router