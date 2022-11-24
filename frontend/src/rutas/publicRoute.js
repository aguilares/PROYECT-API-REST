import { Route} from "react-router-dom"
import React from 'react';
import useAuth from "../Auth/useAuth"



export default function PublicRoute({ component: Component, ...rest }) {
    const auth = useAuth();

    return (
        
            <Route {...rest}>
                {auth.isLogged()? (
                    // <Redirect to = '/ssgl' /> // si el usuario esta logueado se redirige a la pagina principal
                    window.location.href = "/registrarsolicitud"
                
                ) : ( 
                    <Component /> // caso contrario se redirige al componente enviado, en este caso nos redirige a la pagina de usuario y contraseña
                )}
            </Route>
    );
} 