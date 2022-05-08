const { Router } = require('express');
const axios = require('axios');

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
            if (countpaises === 0) {
                // Recuperar paises y ponerlos en la base de datos
                let info = [];
                axios
                .get(`https://restcountries.com/v3/all`)
                //.then(r => r.json())
                .then( async (r) => {
                    try {
                        // console.log(r.data[0].cca3)
                        // console.log(r.data[0].name.common)
                        // console.log(r.data[0].flags[0])
                        // console.log(r.data[0].region)
                        // console.log(r.data[0].capital[0])
                        // console.log(r.data[0].subregion)
                        // console.log(r.data[0].area)
                        // console.log(r.data[0].population)

                        info=r.data.map((i)=>{
                            //console.log('Capital:  ' , i.capital)

                            i.IDD === undefined ? i.IDD='XXX' : null;
                            i.name === undefined ? i.name='Sin Datos Reportados' : null;                            
                            i.flags[0] === undefined ? i.flags=['http://sin.img.com'] : null;
                            i.region === undefined ? i.region='Sin Datos Reportados' : null;
                            i.capital === undefined ? i.capital=['Sin Datos Reportados'] : null;
                            i.subregion === undefined ? i.subregion='Sin Datos Reportados' : null;
                            i.area === undefined ? i.area=0 : null;
                            i.poblacion === undefined ? i.poblacion=0 : null;


                            return ({
                                IDD: i.cca3,
                                name: i.name.common,
                                flags: i.flags[0],
                                region: i.region,
                                capital: i.capital[0],
                                subregion: i.subregion,
                                area: i.area,
                                poblacion: i.population  
                            })
                        }
                        )
                        // console.log(info[18])
                        // console.log(info[19])
                        // console.log(info[20])
                        //console.log(info[0])
                        const pais = await Country.bulkCreate (info);
                    }
                    catch (error) {
                        console.log('Error en bulk: ' + error)
                    }

                    //console.log(pais)
                    // console.log(r.data[0].name.common)
                    // console.log(r.data[0].flags[0])
                    // console.log(r.data[0].region)
                    // console.log(r.data[0].capital[0])
                    // console.log(r.data[0].subregion)
                    // console.log(r.data[0].area)
                    // console.log(r.data[0].population)
                    res.send(info)
                })
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
