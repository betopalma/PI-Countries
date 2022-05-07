const { Router } = require('express');
const {fetch} = require('node-fetch')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const {Country, Turactivity} = require('../db.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req,res,next)=>{
    res.send("En /")
})

router.get("/countries", async (req,res,next)=>{
    // Si es por query:.....
    // Si no es por query, si la tbala countries esta vacia, debe llenarla
    const {idpais} = req.query;
    try {
        if (idpais===undefined)
        {
            //res.send("En countries")
            //Veo si la tabla countries tiene registros
            //const paises = await Country.findAll()
            const countpaises = await Country.count()
            if (countpaises === 1) {
                // Recuperar paises y ponerlos en la base de datos
                console.log('Por leer')
                fetch(`https://restcountries.com/v3/name/Argentina`)
                console.log('despues del fetch')
                //.then(r => res.send(r))
                .then(r => r.json())
                .then((recurso) => res.send(recurso))
                .catch((error)=>{
                    res.send(error)
                })
            }
            //res.send({'cantidad': countpaises})
        }
        else 
        {
            res.send("En countries por query: "+idpais)
        } 
    }
    catch (error) {
        console.log(error)
    }
})


router.get("/countries/:idPais", (req,res,next)=>{
    res.send("En countries por param")
})

router.get("/countries", (req,res,next)=>{
    res.send("En countries por query")
})

router.get("/activity", (req,res,next)=>{
    res.send("En Activity")
})

module.exports = router;
