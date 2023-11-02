import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { db } from '..'
const router = express.Router()


//registrar usuario
router.post('/register', async (req, res) => {

  try {
    if (await metodos.userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
      res.status(400);
      res.send("Error. Usuario ya existe.")
    } else {
      if (req.body.administrador.id == null || req.body.administrador.contraseña == null) {
        res.status(400);
        res.send("Error. Faltan parametros.")
      } else {
        //agregar usuario a mongo. 
        try {
          await metodos.addOne("administradores",
            { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
          res.status(200);
          res.send();
        } catch (error) {
          res.status(500);
          res.send("Error al insertar. " + error)
        }
      }
    }

  } catch (error) {
    res.status(400);
    res.send("Error: " + error);
  }

})


//loguear usuario
router.post('/login', async (req, res) => {
  //se debe validar el usuario y asignarle el token
  try {
    var token;
    var user = await metodos.findOne("administradores",
      {
        'id': req.body.administrador.id,
        'contraseña': req.body.administrador.contraseña
      })

    if (user) {
      //usuario es administrador, entonces le mando el token
      token = middleware.sign(user._id.toString());
      res.status(200)
      res.send(JSON.stringify({ "token": token }));
    } else {
      //El usuario no existe
      res.status(401);
      res.send("Error. Administrador no existe.")
    }

  } catch (error) {
    //hubo un error de formato
    res.status(400);
    res.send("Error. Formato JSON invalido.")
  }
})

//todas las propuestas del usuario
router.get('/', middleware.verifyUser, async (req, res, next) => {
  //devolver coleccion de propuestas
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const user = await metodos.findOne("administradores", { id: userId });
    const propuestas = user.propuestas;
    res.status(200)
    res.send(propuestas);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }
})

//una propuesta
router.get('/propuesta/:propuestaid', middleware.verifyUser, async (req, res, next) => {
  //devolver una propuesta
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.params.propuestaid
    const user = await metodos.findOne("administradores", { id: userId });
    //REVISAR si se puede poner el id de la propuesta en el find
    const propuestadeseada = user.propuesta.find((variable: any) => variable.id === propuestaid);
    res.status(200);
    res.send(propuestadeseada);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener la propuesta del usuario' }))
  }
})

//editar propuesta
router.put('propuesta/:propuestaid', async (req, res, next) => {
  //devolver una propuesta
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.params.propuestaid
    const nuevasactividad = req.body.actividad;
    const filtro = { id: userId, 'propuesta.id': propuestaid };
    const dato = { $push: { 'propuesta.$.actividades': nuevasactividad } };
    var result = await db.collection("administradores").updateOne(filtro, dato)

    if (result.acknowledged) {
      res.status(200);
      res.send()
    } else {
      res.status(500)
      res.send("Error al editar propuesta.")
    }
    //manejar cuando le pasas un id mal
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }

})

//agregar propuesta
router.post('/', middleware.verifyUser, async (req, res, next) => {
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propnueva = req.body.propuesta;
    const filtro = { id: userId };
    const dato = { $push: { 'propuesta': propnueva } };
    var result = await db.collection("administradores").updateOne(filtro, dato)

    if (result.acknowledged) {
      res.status(200);
      res.send()
    } else {
      res.status(500)
      res.send("Error al crear propuesta.")
    }
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }


})
//borra la propuesta
router.delete('/propuesta/:propuestaid', async (req, res, next) => {
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.params.propuestaid;
    const filtro = { id: userId };
    const dato = { $pull: { 'propuesta': { id: propuestaid } } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    console.log(result);
    res.status(200);
    res.send();
    //manejar querer borrar devuelta
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }
})

//saca una actividad dentro de la propuesta del usuario
router.put('/propuesta/:propuestaid', middleware.verifyUser, async (req, res, next) => {
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.params.propuestaid;
    const actividadnueva = req.body.actividad;
    const filtro = { id: userId, 'propuesta.id': propuestaid };
    const dato = { $set: { 'propuesta.$.actividad': actividadnueva } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    res.status(200);
    res.send();
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al borrar la actividad de la propuesta del usuario' }))
  }
})


export default router