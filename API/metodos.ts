import { db } from ".";
import { ObjectId } from 'mongodb'
export async function findOne(coleccion: String, dato: any) {

    var res = null;
    try {
        if (db !== null) {
            res = await db.collection(coleccion).findOne(dato);
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

export async function getRanking(salaId: any) {
    let ranking: any = [];
    try {
        var find = { '_id': new ObjectId(salaId) }
        //var res = await db.collection("salas").findOne(find);
        //console.log(res);
        //ranking = res.propuesta.actividades.sort((a: any, b: any) => a.ranking.meGusta - b.ranking.meGusta).toArray();
        var cursor = db.collection("salas").aggregate([
            {
                $project: {
                    "_id": new ObjectId(salaId),
                    result: {
                        $sortArray: {
                            input: "$propuesta.actividades",
                            sortBy: { "ranking.meGusta": -1 }
                        }
                    }
                }
            }
        ]);

        var res = await cursor.toArray();
        ranking = res[0].result;
        console.log(ranking)

    } catch (error) {
        console.log(error);
        return null;
    }
    return ranking;

}

export async function obtenerVotosActividad(salaId: number, actividadId: number): Promise<any> {
    try {

        const filtro = {
            '_id': new ObjectId(salaId),
            'propuesta.actividades.id': actividadId,
            activo: true
        };

        const result = await db.collection('salas').findOne(filtro);
        if (result) {
            return result.propuesta.actividades[actividadId -1].ranking
        } else {
            return "Error, no se pudo recuperar nada"
        }
    } catch (error) {
        return "Error, no se pudo recuperar nada"
    }
}


