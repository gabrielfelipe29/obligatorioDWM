import { db } from ".";
import { ObjectId } from 'mongodb'
export async function findOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).findOne(dato);
            let arr = await db.collection("administradores").find({}).toArray()
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function findMany(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).find(dato).toArray();
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function addOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).insertOne(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function addMany(coleccion: String, dato: any[]) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).insertMany(dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function updateOne(coleccion: String, filtro: any, dato: any) {
    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).updateOne(filtro, { $set: dato }, { upsert: false });
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export async function updateMany(coleccion: any, filtro: any, dato: any) {
    /*
        Formato del dato para actualizar. El primer parametro (rated) es el filtro, el $set es el dato a modificar
      const result = await movies.updateMany(
      { rated: Rating.G },
      {
        $set: {
          random_review: `After viewing I am ${
            100 * Math.random()
          }% more satisfied with life.`,
        },
      }
    );*/
    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).updateMany(filtro, dato);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
    return res;
}

export function isNullOrEmpty(value: any) {
    return value === null || value === undefined || value === '';
}

export async function userExist(id: String, contraseña: String): Promise<boolean> {
    var res = false;
    try {

        var user = await findOne("administradores", { 'id': id, "contraseña": contraseña })

        if (user !== null) {
            //usuario existe
            res = true;
        }

    } catch (error) {
        console.log(error);
    }

    return res;
}

export async function getRanking(salaId: string) {
    let ranking: any = [];
    try {
        var resultado2 = await db.collection("salas").aggregate([
            {
                $match: {
                    "_id": new ObjectId(salaId)
                }
            },
            {
                $unwind: "$propuesta.actividades"
            },
            {
                $sort: {
                    "propuesta.actividades.ranking.meGusta": -1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    actividades: { $push: "$propuesta.actividades" }
                }
            }
        ]).toArray();

        ranking = resultado2[0].actividades
        
    } catch (error) {
        console.log(error);
        return null;
    }
    return ranking;

}


export async function obtenerVotosActividad(salaId: string, actividadId: ObjectId): Promise<any> {
    try {

        const filtro = {
            '_id': new ObjectId(salaId),
            'propuesta.actividades._id': actividadId,
            activo: true
        };


        const sala = await db.collection('salas').findOne(filtro);


        let idRecibido = actividadId.toString()
        //console.log(sala.propuesta.actividades)

        var actividadBuscada = await sala.propuesta.actividades.find((activdad: any) => {
            let id = activdad._id.toString()
            if (id == idRecibido)
                return activdad
        });

        if (actividadBuscada) {
            return actividadBuscada.ranking
        } else {
            return "Error, no se pudo recuperar nada"
        }
    } catch (error) {
        return "Error, no se pudo recuperar nada"
    }
}


