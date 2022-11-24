
// import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faRecycle, faSave } from '@fortawesome/free-solid-svg-icons';

import React from 'react';

import useAuth from "../Auth/useAuth"
import {  ComponenteInputFile } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL } from '../Auth/config';
import axios from 'axios';


function Laboratorio() {


    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState([]);
    const [imagenActual, setImagenActual] = useState(null)

    const [verImagen, setModalImagen] = useState(false);
    const auth = useAuth()
    useEffect(() => {
        verLaboratorio()
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

    const verLaboratorio = async () => {

        axios.post(URL + '/laboratorio/all').then(json => {
            if (json.data.resultado.length > 0) {
                setFileName(json.data.image)
            }

        })

    }



    const handleClick = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())

    }

    const handleKeyPress = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
    }
    const enviarImagen = () => {
        if (file !== null) {
            const formatoData = new FormData()
            formatoData.append('sello', file)
            axios.post(URL + '/laboratorio/insertarImagen', formatoData).then(j => {
                setFile(null)
                setFileName(j.data)
                document.getElementById('imagenFile').value = null
            })

        } else {
            alert('DEBES CARGAR UN ARCHIVO')
        }
    }


    const modalHandler = (isOpen, imagen) => {
        setModalImagen(isOpen)
        setImagenActual(imagen)
    }
    const eliminarImagen = () => {
        if (imagenActual !== null) {

            axios.post(URL + '/laboratorio/eliminarImagen', { imagen: imagenActual }).then(j => {
                setFileName(j.data)
                setModalImagen(false)
                // modalHandler(false, '#!')
            })

        } else {
            alert('NO SE HA SELECCIONADO EL ARCHIVO')
        }
    }

    return (
        <>
            <div className="hold-transition sidebar-mini" onClick={handleClick} onKeyPress={handleKeyPress}>
                <div className="wrapper">
                    <Home />
                    <div className="content-wrapper">
                        <div className="content">
                            <div className="container-fluid">


                                <div className="page-wrapper ">
                                    {
                                        verImagen === true &&
                                        <div className='card'>
                                            <div className='button-container GaleriaVerImagen'>
                                                <img src={URL + '/' + imagenActual} alt={imagenActual} className='dimensionImagen' />
                                                <div>
                                                    <button className='btn' onClick={() => eliminarImagen()}><FontAwesomeIcon icon={faRecycle} /> </button>
                                                    <button className='btn' onClick={() => modalHandler(false, null)}><FontAwesomeIcon icon={faAngleLeft} /></button>
                                                </div>

                                            </div></div>
                                    }
                                    {
                                        verImagen === false &&

                                        <div className='card p-2'>
                                            <div className='row '>
                                                <div className='col-11'>
                                                    <ComponenteInputFile
                                                        cambiarEstado={setFile}
                                                        name='imagenFile'
                                                        etiqueta={'seleccionar imagen'}

                                                    />
                                                </div>
                                                <div className='col-1'>
                                                    <button type='button' className='btn btn-primary botonUpload' onClick={enviarImagen}> <FontAwesomeIcon icon={faSave} />  </button>

                                                </div>
                                            </div>

                                        </div>
                                    }
                                    <div className='card'>
                                        <div className='contenedorImagen' >
                                            {
                                                fileName.map(img => (
                                                    <div key={img} className='card m-2 button-container' >
                                                        <img src={URL + '/' + img} alt={img} className='card-img-top' />
                                                        <div >
                                                            <button className='btn ' onClick={() => modalHandler(true, img)}><FontAwesomeIcon icon={faAngleRight} /></button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
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
export default Laboratorio;
