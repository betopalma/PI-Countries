const { Router } = require('express');
const axios = require('axios');
const {Op} = require('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const {Country, Activity } = require('../db.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req,res,next)=>{
    res.send("En /")
})

router.get("/countries/:idPais", async (req,res,next)=>{
    // Ejemplo de lo que devuelve
    // {
    //     "IDD": "ARG",
    //     "name": "Argentina",
    //     "flags": "https://flagcdn.com/ar.svg",
    //     "capital": "Buenos Aires",
    //     "subregion": "South America",
    //     "area": "2780400",
    //     "population": "45376763",
    //     "activities": [
    //      {
    //          "IDD": "1",
    //          "name": "Sky1",
    //          "dificultad": 1,
    //          "duracion": "10min",
    //          "temporada": "Verano"
    //      },
    //      {
    //          "IDD": "2",
    //          "name": "Sky2",
    //          "dificultad": 1,
    //          "duracion": "30min",
    //          "temporada": "Primavera"
    //     }
    //     ]
    // }

    const {idPais} = req.params;
    if (!idPais) return (res.send('Pais nulo'))
    try {
        const p = await Country.findByPk(
            idPais.toUpperCase(),
            { 
                include: [{
                    model:Activity,
                    through: { attributes: []},
                    attributes: ['idd','name','dificultad','duracion','temporada']
                }],
                attributes: ['IDD','name','flags','continent','capital','subregion','area','population']
            }    
        )
        if (p === null) res.send({'msg': 'Pais no encontrado'});
        else {
            res.send(p)
        }
    }    
    catch (error) {
        res.send(error);
    }

})

router.get("/countries", async (req,res,next)=>{
    // Si es por query:.....
    // Si no es por query: si la tabla countries esta vacia, debe llenarla.
    //                     Devolver los paises
    
    const {name} = req.query;
    try {
        if (name===undefined)
        {

            //Veo si la tabla countries tiene registros

            const countpaises = await Country.count()
            if (countpaises === 0) {
                console.log('Cargando Base de Datos')
                // Recuperar paises y ponerlos en la base de datos
                let info = [];
                axios
                .get(`https://restcountries.com/v3/all`)
                .then( async (r) => {
                    try {
                        info=r.data.map((i)=>{
                            i.IDD === undefined ? i.IDD='XXX' : null;
                            i.name === undefined ? i.name='Sin Datos Reportados' : null;                            
                            i.flags[0] === undefined ? i.flags=['http://sin.img.com'] : null;
                            i.region === undefined ? i.region='Sin Datos Reportados' : null;
                            i.capital === undefined ? i.capital=['Sin Datos Reportados'] : null;
                            i.subregion === undefined ? i.subregion='Sin Datos' : null;
                            i.area === undefined ? i.area=0 : i.area=parseFloat(i.area);
                            i.population === undefined ? i.population=0 : i.population=parseInt(i.population);

                            return ({
                                IDD: i.cca3,
                                name: i.name.common,
                                flags: i.flags[0],
                                continent: i.region,
                                capital: i.capital[0],
                                subregion: i.subregion,
                                area: i.area,
                                population: i.population  
                            })
                        }
                        )
                        const pais = await Country.bulkCreate (info);
                        res.send(info)
                    }
                    catch (error) {
                        console.log('Error en bulk: ' + error)
                    }


                })
                .catch((error)=>{
                    res.send(error)
                })
            }
            else{
                console.log('Base de Datos ya cargada')
                const p = await Country.findAll({
                    attributes: ['IDD','name','flags','continent', 'capital','subregion','area','population']
                })
                res.send(p)
            }
        }
        else 
        {
            //Devolver idd-Nombre-Imagen-Continente like %name% 
            // Devuelve arreglo de objetos como este:
            // [
            //   {
            //    "IDD": "BRA",
            //    "name": "Brazil",
            //    "continent": "Sin Datos Reportados",
            //    "flags": "https://flagcdn.com/br.svg"
            //  }
            //]

            const p = await Country.findAll(
                {
                    attributes: ['IDD','name','continent','flags','population'],
                    where: {
                        name: { 
                            [Op.iLike]: `%${name}%`,
                        }
                    }
                }

            )
            res.send(p);
        } 
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/activities", async (req,res,next)=>{
    try {
        const p = await Activity.findAll({
            attributes: ['idd','name','dificultad','duracion', 'temporada']
        })
        res.send(p)
    }
    catch (error) {console.log(error)}
})

router.get("/countriesxactivity/:idAct", async (req,res,next)=>{
    const {idAct} = req.params;
    if (!idAct) return (res.send('Actividad nula'))
    try {
        const p = await Activity.findByPk(
            idAct,
            { 
                include: [{
                    model:Country,
                    through: { attributes: []},
                    attributes: ['IDD','name','flags','continent','capital','population']
                }],
                attributes: []
            }    
        )
        if (p === null) res.send({'msg': 'Actividad sin pais asignado'});
        else {
            res.send(p)
        }
    }    
    catch (error) {
        res.send(error);
    }
})


router.post("/activity", async (req,res,next)=>{
    // Recibe x body los parametros
    // Opcion de alta
    const {iddAct , name , dificultad, duracion, temporada} = req.body;
    console.log(iddAct,name, parseInt(dificultad),duracion,temporada)
 
        if (!iddAct || !name || !dificultad || !duracion || !temporada) {res.send('Faltan datos')}
        else {
            const act = await Activity.create({
                idd:iddAct,name,dificultad: parseInt(dificultad),duracion,temporada
            })
            .then(() => {res.status(201).send({msg: 'Actividad Creada'})})
            .catch((e)=>{
                res.status(480)
                res.statusMessage=e
                res.send({msg: 'Actividad NO Creada'})})
       }
    }
)

router.post("/vincular", async (req,res,next)=>{
    // Vincula 1 actividad a 1 o varios paises

    const {iddAct , IDDPais} = req.body;

    try {
        
        if (!iddAct || !IDDPais) {
            res.send('Faltan datos')
        } else {
            const act = await Activity.findByPk(iddAct)
            if (!act) console.log('Actividad no encontrada')
            else{
                IDDPais.forEach(async (i) => {
                    const p = await Country.findByPk(i)
                    if (!p) console.log ('Pais ', i, 'no encontrado' )
                    else {
                        const r = await act.addCountries(p)
                    }
                })
            }
            res.send('Vinculacion Hecha')
        }

    }  
    catch(error) {
        console.log(error)
    }

})

module.exports = router;
