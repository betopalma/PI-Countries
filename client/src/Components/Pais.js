import './Pais.css'
import {useDispatch , useSelector} from 'react-redux' 
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
// import {PaisDetalle} from './PaisDetalle.js'
import {getCountriesDetails} from '../Actions/actions.js'

function Pais (props) {
    
    const {paisesLoaded,paisesAmostrar} = useSelector((state)=> state);
    const {posicion} = props;
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect (()=>{
        console.log('En Use effect de pais' , posicion)
    },[paisesAmostrar])

    const obtenerdetalle = function (id) {
        console.log('obtener detalle paises')
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(p => {
            console.log ('en el then de obtener detalle',p)
            return p;
        }
        )
    }

    const onClickButtonHandler = async function (pos) {
        //despachar funcion de carga de detalle y actividades en el store
        //cargar con idd de pais
        console.log('en detalle posicion',pos,paisesAmostrar[pos].IDD)

        try {
            const data = await obtenerdetalle(paisesAmostrar[pos].IDD);
            console.log('datos obtenidos del detail' , data)
            dispatch(getCountriesDetails(data));
            console.log("despues del dispatch de details" , paisesLoaded.length)
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
                <input type="checkbox" className='PaisCheck'></input>
                <p></p>
                <button onClick={(e)=>{onClickButtonHandler(posicion)}}>Mas Detalle</button>
            </div>
            
        </div>
    )
}

export default Pais;