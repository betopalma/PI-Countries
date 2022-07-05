import './Panel.css'
import {useDispatch , useSelector} from 'react-redux' 
import {useState,useEffect } from 'react'
import {getFilteredCountries,mostrarTodos,setearOrden} from '../Actions/actions.js'

function Panel() {

    const dispatch = useDispatch();
    const [filtro ,setFiltro] = useState({pais:'',continente:'',actividad:''});
    const [filtroAmostrar, setfiltroAmostrar] = useState('');
    const [asignarBtn, setAsignarBtn] = useState({idd:'',IDDPais:[]});
    const {paisesLoaded,paisesAmostrar,activities,checked} = useSelector((state)=> state);
    
    const paisHandler = async function (e) {
        try {
            setFiltro({pais:e.target.value,continente:'',actividad:''})
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
    }
    const actividadHandler = function (e) {
        try{
            setFiltro({pais:'', continente:'',actividad:e.target.value})
            if (e.target.value !=='') {
                setfiltroAmostrar(e.target.value)
            }
            e.target.value=''
        }
        catch (error) {
            console.log(error)
        }
    }


    const asignarActividadHandler = function (e) {
        //setea la actividad en el estado
        try{
            setAsignarBtn({...asignarBtn,idd:e.target.value})
        }
        catch (error) {
            console.log(error)
        }   
    }
   
    const asignarBotonHandler = async function (e) {
        //Obtener arreglo de IDDPais con la opcion checked en true
        const p= paisesLoaded.filter((item)=>item.checked===true)
        const data=p.map((item)=>item.IDD)
        const vincular = {idd:asignarBtn.idd,IDDPais:data}
        return fetch(`http://localhost:3001/vincular`, 
        {method: 'POST' ,
             body: JSON.stringify(vincular),
                   headers: {
                         'Content-Type': 'application/json'
                   },
       })
       .then(p => {
        //if (!p.ok) throw Error(p.status);
        if (!p.ok) {
              alert('Error!! Asignación no creada');
              console.log(p)
        } else {
           alert('Asignación creada exitosamente')
        }
      }) 
      .catch (e => console.log('Error al guardar',e));
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
            dispatch(setearOrden(ordenados));

    }

    const todos = function() {
         dispatch(mostrarTodos());
         setfiltroAmostrar('')
    }

    useEffect(() => {
        //const data = obtenerpaisfiltrado();
        if (filtro.pais==='' && filtro.continente==='' && filtro.actividad==='') return;
        if (filtro.pais!=='') {
            return fetch(`http://localhost:3001/countries?name=${filtro.pais}`)
            .then(response => response.json())
            .then(p => {
                console.log(p);
                if (p.length!==0) {
                    dispatch(getFilteredCountries(p));
                    setfiltroAmostrar(filtro.pais)
                    return p;
                } 
                else {
                    alert('Pais no encontrado');
                    return p;
                }
            })
        }
        if (filtro.continente!=='') {
            const mostrar = paisesLoaded.filter((e)=>  e.continent.toLowerCase() === filtro.continente.toLowerCase() ? e : null)
            if (mostrar.length!==0) {
                dispatch(getFilteredCountries(mostrar));
                setfiltroAmostrar(filtro.continente)
                return mostrar;
            } 
            else {
                alert('Continente no encontrado');
                return mostrar;
            }
        }
        if (filtro.actividad!=='') {
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
     }
        
    }, [filtro,activities]);

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
                <div align='left' margin='10px'>
                    {filtroAmostrar !== '' ? <div id='TipoFiltro'>Filtrado por: {filtroAmostrar}</div> : <div id='TipoFiltro'>Sin filtro aplicado</div>}
                </div>
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
                <div className='PanelInput'>
                        <label>Tipo Actividad:</label>
                        <select name="asignarActividad" id="pAct" onBlur={(e)=>{asignarActividadHandler(e)}}>
                                <option value="" ></option>
                                {activities ? activities.map((e)=><option value={e.idd}>{e.name}</option>): null}
                        </select>
                </div>
                <button id='PBtn' disabled={(checked>0 && asignarBtn.idd!=='')? false : true} onClick={(e)=>{asignarBotonHandler(e)}}>Asignar Actividad a Paises Seleccionados</button>
                Paises seleccionados: {checked}

            </div>
        </div>

    )
}

export default Panel;
