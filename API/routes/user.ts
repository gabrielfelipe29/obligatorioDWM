import express from 'express'
import * as middleware from '../middleware'
import * as metodos from '../metodos'
import { Administrador } from '../administrador'
import { db } from '..'
import { ObjectId } from 'mongodb'
const router = express.Router()

export const admins: { [clave: string]: Administrador } = {}; 


//registrar usuario
router.post('/register', async (req, res) => {
  console.log("Llego papa")
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
            { 'id': req.body.administrador.id, 'contraseña': req.body.administrador.contraseña, 'propuestas': [] });
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
      let newAdmin = new Administrador(req.body.administrador.id, req.body.administrador.contraseña)
      admins[req.body.administrador.id] = newAdmin
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
router.get('/propuesta', middleware.verifyUser, async (req, res, next) => {
  //devolver coleccion de propuestas
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const user = await metodos.findOne("administradores", { '_id': new ObjectId(userId) });
  
    //const user = await metodos.findOne("administradores", { 'id': userId });
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
    const propuestaid = req.params.propuestaid;
    /*
    const user = await metodos.findOne("administradores", {
      '_id': new ObjectId(userId),
      'propuesta.id': new ObjectId(propuestaid)
    });
*/
    var user = await db.collection("administradores").findOne({
      '_id': new ObjectId(userId),
      'propuestas.id': new ObjectId(propuestaid)
    }, { '_id': 0, 'propuestas.$': '1' })

    const propuestadeseada = user.propuestas.find((variable: any) => variable.id == propuestaid);
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
      if (metodos.isNullOrEmpty(req.body.propuesta._id) ||
        metodos.isNullOrEmpty(req.body.propuesta.actividades) ||
        metodos.isNullOrEmpty(req.body.propuesta.titulo)) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error. Faltan parametros.' }))
      } else {
        const userId = middleware.decode(req.headers['authorization']).id;
        const filtro = { '_id': new ObjectId(userId), 'propuestas._id': new ObjectId(req.body.propuesta._id) };
        const dato = {
          $set: {
            'propuestas.$.actividades': req.body.propuesta.actividades,
            'propuestas.$.titulo': req.body.propuesta.titulo,
            'propuestas.$.descripcion': req.body.propuesta.descripcion,
            'propuestas.$.img': req.body.propuesta.img
          }
        };
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
      if (metodos.isNullOrEmpty(req.body.propuesta.actividades) ||
        metodos.isNullOrEmpty(req.body.propuesta.titulo)) {
        res.status(400);
        res.send(JSON.stringify({ mensaje: 'Error. Faltán parametros.' }));
      } else {

        const userId = middleware.decode(req.headers['authorization']).id;

        for(let actividad of req.body.propuesta.actividades){
          actividad._id = new ObjectId(actividad._id)
        }
        req.body.propuesta._id = new ObjectId();
        const filtro = { '_id': new ObjectId(userId) };
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
    const filtro = { '_id': new ObjectId(userId) };
    const dato = { $pull: { 'propuestas': { _id: new ObjectId(propuestaid) } } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    res.status(200);
    res.send();
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }
})

router.delete('/propuesta/:propuestaid', async (req, res, next) => {
  try {
    const userId = middleware.decode(req.headers['authorization']).id;
    const propuestaid = req.params.propuestaid;
    const filtro = { '_id': new ObjectId(userId) };
    const dato = { $pull: { 'propuestas': { _id: new ObjectId(propuestaid) } } };
    var result = await db.collection("administradores").updateOne(filtro, dato)
    res.status(200);
    res.send();
  }
  catch (error) {
    console.error(error);
    res.status(500);
    res.send(JSON.stringify({ mensaje: 'Error al obtener las propuestas del usuario' }))
  }
})


export default router