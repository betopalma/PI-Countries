import './Panel.css'
import {useDispatch , useSelector} from 'react-redux' 
import {useState,useEffect } from 'react'
import {getFilteredCountries,mostrarTodos} from '../Actions/actions.js'




function Panel() {
    //console.log('Cargo panel')
    const dispatch = useDispatch();
    const [filtro ,setFiltro] = useState({pais:'',continente:'',actividad:''});
    const {paisesLoaded,paisesAmostrar} = useSelector((state)=> state);

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
        console.log('On blur' , e.target.value)
        // setFiltro({...filtro, actividad:e.target.value})
        // dispatch(getFilteredCountries(filtro));
    }

    const todos = function() {
         dispatch(mostrarTodos());
    }

    useEffect(() => {
        //const data = obtenerpaisfiltrado();
        if (filtro.pais==='' && filtro.continente==='') return;
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
                    <input type="text" id="pInputA" onBlur={(e)=>{actividadHandler(e)}}/>
                </div>
            </div>
            <div className="PanelBsc">
                <button id='BtnBuscar'>Buscar</button>
                <button id='BtnBuscar' onClick={()=>{todos()}}>Mostrar Todos</button>
            </div>
            <div className='PanelOrden'>
                <div className='PanelOPais'>
                    <label>Orden Pais:</label>
                    <label id='PanelPAsc'>Ascendente</label>
                    <input type="radio" id="PaisA" value="Asc" name="Ordenar"/>
                    <label id='PanelPDes'>Descendente</label>
                    <input type="radio" id="PaisD" value="Desc" name="Ordenar"/>
                </div>
                <div className='PanelOPob'>
                    <label>Orden Poblacion: Ascendente</label>
                    <input type="radio" id="PobA" value="Asc" name="Ordenar"/>
                    <label>Descendente:</label>
                    <input type="radio" id="PobD" value="Desc" name="Ordenar"/>
                </div>
            </div>
            <div className="PanelAct">

                <button id='PBtn' >Asignar Actividad</button>

            </div>
        </div>

    )
}

export default Panel;
