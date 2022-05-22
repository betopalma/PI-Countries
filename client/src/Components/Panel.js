import './Panel.css'
import {useDispatch , useSelector} from 'react-redux' 
import {useState,useEffect } from 'react'
import {getFilteredCountries,mostrarTodos,setearOrden} from '../Actions/actions.js'




function Panel() {
    //console.log('Cargo panel')
    const dispatch = useDispatch();
    const [filtro ,setFiltro] = useState({pais:'',continente:'',actividad:''});
    const {paisesLoaded,paisesAmostrar,activities} = useSelector((state)=> state);

    // const obtenerpaisfiltrado = function () {
    //     console.log('obtener paises filtrados x query',filtro.pais)
    //     return fetch(`http://localhost:3001/countries?name=${filtro.pais}`)
    //     .then(response => response.json())
    //     .then(p => {
    //         console.log ('en el then',p)
    //         return p;
    //     }
    //     )
    // }



    const paisHandler = async function (e) {
        try {
            //setFiltro({...filtro, pais:e.target.value})
            setFiltro({pais:e.target.value,continente:'',actividad:''})
            console.log('vacio campo')
            e.target.value=''
        }
        catch (error) {
            console.log(error)
        }
    }
    const continenteHandler = async function (e) {
        try{
            setFiltro({pais:'', continente:e.target.value,actividad:''})
            e.target.value=''
        }
        catch (error) {
            console.log(error)
        }

        // dispatch(getFilteredCountries(filtro));
    }
    const actividadHandler = function (e) {
        try{
            setFiltro({pais:'', continente:'',actividad:e.target.value})
            e.target.value=''
        }
        catch (error) {
            console.log(error)
        }
    }

    const ordenarArrayPAsc = function (x,y) {
        return x.name.localeCompare(y.name);
    }

    const ordenarArrayPDesc = function (x,y) {
        return y.name.localeCompare(x.name);
    }

    const ordenarArrayPoAsc = function (x,y) {
        console.log('en poasc')
        return (x.population - y.population)

    }
    const ordenarArrayPoDesc = function (x,y) {
        return (y.population - x.population)
    }

    const ordenarHandler = function (e) {
        console.log('OrdenarHandler', e.target.value)
        let ordenados = [];
        switch (e.target.value) {
            case 'PAsc':
                ordenados = paisesAmostrar.sort(ordenarArrayPAsc);
                break;
            case 'PDesc':
                ordenados = paisesAmostrar.sort(ordenarArrayPDesc);
                break;
            case 'PoAsc':
                ordenados = paisesAmostrar.sort(ordenarArrayPoAsc);
                break;
            case 'PoDesc':
                ordenados = paisesAmostrar.sort(ordenarArrayPoDesc);
                break;
            default:
                ordenados = paisesAmostrar.sort(ordenarArrayPAsc)             
            };
            console.log('OrdenarHandler',ordenados)
            dispatch(setearOrden(ordenados));

        // function SortArray(x, y){
        //     return x.name.localeCompare(y.name);
        // }
        // var dataO = data.sort(SortArray);

    }

    const todos = function() {
         dispatch(mostrarTodos());
    }



    useEffect(() => {
        //const data = obtenerpaisfiltrado();
        if (filtro.pais==='' && filtro.continente==='' && filtro.actividad==='') return;
        if (filtro.pais!=='') {
            console.log('obtener paises filtrados x query',filtro.pais)
            return fetch(`http://localhost:3001/countries?name=${filtro.pais}`)
            .then(response => response.json())
            .then(p => {
                console.log ('en el then del useeffect recibido',p)
                console.log ('en el then del useeffect filtro:',filtro)
                if (p.length!==0) {
                    dispatch(getFilteredCountries(p));
                    return p;
                } 
                else {
                    alert('Pais no encontrado');
                    return p;
                }
            })
        }
        if (filtro.continente!=='') {
            const mostrar = paisesLoaded.filter((e)=>  e.continent === filtro.continente ? e : null)
            console.log('Mostrar',mostrar)
            if (mostrar.length!==0) {
                dispatch(getFilteredCountries(mostrar));
                return mostrar;
            } 
            else {
                alert('Continente no encontrado');
                return mostrar;
            }
        }
        if (filtro.actividad!=='') {
            console.log('Actividad',filtro.actividad)
            return fetch(`http://localhost:3001/countriesxactivity/${filtro.actividad}`)
            .then(response => response.json())
            .then(p => {
                if (p.countries.length!==0) {
                    dispatch(getFilteredCountries(p.countries));
                    return p;
                } 
                else {
                    alert('Actividad sin pais Asignado');
                    return p;
                }
            })




            const mostrar = paisesAmostrar.filter((e)=>  e.actividad === filtro.actividad ? e : null)
            if (mostrar.length!==0) {
                dispatch(getFilteredCountries(mostrar));
                return mostrar;
            } 
            else {
                alert('La actividad '+filtro.actividad+' no posee pais asignado');
                return mostrar;
            }
        }
        
    }, [filtro]);

    return (
        <div className='Panel'>
            <div className='PanelFiltro'>
                <div className='PanelInput'>
                    <label>Pais:</label>
                    <input type="text" id="pInputP" onBlur={(e)=>{paisHandler(e)}} />
                </div>
                <div className='PanelInput'>
                    <label>Continente:</label>
                    <input type="text" id="pInputC" onBlur={(e)=>{continenteHandler(e)}} />
                </div>
                <div className='PanelInput'>
                    <label>Tipo Actividad:</label>
                    <select name="actividad" id="pInputA" onBlur={(e)=>{actividadHandler(e)}}>
                            <option value="" ></option>
                            {activities ? activities.map((e)=><option value={e.idd}>{e.name}</option>): null}
                    </select>
                </div>
            </div>
            <div className="PanelBsc">
                <button id='BtnBuscar'>Buscar</button>
                <button id='BtnBuscar' onClick={()=>{todos()}}>Mostrar Todos</button>
            </div>
            <div className='PanelOrden'>
                <div className='PanelOPais'>
                    <label id='PanelPAsc'>Orden Pais: Ascendente</label>
                    <input type="radio" id="PaisA" value="PAsc" name="Ordenar" onClick={(e)=>{ordenarHandler(e)}} defaultChecked/>
                    <label id='PanelPDes'>Descendente</label>
                    <input type="radio" id="PaisD" value="PDesc" name="Ordenar" onClick={(e)=>{ordenarHandler(e)}}/>
                </div>
                <div className='PanelOPob'>
                    <label>Orden Poblacion: Ascendente</label>
                    <input type="radio" id="PobA" value="PoAsc" name="Ordenar" onClick={(e)=>{ordenarHandler(e)}}/>
                    <label>Descendente:</label>
                    <input type="radio" id="PobD" value="PoDesc" name="Ordenar" onClick={(e)=>{ordenarHandler(e)}}/>
                </div>
            </div>
            <div className="PanelAct">

                <button id='PBtn' >Asignar Actividad</button>

            </div>
        </div>

    )
}

export default Panel;
