import './Bienvenida.css'

import {useDispatch, useSelector} from 'react-redux' 

import {getCountries} from '../Actions/actions.js'

function Bienvenida() {

    const dispatch = useDispatch();

    return (
        <div className='Fondo'>
            <button onClick={()=>dispatch(getCountries())}>Iniciarrrrrrrrrrrrrrrrrrrr </button> 
        </div>
    )
}

export default Bienvenida;