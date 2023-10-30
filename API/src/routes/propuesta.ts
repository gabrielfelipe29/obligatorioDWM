import express from 'express'
import { verifyUser } from '..'
import { findMany,findOne} from '..'
import { Propuesta } from '../propuesta'
const router = express.Router()

//todas las propuestas del usuario
router.get('/user/:id', verifyUser, async (req, res, next) => {
    //devolver coleccion de propuestas
    try {
        
        const userId = req.params.id;
       
        const user= await (findOne("administrador",{id:userId}));
        const propuestas=user.propuesta;
        //si haces un 
        res.status(200)
        res.send(JSON.parse(propuestas));

      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
      }

}) /*
        const propuestas: Propuesta[] = await PropuestaModel.find({ creatorid:userId });
        */

//una propuesta
router.get('/:id', verifyUser, async (req, res, next) => {
    //devolver una propuesta
    try {
        
        const userId = req.params.id;
        const user= await findMany("administrador",{ id: userId });
        const propuestas = user.propuesta;
        res.status(200);
        res.send(JSON.parse(propuestas));

      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
      }

})
///en memoria lo apretan 
//editar propuesta
router.put('/:id', verifyUser, (req, res, next) => {
    //devolver una actividad
  

})

//agregar propuesta
router.post('/', verifyUser, (req, res, next) => {
    //generar actividad y mandarla a mongo

})

export default router