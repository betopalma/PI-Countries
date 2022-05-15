import './Pais.css'
import {useDispatch , useSelector} from 'react-redux' 

function Pais (props) {
    
    const {paisesLoaded} = useSelector((state)=> state);
    const {posicion} = props;

    return (
        <div className='PaisRecuadro'>
            <div className='PaisDatos'>
                <div className='InfoPais'>
                    {`Pais: ${paisesLoaded[posicion].name}`}
                </div>
                <div className='InfoPais'>
                {`Continente: ${paisesLoaded[posicion].subregion}`}
                </div>
                <div className='PaisImg' >
                    <img src={paisesLoaded[posicion].flags} alt="Bandera" width="50%" height="50%"></img>
                </div>
            </div>
            <div className='PaisControles'>
                <input type="checkbox" className='PaisCheck'></input>
                <p></p>
                <p></p>
                <p></p>
                <button>Mas Detalle</button>
            </div>
            
        </div>
    )
}

export default Pais;