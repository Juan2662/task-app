import React, { useState, useEffect } from 'react'
import './header.css'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

export default function Header (props){
    const Dispatch = useDispatch()
    const stateGlobal = useSelector(state => state.isLogin.status)

    const [login, setIsLogin] = useState({
        status: false
    })

    useEffect(() => {
        if(stateGlobal === true){
            return setIsLogin({status: true})
        }else{
            return setIsLogin({...login})
        }
    },[stateGlobal])

    return (
        <div className="header">
            <div className="header-title">
                <Link 
                    className="title"
                    to="/"    
                > Mis Tareas
                </Link>
            </div>
            <div className="header-user">
                {
                    login.status ? 
                        <Link 
                            to={'/login'}
                            className="header-link"
                            onClick={() => {
                                Dispatch({type: 'ISLOGOUT'})
                                setIsLogin({status: false})
                            }} 
                        >Cerrar sesion</Link> 
                    : 
                        <Link 
                            to="/login" 
                            className="header-link"
                        >Iniciar sesion</Link>
                }
            </div>
            
        </div>
    )
}