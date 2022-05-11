const { Router } = require('express');
const axios = require('axios');

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
    //res.send("En countries por param")
// Ruta de detalle de país__: debe contener
// - [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// - [ ] Código de país de 3 letras (id)
// - [ ] Capital
// - [ ] Subregión
// - [ ] Área (Mostrarla en km2 o millones de km2)
// - [ ] Población
// - [ ] Actividades turísticas con toda su información asociada

    const {idPais} = req.params;
    if (!idPais) return (res.send('Pais nulo'))
    try {
        const p = await Country.findByPk(
            idPais.toUpperCase(),
            { 
                include: [{
                    model:Activity,
                    through: { attributes: []},
                    attributes: ['IDD','name','dificultad','duracion','temporada']
                }],
                attributes: ['IDD','name','flags','capital','subregion','area','population']
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
    // Si no es por query, si la tabla countries esta vacia, debe llenarla
    const {idpais} = req.query;
    try {
        if (idpais===undefined)
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
                            i.continent === undefined ? i.continent='Sin Datos Reportados' : null;
                            i.capital === undefined ? i.capital=['Sin Datos Reportados'] : null;
                            i.subregion === undefined ? i.subregion='Sin Datos Reportados' : null;
                            i.area === undefined ? i.area=0 : i.area=parseFloat(i.area);
                            i.population === undefined ? i.population=0 : i.population=parseInt(i.population);

                            return ({
                                IDD: i.cca3,
                                name: i.name.common,
                                flags: i.flags[0],
                                continent: i.continent,
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
            //res.send('Base Ya Cargada')
        }
        else 
        {
            //Aced
            res.send("En countries por query: "+idpais)
        } 
    }
    catch (error) {
        console.log(error)
    }
})





router.get("/activity", async (req,res,next)=>{

    //console.log(await Country.countActivity());
    //Country.getActivities();
    //const c = Country.getActivities();
    // const sky = Activity.create({
    //     IDD: '1',
    //     name:'Sky1',
    //     dificultad:1,
    //     duracion:'10min',
    //     temporada:'Verano'
    // })
    // const sky2 = Activity.create({
    //     IDD: '2',
    //     name:'Sky2',
    //     dificultad:1,
    //     duracion:'30min',
    //     temporada:'Primavera'
    // })
    try {
    const p = await Country.findByPk('ARG');
    const a = await Activity.findByPk(1);
    const b = await Activity.findByPk(2);
    console.log(p)
    await p.addActivity(a);
    await p.addActivity(b);
    //await p.addActivity(sky);
 

    }
    catch (error) {
        console.log(error)
    }
    
    res.send(Activity.findAll())
})

module.exports = router;
