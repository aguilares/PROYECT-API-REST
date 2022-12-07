
// import { Link } from 'react-router-dom'

import React from 'react';
// import ReactExport from "react-export-excel"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faRecycle, faSave } from '@fortawesome/free-solid-svg-icons';


import useAuth from "../Auth/useAuth"
import { ComponenteInputFile } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL } from '../Auth/config';
import axios from 'axios';


// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

const dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];























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
                console.log(json.data.image)
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

                                    {/* <ExcelFile element={<button>Download Data</button>}>
                                        <ExcelSheet data={dataSet1} name="Employees">
                                            <ExcelColumn label="Name" value="name" />
                                            <ExcelColumn label="Wallet Money" value="amount" />
                                            <ExcelColumn label="Gender" value="sex" />
                                            <ExcelColumn label="Marital Status"
                                                value={(col) => col.is_married ? "Married" : "Single"} />
                                        </ExcelSheet>
                                        <ExcelSheet data={dataSet2} name="Leaves">
                                            <ExcelColumn label="Name" value="name" />
                                            <ExcelColumn label="Total Leaves" value="total" />
                                            <ExcelColumn label="Remaining Leaves" value="remaining" />
                                        </ExcelSheet>
                                    </ExcelFile> */}
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
