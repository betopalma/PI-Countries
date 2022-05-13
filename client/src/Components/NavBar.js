import './NavBar.css';
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <div className='NavBar'>
            <div className='EnlacesNavBar'>
                <Link to='/'>Inicio</Link>
            </div>
            <div className='EnlacesNavBar'>
                <Link to='/home'>Paises</Link>
            </div>
            <div className='EnlacesNavBar'>
                <Link to='/activity'>Actividades Turisticas</Link>
            </div>

        </div>
    )
}

export default NavBar