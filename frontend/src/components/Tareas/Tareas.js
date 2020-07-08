import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Tareas.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Tareas (){
    const Dispatch = useDispatch()
    const state = useSelector(state => state)

    const [tareas, setTareas] = useState({
        data: [],
        filterByName: []
    })
    
    function getTareas(){
        if(state.isLogin.status){
            fetch('http://localhost:4000/api/task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': `${state.isLogin.data.token}`
            }
        })
            .then(res => res.json())
            .then(response => {
                let tareasUser = response.filter(item => item.author === state.isLogin.data.author)
                setTareas({...tareas, data: tareasUser})
            })
            .catch(err => console.log(err))
        }else{
            return false
        }
        
    }
    useEffect(() => {
        getTareas()
    },[])
    
    function getFechaTasks(){
        tareas.data.forEach(({ vence, titulo }) => {
          let remainTime = (new Date(vence) - new Date() + 1000) / 1000,
          remainDays = Math.floor(remainTime /(3600 * 24))
    
          if(remainDays <= '00'){
              toast.warn(`${titulo} esta por vencer!`)
          }
        });
    }getFechaTasks()

    const handleChange = (e) => {
        const filter = tareas.data.filter(item => item.titulo.toLowerCase().includes(e.target.value.toLowerCase()))
        setTareas({
            ...tareas,
            filterByName: filter
        })  
    }
    const deteteTarea = (id) => {
        fetch(`http://localhost:4000/api/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': `${state.isLogin.data.token}`
            }
        })
            .then(res => res.json())
            .then(() => {
                setTareas({...tareas})
                getTareas()  
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container-task">
            <ToastContainer />
            <div className="settings">
                <div className="settings-btn-add">
                    <button
                        type="button"
                        disabled={state.isLogin.status ? false : true}
                        onClick={() => Dispatch({type: 'SHOWMODAL'})}
                    >NUEVA TAREA</button>
                </div>
                <div className="settings-sarch">
                    <input type="search" placeholder="Buscar tarea..." onChange={handleChange}/>
                </div>
            </div>
            {
                state.isLogin.status ?
                
                    tareas.filterByName.length > 0 ? tareas.filterByName.map((item, index) => {
                        return(
                            <div className="tarea" key={index}>
                                <div className="tarea-data">
                                    <p>{item.titulo}</p>
                                    <small className="prioridad">{item.prioridad.toUpperCase()}</small>
                                </div>
                                <div className="tarea-fecha">
                                    <p>{item.vence}</p>
                                </div>
                                <div className="tarea-settings">
                                    <i className="fas fa-pen"
                                        onClick={() =>{
                                            Dispatch({type:'SHOWMODAL', payload: {
                                                id: item._id,
                                                author: item.author,
                                                titulo: item.titulo,
                                                vence: item.vence,
                                                prioridad: item.prioridad
                                            }})
                                        }}></i>
                                    <i className="fas fa-trash" onClick={() => deteteTarea(item._id)}></i>
                                </div>
                            </div>
                        )
                    })
                    :
                    tareas.data.length > 0 ? tareas.data.map((item, index) => {
                        return(
                            <div className="tarea" key={index}>
                                <div className="tarea-data">
                                    <p>{item.titulo}</p>
                                    <small className="prioridad">{item.prioridad.toUpperCase()}</small>
                                </div>
                                <div className="tarea-fecha">
                                    <p>{item.vence}</p>
                                </div>
                                <div className="tarea-settings">
                                    <i className="fas fa-pen"
                                        onClick={() =>{
                                            Dispatch({type:'SHOWMODAL', payload: {
                                                id: item._id,
                                                author: item.author,
                                                titulo: item.titulo,
                                                vence: item.vence,
                                                prioridad: item.prioridad
                                            }})
                                        }}></i>
                                    <i className="fas fa-trash" onClick={() => deteteTarea(item._id)}></i>
                                </div>
                            </div>
                        )
                    }): <h1 className="sintareas">No tienes tareas pendientes :)</h1>
                : <div className="msg-login">
                    <h1>Por favor inicia sesion</h1>
                    <Link to="/login">Iniciar sesion</Link>
                </div>
            }
            {
                state.showModal.status && state.showModal.data ? <Modal data={state.showModal.data} update={() => getTareas()} onClose={() => Dispatch({type: 'SHOWMODAL'})}/> 
                :
                state.showModal.status && state.showModal.data === false ? <Modal update={() => getTareas()} onClose={() => Dispatch({type: 'SHOWMODAL'})}/> : '' 
            }
        </div>
    )
}
