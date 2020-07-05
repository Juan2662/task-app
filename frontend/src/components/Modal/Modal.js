import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { useSelector } from 'react-redux'

export default function NuevaTarea (props){
    const global = useSelector(state => state)

    const initalState = () => {
        if(props.data){
            const {id, author, titulo, vence, prioridad} = props.data
            return{
                id,
                author,
                titulo,
                vence,
                prioridad

            }
        }else{
            return{
                author: global.isLogin.data.author,
                titulo: '',
                vence: '',
                prioridad: ''
            }
        }
    }
    const [state, setState] = useState(initalState)

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/api/newTask',{
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : `${global.isLogin.data.token}`
            }
        })
            .then(res => res.json())
            .then(() =>{ 
                props.update()
                props.onClose()
                
            })
            .catch(err => console.log(err))
    }

    const updateTask = (e) => {
        e.preventDefault()
        const {id, titulo, vence, prioridad} = state
        fetch(`http://localhost:4000/api/updateTask/${id}`,{
            method: 'PUT',
            body: JSON.stringify({titulo, vence, prioridad}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token' : `${global.isLogin.data.token}`
            }
        }) 
            .then(res => res.json())
            .then(() => {
                props.update()
                props.onClose()
                return {
                    ...state
                }
            })
            .catch(err => console.log(err))
    }
    const node = (
        <div className="focus">
            <div className="modal">
                <form>
                    <div className="header-modal">
                        <h2>{props.data ? 'Actualizar tarea' : 'Nueva Tarea'}</h2>
                    </div>
                    <div className="nombre-tarea">
                        <input 
                            className="input-modal"
                            type="text" 
                            name="titulo"
                            placeholder="Escriba el nombre de la tarea" 
                            onChange={handleChange}
                            defaultValue={state.titulo}
                        />
                    </div>
                    <div className="body-modal">
                        <div className="body-modal-fecha">
                            <p className="text-input" >Fecha: </p>
                            <input
                                className="input-modal" 
                                onChange={handleChange}
                                type="date" 
                                name="vence" 
                                step="1" 
                                min="2020-07-02" 
                                max="2022-12-31" 
                                defaultValue={state.vence}
                            />
                        </div>
                        <div className="body-modal-prioridad">
                            <p className="text-input">Prioridad</p>
                            <select className="input-modal input-modal-select" name="prioridad" onChange={handleChange}>
                                <option value={state.prioridad}>{state.prioridad}</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="footer-modal">
                        {
                            props.data ? 
                                <button
                                type="button"
                                    className="btn-modal" 
                                    onClick={updateTask}
                                >ACTUALIZAR</button> 
                                : 
                                <button 
                                    type="button"
                                    className="btn-modal" 
                                    onClick={handleAddTask}
                                >AGREGAR</button>
                        }
                        <button 
                            type="button"
                            className="btn-modal" 
                            onClick={props.onClose}
                        >CANCELAR</button>
                    </div>
                </form>
                    
            </div>
        </div>
    )
    return ReactDOM.createPortal(node, document.getElementById('modal'))
}