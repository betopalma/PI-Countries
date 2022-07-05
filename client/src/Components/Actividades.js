import './Actividades.css'
import { useState, useEffect } from "react"
import {getActivities} from '../Actions/actions.js'
import {useDispatch,useSelector} from 'react-redux' 

export default function FormularioAct(){

    // Uso valores locales del componente para validar info ingresada
  const [state, setState] = useState({idd:'' , name:'',dificultad:1 , duracion:'' ,temporada:'Verano'})
  const [errores, setErrores] = useState({})
  const {activities} = useSelector((state)=> state);
  const dispatch=useDispatch()

const guardarActividad = async function () {

    return fetch(`http://localhost:3001/activity`, 
       {method: 'POST' ,
            body: JSON.stringify(state),
                  headers: {
                        'Content-Type': 'application/json'
                  },
      })
    .then(p => {
      //if (!p.ok) throw Error(p.status);
      if (!p.ok) {
            if (p.statusText.includes('llave duplicada')) alert('Error!! Código de Identificación existente');
            else alert('Error!! Actividad no creada: ' + p.statusText)
      } else {
         alert('Actividad agregada exitosamente')
         let data = activities
         data.push(state)
         dispatch(getActivities(data))
         setState({idd:'' , name:'',dificultad:1 , duracion:'' ,temporada:'Verano'})
         return p;
      }
    }) 
    .catch (e => console.log('Error al guardar',e));
}  


  function validacionDelFormulario(input){

        let errores = {}
        var pattern = new RegExp(/^[A-Z0-9]+$/g);
        if(!input.idd) errores.idd = 'Ingrese una identificación válida <6 caracteres>'
        else {
            if ((input.idd.length !== 6 ) || !(pattern.test(input.idd)))
             errores.idd = 'Se requieren 6 caractes.(A-Z , 0-9)'
        }

        if(!input.name) errores.name = 'Ingrese una descripción'


        if((!input.duracion) || (input.duracion < 60) || (input.duracion > 180)) errores.duracion = 'Ingrese una duración válida (60 a 180 minutos)'
        console.log('Duracion' , input.duracion)

        return errores

  }

  const onSubmitHandle = (e) => {
          e.preventDefault();
          const r = guardarActividad();
    }

    useEffect(() => {

    }, [state]);


  function handleInputChange(evento){

        setState({
              ...state,
              [evento.target.name]: evento.target.value
        } )

        setErrores(validacionDelFormulario({
              ...state,
              [evento.target.name]: evento.target.value
        }))
        
  }


  return(
      <div id='Cform'>
      <form id='form' onSubmit={(e) =>{onSubmitHandle(e)}}>
            <div className='Rform'>
            <p className='Lform'> Código de Identificación: </p>
                  <input className='Iform' onChange={(e)=> handleInputChange(e)}  type='text' name='idd' maxlength="6" value={state.idd}required/>
                  { errores && errores.idd ? <span style={ {color:'red'}}> { errores.idd }  </span> : null    }
            </div>

            <div className='Rform'>
                  <p className='Lform'> Descripción: </p>
                  <input className='Iform' onChange={(e)=> handleInputChange(e)} type='text' name='name'  maxlength="40" value={state.name} required/>
                  {  errores && errores.name ? <span style={ {color:'red'}}> { errores.name }  </span> : null    }
            </div>
            <div className='Rform'>
                  <p className='Lform'> Dificultad (1-5)</p>
                  <input type="radio" value="1" name="dificultad" defaultChecked onChange={(e)=> handleInputChange(e)}/>
                  <input type="radio" value="2" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
                  <input type="radio" value="3" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
                  <input type="radio" value="4" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
                  <input type="radio" value="5" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div className='Rform'>
                  <p className='Lform'> Duracion (en minutos): </p>
                  <input className='Iform' onChange={(e)=> handleInputChange(e)} type='number' name='duracion' value={state.duracion} required/>
                  {   errores && errores.duracion ? <span style={ {color:'red'}}> { errores.duracion }  </span> : null    }
            </div>

      <div className='Rform'>
                  <p className='Lform'> Temporada </p>
                  <>
                  <select className='Iform' name="temporada" onChange={(e)=> handleInputChange(e)}>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                  </select>
                  </>
      </div>

            <br/>
            <br/>
            <input id='Bform' type='submit' name='submit' value='Guardar actividad turísitica' disabled = { Object.keys(errores).length === 0 ? false : true  }/>
      </form>
      </div>
    )
  }

