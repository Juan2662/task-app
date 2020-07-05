import React from 'react'
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import Header from './components/Header/Header'
import Tareas from './components/Tareas/Tareas'
import './App.css'

export default function App (){
    return (
        <div>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" component={Tareas} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
            
        </div>
    )
}