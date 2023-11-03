import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { db } from '..'
import { ObjectId } from 'mongodb'
const router = express.Router()


//registrar usuario
router.post('/register', async (req, res) => {
  try {
    if (await metodos.userExist(req.body.administrador.id, req.body.administrador.contraseña)) {
      res.status(400);
      res.send(JSON.stringify({ mensaje: "Error. Usuario ya existe." }))
    } else {
      if (metodos.isNullOrEmpty(req.body.administrador.id) ||
        metodos.isNullOrEmpty(req.body.administrador.contraseña)) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: "Error. Faltan parametros." }))
      } else {
        //agregar usuario a mongo. 
        try {
          await metodos.addOne("administradores",
            { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña });
          res.status(200);
          res.send();
        } catch (error) {
          res.status(500);
          res.send(JSON.stringify({ mensaje: "Error al registrar usuario." }))
        }
      }
    }
  } catch (error) {
    res.status(400);
    res.send(JSON.stringify({ mensaje: "Error al registrar usuario." }));
  }

})

//loguear usuario
router.post('/login', async (req, res) => {
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
      res.send(JSON.stringify({ mensaje: "Error. Administrador no existe." }))
    }

  } catch (error) {
    //hubo un error de formato
    res.status(400);
    res.send(JSON.stringify({ mensaje: "Error. Formato JSON invalido." }))
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

//devuelve una propuesta
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
router.put('/propuesta', middleware.verifyUser, async (req, res, next) => {
  try {

    if (!req.body.hasOwnProperty('propuesta')) {
      res.status(400);
      res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }))
    } else {
      if (!metodos.isNullOrEmpty(req.body.propuesta.id) ||
        !metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error. Faltán parametros.' }))
      } else {
        const userId = middleware.decode(req.headers['authorization']).id;
        const filtro = { id: userId, 'propuesta.id': req.body.propuesta.id };
        const dato = { $set: { 'propuesta.$.actividades': req.body.propuesta.actividades } };
        var result = await db.collection("administradores").updateOne(filtro, dato)
        //verificar si es con el updateCount?
        if (result.acknowledged) {
          res.status(200);
          res.send()
        } else {
          res.status(500);
          res.send(JSON.stringify({ mensaje: "Error al editar propuesta." }))
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }

})

//agregar propuesta
router.post('/propuesta', middleware.verifyUser, async (req, res, next) => {
  try {
    if (!req.body.hasOwnProperty('propuesta')) {
      res.status(400);
      res.send(JSON.stringify({ mensaje: "Error. Falta propuesta." }))
    } else {
      if (!metodos.isNullOrEmpty(req.body.propuesta.id) ||
        !metodos.isNullOrEmpty(req.body.propuesta.actividades)) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error. Faltán parametros.' }))
      }
      const userId = middleware.decode(req.headers['authorization']).id;
      req.body.propuesta.id = new ObjectId();
      const filtro = { id: userId };
      const dato = { $push: { 'propuestas': req.body.propuesta } };
      var result = await db.collection("administradores").updateOne(filtro, dato)

      if (result.acknowledged) {
        res.status(200);
        res.send()
      } else {
        res.status(500)
        res.send(JSON.stringify({ mensaje: "Error al crear propuesta." }))
      }
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
    const dato = { $pull: { 'propuestas': { id: propuestaid } } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    console.log(result);
    //Ver de decirle si se encontro la propuesta con ese id o no, es decir, si se pudo borrar algo
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
/*
//modifica las actividades en las propuestas del usuario
router.put('/propuesta', middleware.verifyUser, async (req, res, next) => {
  //en realidad se le manda todas las actividades, y se sustituye todo
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.body.propuesta.id;
    const actividadnueva = req.body.propuesta.actividades;
    const filtro = { id: userId, 'propuesta.id': propuestaid };
    const dato = { $set: { 'propuesta.$.actividades': actividadnueva } };
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
*/

export default router