import { Route } from "react-router-dom"
import React from 'react';
import useAuth from "../Auth/useAuth"



export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    let url = null
    if (parseInt(localStorage.getItem('numRol'))=== 1) {
        url = "/autorizarsolicitud"
    }
    if (parseInt(localStorage.getItem('numRol')) === 2) {
        url = "/registrarsolicitud"
    }
    if (parseInt(localStorage.getItem('numRol')) === 3) {
        url = "/resultados"
    }

    return (

        <Route {...rest}>
            {auth.isLogged() ? (

                window.location.href = url

            ) : (
                <Component />
            )}
        </Route>
    );
} 