

// import { Link } from 'react-router-dom'
import React from 'react';



import useAuth from "../Auth/useAuth"
import Home from './elementos/home'
import { useEffect } from "react";
import axios from 'axios';
import Area from './area'
import Servicio from './servicio'
import Seguro from './seguro';

function Servicios() {

    const auth = useAuth()

    useEffect(() => {

    }, [])



    const token = localStorage.getItem("token")
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            auth.logout()
            return Promise.reject(error)
        }
    )



    const handleClick = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())

    }

    const handleKeyPress = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
    }
    return (
        <>
            <div className="hold-transition sidebar-mini" onClick={handleClick} onKeyPress={handleKeyPress}>
                <div className="wrapper">
                    <Home />
                    <div className="content-wrapper">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="page-wrapper row ">
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <Servicio />
                                    </div>

                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <Seguro />
                                        <Area />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}
export default Servicios;
