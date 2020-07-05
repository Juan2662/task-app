import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Login(props){
    const Dispatch = useDispatch()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if(response.auth === false){
                    return setErrors(response.status)
                }
                if(response.auth === true){
                    Dispatch({
                        type: 'ISLOGIN',
                        payload: response.data
                    })
                    
                    setErrors({...errors})
                    props.history.push('/task')
                    

                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container-login">
            <div>
                <form className="form-login">
                    <div>
                        <i className="fas fa-user"></i>
                        <input
                            name="email"
                            type="text" 
                            placeholder="Usuario"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div>
                        <i className="fas fa-key"></i>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Contraseña"
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div>
                        <button 
                            type="button"
                            className="btn-user" 
                            onClick={onSubmit}
                        >INICIAR SESION</button>
                    </div>
                    <div>
                        {errors.length ? <p style={{color: 'red'}}>{errors}</p> : ''}
                    </div>
                    <div className="form-footer">
                        <Link to="/register">¿No tienes una cuenta?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
