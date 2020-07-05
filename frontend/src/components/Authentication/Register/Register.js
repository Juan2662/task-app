import React, {useState} from 'react'
import {Formik, Field, ErrorMessage} from 'formik'
import './Register.css'

import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Register(props){
    const Dispatch = useDispatch()
    const [state, setState] = useState({
        errors: ''
    })
    return (
        <div className="container-register">
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    repitPassword: ''
                }}
                validate={values => {
                    const errors = {}
                    if(!values.name){
                        errors.name = 'Este campo es requerido'
                    }
                    if(!values.email){
                        errors.email = 'Este campo es requerido'
                    }
                    if(values.password.length < 4){
                        errors.password = 'La contraseña debe contener mas 4 o mas caracteres'
                    }else if (values.password !== values.repitPassword) {
                        errors.repitPassword = 'Las contraseñas no coinciden'
                    }
                    return errors
                }}
                onSubmit={(values) => {
                    fetch(`http://localhost:4000/api/register`,{
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }) 
                        .then(res => res.json())
                        .then((response) => {
                            if(response.status === 11000){
                                setState({
                                    errors: 'Ya existe un usuario con este correo'
                                })
                            }else{
                                console.log('Al registrar reigtser ->', response.data)
                                Dispatch({
                                    type: 'ISLOGIN',
                                    payload: response.data
                                })
                                setState({...state})
                                props.history.push('/')
                            }
                        })
                        .catch(err => console.log(err))
                }}
            >
                {
                    ({errors, handleChange, handleSubmit, touched}) =>  <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Field
                                    className={errors.email ? 'error' : ''} 
                                    type="text" 
                                    name="name" 
                                    placeholder="DIgite su nombre"
                                    onChange={handleChange}
                                />
                                {
                                    errors.name && touched.email && <ErrorMessage style={{color: 'red'}} name="name" component='small' />
                                }
                            </div>
                            <div className="form-group">
                                <Field
                                    className={errors.email ? 'error' : ''} 
                                    type="text" 
                                    name="email" 
                                    placeholder="Digite un correo electronico"
                                    onChange={handleChange}
                                />
                                {
                                    errors.email && touched.email && <ErrorMessage style={{color: 'red'}} name="email" component='small' />
                                }
                            </div>
                            
                            <div className="form-group">
                                <Field 
                                    className={errors.email ? 'error' : ''} 
                                    type="password" 
                                    name="password" 
                                    placeholder="Escriba una contraseña"
                                    onChange={handleChange}
                                />
                                {
                                    errors.password && touched.password && <ErrorMessage style={{color: 'red'}} name="password" component='small' />
                                }
                            </div>
                            
                            <div className="form-group">
                                <Field 
                                    className={errors.email ? 'error' : ''} 
                                    type="password" 
                                    name="repitPassword" 
                                    placeholder="Repita su contraseña"
                                    onChange={handleChange}
                                />
                                {
                                    errors.repitPassword && touched.repitPassword && <ErrorMessage style={{color: 'red'}} name="repitPassword" component='small' />
                                }
                            </div>
                            
                            <div className="form-group">
                                <button type="submit" className="btn-user">REGISTRAR</button>
                            </div>
                                {state.errors && <p>{state.errors}</p>}
                            <div>
                                <Link to="/login" >¿Ya tienes una cuenta?</Link>
                            </div>
                        </form>
                    </div>
                }
            
            </Formik>
           
        </div>
    )
}
