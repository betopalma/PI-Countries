import './Bienvenida.css'
import {Link} from 'react-router-dom'

function Bienvenida() {
    return (
        <div className='Fondo'>
            <Link to='/home'>Iniciar</Link>
        </div>
    )
}

export default Bienvenida;