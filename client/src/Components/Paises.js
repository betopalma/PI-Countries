import './Paises.css'
import React, { useEffect, useState } from 'react';
import Pais from './Pais.js'
import {useDispatch , useSelector} from 'react-redux' 
import {Redirect} from 'react-router-dom';
import {setOffset} from '../Actions/actions.js'

function Paises (props) {

    const {paisesLoaded,paisesAmostrar,offset} = useSelector((state)=> state);
    const dispatch=useDispatch();

    useEffect (()=>{
        console.log('En Use effect de paises' , offset)
    },[paisesAmostrar,offset])

    const primero = function () {
        dispatch(setOffset(0));
    }

    const proximo = function () {
        console.log('Pulsoo proximo');
        let valor = 0;
        if (offset+10 > paisesAmostrar.length-1 ) valor = offset;
        else valor=offset+10
        dispatch(setOffset(valor));
        //(offset+10) > paisesAmostrar.length-11 ? dispatch(setOffset(paisesAmostrar.length-11)) : dispatch(setOffset(offset+10));
        console.log('Nuevo offset',offset);
    }

    const anterior = function () {
        console.log('Pulsoo anterior');
        let valor = 0;
        if (offset-10 < 0 ) valor = 0 ;
        else valor=offset-10;
        dispatch(setOffset(valor));
        //(offset-10) < 0 ? dispatch(setOffset(0)) : dispatch(setOffset(offset-10));
        console.log('Nuevo offset',offset);
    }

    const ultimo = function () {
        let valor = 0;
        if (paisesAmostrar.length-11 >=0 ) valor = paisesAmostrar.length-10;

        dispatch(setOffset(valor));
    }

    if (paisesAmostrar.length <= 0) return <Redirect to="/" />;
    
    return (
        <>
            <div className='Paises'>
                {paisesAmostrar.length > offset + 0 ? <Pais posicion={`${offset + 0}`}/> :null} 
                {paisesAmostrar.length > offset + 1 ? <Pais posicion={`${offset + 1}`}/> :null}
                {paisesAmostrar.length > offset + 2 ? <Pais posicion={`${offset + 2}`}/> :null}
                {paisesAmostrar.length > offset + 3 ? <Pais posicion={`${offset + 3}`}/> :null}
                {paisesAmostrar.length > offset + 4 ? <Pais posicion={`${offset + 4}`}/> :null}
                {paisesAmostrar.length > offset + 5 ? <Pais posicion={`${offset + 5}`}/> :null}
                {paisesAmostrar.length > offset + 6 ? <Pais posicion={`${offset + 6}`}/> :null}
                {paisesAmostrar.length > offset + 7 ? <Pais posicion={`${offset + 7}`}/> :null}
                {paisesAmostrar.length > offset + 8 ? <Pais posicion={`${offset + 8}`}/> :null}
                {paisesAmostrar.length > offset + 9 ? <Pais posicion={`${offset + 9}`}/> :null}
            </div>
            <div>
                <button className='PBtn' onClick={()=>{primero()}}>Primero</button>       
                <button className='PBtn' onClick={()=>{anterior()}}>Anterior</button>            
                <button className='PBtn' onClick={()=>{proximo()}}>Proximo</button>
                <button className='PBtn' onClick={()=>{ultimo()}}>Ultimo</button>       
            </div>
        </>
    )
}


export default Paises;