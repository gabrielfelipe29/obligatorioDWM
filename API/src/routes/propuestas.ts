import express from 'express';


const router = express.Router()


router.get('/', (req,res)=>{
    res.status(200);
    //res.send(JSON.parse(routerPropuestas. )
});

router.post('/crear_Propuesta',(req,res)=>{
    //obtener body y insertarlo en la base de datos.
    //insertar(req.body)
    res.status(201)
    //manejar errores
});


router.delete('/:id',(req,res)=>{
    const id=req.params.id;

    /*Eliminar(id){
        en la base de datos 
    }
    */

});

router.put('/',(req,res)=>{

});


export default router;










