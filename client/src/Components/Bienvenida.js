import './Bienvenida.css'

import {useDispatch, useSelector} from 'react-redux' 

import {useHistory} from 'react-router-dom'

import {getCountries,getActivities,setOffset} from '../Actions/actions.js'



function Bienvenida() {

    const dispatch = useDispatch();
    const {paisesLoaded} = useSelector((state)=> state);
    const history = useHistory();

    const obtenerpais = function () {
        console.log('obtener paises')
        return fetch(`http://localhost:3001/countries`)
        .then(response => response.json())
        .then(p => {
            console.log ('en el then',p)
            return p;
        }
        )
    }

    const obteneractividades = function () {
        console.log('obtener actividades')
        return fetch(`http://localhost:3001/activities`)
        .then(response => response.json())
        .then(p => {
            console.log ('en el then',p)
            return p;
        }
        )
    }
    const onClickHandler = async (e) => {
        try {
            const data = await obtenerpais();
            const ndata = data.map((e)=>{return {...e, population: parseInt(e.population)}})
            const newdata = ndata.map((e)=>{ return {...e, checked:false}})
            console.log('datos obtenidos' , newdata)
            dispatch(getCountries(newdata));
            console.log("despues del dispatch " , paisesLoaded.length)
            const activ = await obteneractividades();
            dispatch(getActivities(activ));
            dispatch(setOffset(-1))
            history.push("/home")    
        }
        catch (e) {
            console.log(e)
        }
 

    }

    return (
        <div className='Fondo'>
            <button id="BndBtn" onClick={
                    ((e)=>{onClickHandler(e)})
                }>Bienvenidos !</button> 
        </div>
    )
}

export default Bienvenida;