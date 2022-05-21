import { useState } from "react"

export default function FormularioAct(){

    // Uso valores locales del componente par validar info ingresada
  const [state, setState] = useState({dificultad:1 , temporada:'Verano'})
  const [errores, setErrores] = useState({
        nombre: 'el nombre es necesario'
  })

const guardarActividad = async function () {
    console.log('antes del fetch' , JSON.stringify(state))
    return fetch(`http://localhost:3001/activity`, {method: 'POST' , body: JSON.stringify(state), headers: {
        'Content-Type': 'application/json'
      },})
    .then(p => {
            alert('GuardadoOK');
            //return p;
    }) 
    .catch ((e) => 
    {
      alert('No se guardo',e.detail)
      return
      });
}  


  function validacionDelFormulario(input){

        let errores = {}
        var pattern = new RegExp(/^[A-Z0-9]+$/g);
        if(!input.iddAct) errores.iddAct = 'Ingrese una identificación válida <6 caracteres>'
        else {
            if ((input.iddAct.length !== 6 ) || !(pattern.test(input.iddAct)))
             errores.iddAct = 'Se requieren 6 caractes.(A-Z , 0-9)'
        }

        if(!input.name) errores.name = 'Ingrese una descripción'


        if((!input.duracion) || (input.duracion < 60) || (input.duracion > 180)) errores.duracion = 'Ingrese una duración válida (60 a 180 minutos)'
        console.log('Duracion' , input.duracion)


        console.log(errores)
        return errores

  }

  const onSubmitHandle = (e) => {
          e.preventDefault();
          alert("se envio la informacion")
          console.log(state)
          const r = guardarActividad();

    }


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

      <form onSubmit={(e) =>{onSubmitHandle(e)}}>
            <p> Código de Identificación: </p>
            <input onChange={(e)=> handleInputChange(e)}  type='text' name='iddAct' maxlength="6" required/>
            { errores && errores.iddAct ? <span style={ {color:'red'}}> { errores.iddAct }  </span> : null    }
            
            <p> Descripción </p>
            <input onChange={(e)=> handleInputChange(e)} type='text' name='name'  maxlength="40" required/>
            {  errores && errores.name ? <span style={ {color:'red'}}> { errores.name }  </span> : null    }

            <p> Dificultad (1-5)</p>
            <input type="radio" value="1" name="dificultad" defaultChecked onChange={(e)=> handleInputChange(e)}/>
            <input type="radio" value="2" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
            <input type="radio" value="3" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
            <input type="radio" value="4" name="dificultad" onChange={(e)=> handleInputChange(e)}/>
            <input type="radio" value="5" name="dificultad" onChange={(e)=> handleInputChange(e)}/>

            <p> Duracion (en minutos) </p>
            <input onChange={(e)=> handleInputChange(e)} type='number' name='duracion' required/>
            {   errores && errores.duracion ? <span style={ {color:'red'}}> { errores.duracion }  </span> : null    }

            <p> Temporada </p>
            <select name="temporada" onChange={(e)=> handleInputChange(e)}>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
            </select>

            <br/>
            <br/>
            <input type='submit' name='submit' value='Guardar actividad turísitica' disabled = { Object.keys(errores).length === 0 ? false : true  }/>
      </form>

    )
  }

