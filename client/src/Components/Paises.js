import './Paises.css'
import React, { useEffect, useState } from 'react';
import Pais from './Pais.js'
import {useDispatch , useSelector} from 'react-redux' 

function Paises (props) {
    let [offset,setOffset] =useState(0);
    const {paisesLoaded} = useSelector((state)=> state);
    
    useEffect (()=>{
        console.log('En Use effect de paises' , offset)
    },[offset])

    const primero = function () {
        setOffset(0);
    }

    const proximo = function () {
        console.log('Pulsoo proximo');
        (offset+9) > paisesLoaded.length-10 ? setOffset(paisesLoaded.length-10) : setOffset(offset+9);
        console.log('Nuevo offset',offset);
    }

    const anterior = function () {
        console.log('Pulsoo anterior');
        (offset-9) < 0 ? setOffset(0) : setOffset(offset-9);
        console.log('Nuevo offset',offset);
    }

    const ultimo = function () {
        setOffset(paisesLoaded.length-10)
    }


    return (
        <>
            <div className='Paises'>
                <Pais posicion={`${offset + 0}`}/>
                <Pais posicion={`${offset + 1}`}/>
                <Pais posicion={`${offset + 2}`}/>
                <Pais posicion={`${offset + 3}`}/>
                <Pais posicion={`${offset + 4}`}/>
                <Pais posicion={`${offset + 5}`}/>
                <Pais posicion={`${offset + 6}`}/>
                <Pais posicion={`${offset + 7}`}/>
                <Pais posicion={`${offset + 8}`}/>
            </div>
            <div>
                <button onClick={()=>{primero()}}>Primero</button>       
                <button onClick={()=>{anterior()}}>Anterior</button>            
                <button onClick={()=>{proximo()}}>Proximo</button>
                <button onClick={()=>{ultimo()}}>Ultimo</button>       
            </div>
        </>
    )
}


export default Paises;