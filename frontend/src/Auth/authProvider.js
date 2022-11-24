import { createContext, useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {URL} from './config'

import React from 'react';



export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        // localStorage.getItem("user") || null
        JSON.parse(localStorage.getItem("user")) || null
    )

    /////////////////////LOCALESTORAGE ////////////////////////////    
    //sistemas de almacenamiento de informacion localStorage

    useEffect(() => {
        try {

            localStorage.setItem("user", JSON.stringify(user))

        } catch (error) {
            console.log("error en useEffect")
            const token = localStorage.getItem("token")
            // axios.post(url.url + '/logout', { "token": token })
            setUser(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("tiempo")
            axios.post(URL + '/logout', { "token": token })
            // return <Redirect to = '/' />
            window.location.href = "/"
        }

    }, [user])

    ///////////////////////////////////////////////////////////////
    const contextValue = {
        user,
        logout() {
            
                // console.log("se aplico logout")
                const token = localStorage.getItem("token")
                // axios.post(url.url + '/logout', { "token":token })
                setUser(null)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                localStorage.removeItem("tiempo")
                axios.post(URL + '/logout', { "token":token })
                // return <Redirect to = '/' />
                window.location.href = "/"
            
        },


        login(ok) {
            setUser(ok)
        },

        isLogged() {
            return !!user;

        }
    }
    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;