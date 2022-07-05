import './Pais.css'
import {useDispatch , useSelector} from 'react-redux' 
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import {getCountriesDetails,setCountryCheck} from '../Actions/actions.js'

function Pais (props) {
    
    const {paisesLoaded,paisesAmostrar} = useSelector((state)=> state);
    const {posicion} = props;
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect (()=>{
        //console.log('En Use effect de pais' , posicion)
    },[paisesAmostrar])

    const obtenerdetalle = function (id) {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(p => {
            return p;
        })
    }

    const estadoCheck = function (id) {
        const x = paisesLoaded.findIndex((e)=>e.IDD===id)
        return paisesLoaded[x].checked;
    }

    const onChangeCheckBoxHandler = function (id) {
        //poner en paisesLoaded => check: !check para el objeto IDD=id
        //Buscar el indice para el IDD
        const indice = paisesLoaded.findIndex ((e)=>e.IDD===id)
        const data = paisesLoaded;
        data[indice].checked=!data[indice].checked
        const cant=(data.filter((e)=>e.checked===true)).length
        dispatch(setCountryCheck({data:data,checked:cant}))
    }

    const onClickButtonHandler = async function (pos) {
        //despachar funcion de carga de detalle y actividades en el store
        //cargar con idd de pais

        try {
            const data = await obtenerdetalle(paisesAmostrar[pos].IDD);
            dispatch(getCountriesDetails(data));
            history.push('/detallepais') 
        }
        catch (e) {
            console.log(e)
        }
     }


    return (
        <div className='PaisRecuadro'>
            <div className='PaisDatos'>
                <div className='InfoPais'>
                    {`Pais: ${paisesAmostrar[posicion].name}`}
                </div>
                <div className='InfoPais'>
                {`Continente: ${paisesAmostrar[posicion].continent}`}
                </div>
                <div className='PaisImg' >
                    <img src={paisesAmostrar[posicion].flags} alt="Bandera" width="50%" height="50%"></img>
                </div>
            </div>
            <div className='PaisControles'>
                <input type="checkbox" className='PaisCheck' onChange={(e)=>{onChangeCheckBoxHandler(paisesAmostrar[posicion].IDD)}} 
                    checked={estadoCheck(paisesAmostrar[posicion].IDD)}></input>
                <p></p>
                <button className='Boton' onClick={(e)=>{onClickButtonHandler(posicion)}}>Más detalle</button>
            </div>
            
        </div>
    )
}

export default Pais;