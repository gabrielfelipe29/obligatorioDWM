import express from 'express'
import * as metodos from '../metodos'
import { verifyUser } from '../middleware'
import { db } from '..'
const router = express.Router()

//todas las propuestas del usuario
router.get('/:id', async (req, res, next) => {
    //devolver coleccion de propuestas
    try {
        
        const userId = req.params.id;
        const user= await (metodos.findOne("administradores",{id:userId}));
        const propuestas=user.propuesta;
        //si haces un 
        //console.log(propuestas);
        res.status(200)
        //res.send(JSON.parse(propuestas)); 
        res.send(propuestas);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
      }

}) /*
        const propuestas: Propuesta[] = await PropuestaModel.find({ creatorid:userId });
        */

//una propuesta
router.get('/:id/propuesta/:propuestaid', async (req, res, next) => {
    //devolver una propuesta
    try {
        const userId = req.params.id;
        const propuestaid=req.params.propuestaid
        const user= await metodos.findOne("administradores",{ id: userId,});
        const propuestadeseada = user.propuesta.find( (variable:any) => variable.id === propuestaid);
        res.status(200);
        res.send(propuestadeseada);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la propuesta del usuario' });
      }
})
///en memoria lo apretan 
//editar propuesta
router.put('/:id/:propuestaid/add/', async (req, res, next) => {
    //devolver una propuesta
    try {
      const userId = req.params.id;
      const propuestaid = req.params.propuestaid
      /*
      const user = await findOne("administradores", { id: userId });
      const propuestadeseada = user.propuestas[0];
      */
      const nuevasactividad = req.body.actividad;

      const filtro = { id: userId, 'propuesta.id': propuestaid };
      const dato = { $push: { 'propuesta.$.actividades': nuevasactividad } };
      var result = await db.collection("administradores").updateOne(filtro, dato)
      res.status(200);
      res.send()

      //manejar cuando le pasas un id mal
  } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
  }

})

//agregar propuesta
router.post('/:id', async (req, res, next) => {
    //generar actividad y mandarla a mongo
  try{
  const userId=req.params.id;
  const propnueva=req.body;

  const filtro = { id: userId};
  const dato = { $push: { 'propuesta': propnueva } };
  var result = await db.collection("administradores").updateOne(filtro, dato)
 
 // const resulto= await db.collection("administradores").insertOne(dato);
  console.log(result);
  res.status(200);
  
  res.send();
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
}


})

router.delete('/:id/propuesta/:propuestaid',  async (req, res, next) => {
  try{
    const userId = req.params.id;
    const propuestaid = req.params.propuestaid;
    const filtro = { id: userId};
    const dato = { $pull: { 'propuesta': { id: propuestaid } } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    console.log(result);
    res.status(200);
    res.send();
    //manejar querer borrar devuelta
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las propuestas del usuario' });
}
})

router.put('/:id/propuesta/:propuestaid',  async (req, res, next) => {
  try{
    const userId = req.params.id;
    const propuestaid = req.params.propuestaid;
    const actividadnueva=req.body.actividad;

    const filtro = { id: userId, 'propuesta.id': propuestaid };
    const dato = { $set: { 'propuesta.$.actividad': actividadnueva } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    res.status(200);
    res.send();

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al borrar la actividad de la propuesta del usuario' });
}
})

  
export default router