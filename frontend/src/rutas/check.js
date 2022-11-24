
import { Route } from "react-router-dom"
import useAuth from "../Auth/useAuth"
import React from 'react';

// import axios from 'axios';
// import { URL} from '../Auth/config'  // variables globales que estan disponibles para todo el sistema client



// const sesion = null;
// const user = { id: 1, username: 'juan', password: 1234, nivel: 2 }

export default function Check({ component: Component, ...rest }) {
    const auth = useAuth();
    // const token = localStorage.getItem("token")
    // axios.interceptors.request.use(
    //     config => {
    //         config.headers.authorization = `Bearer ${token}`
    //         return config
    //     },
    //     error => {
    //         auth.logout()
    //         return Promise.reject(error)
    //     }
    // )
    // axios.post(URL + '/verificar').then(json => {
    //     console.log('avio del servidor: ', json.data)
    //     if(json.data.ok === false){
    //         auth.logout()
    //     }
    // })

    return (

        <Route {...rest}>
            {auth.isLogged() ? <Component /> : window.location.href = "/"
            }

        </Route>

    )

}