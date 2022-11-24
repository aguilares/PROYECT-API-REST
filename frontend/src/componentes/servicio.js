import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import useAuth from "../Auth/useAuth"
import { ComponenteInputUser, ComponenteInputBuscar, Select1 } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from './elementos/estilos';

import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';

import axios from 'axios';


function Servicio() {

    const [servicio, serServicio] = useState([]);
    const [area, setArea] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    const [id, setId] = useState({ campo: null, valido: null })
    const [idArea, setIdArea] = useState({ campo: null, valido: null })
    const [nombre, setNombre] = useState({ campo: null, valido: null })

    const [inputBuscar, setInputBuscar] = useState({ campo: null, valido: null })
    const [mensaje, setMensaje] = useState(null)

    const auth = useAuth()
    useEffect(() => {
        listarServicio()
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

    const listarServicio = async () => {
        axios.post(URL + '/servicio/all').then(json => {
            serServicio(json.data)
        })

    }

    const cargarArea = async () => {

        axios.post(URL + '/area/all').then(json => {
            setArea(json.data)
        })

    }


    const vaciarDatos = () => {
        setId({ campo: null, valido: null })
        setIdArea({ campo: null, valido: null })
        setNombre({ campo: null, valido: null })
    }

    const abrirModalInsetar = () => {
        cargarArea()
        vaciarDatos()
        setModalInsertar(true);
        setMensaje(null)

    }

    const abrirModalEditar = (a) => {
        cargarArea()
        setId({ campo: a.id, valido: 'true' })
        setIdArea({ campo: a.idArea, valido: 'true' })
        setNombre({ campo: a.servicio, valido: 'true' })
        setMensaje(null)
        setModalEditar(true)
    }

    const insertar = async () => {

        // console.log("datos servicio : ", nombre, laboratorio)

        if (idArea.valido === 'true' && nombre.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]

            axios.post(URL + '/servicio/insertar', {
                idArea: idArea.campo,
                nombre: nombre.campo,
                creado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.ok) {
                    vaciarDatos()
                    setModalInsertar(false)
                    listarServicio()
                }
                else
                    setMensaje(json.data.msg)
            })

        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }


    const actualizar = async (e) => {
        if (id.valido === 'true' && idArea.valido === 'true' && nombre.valido === 'true') {
            console.log('pasa validaciones')

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]

            axios.post(URL + '/servicio/actualizar', {
                id: id.campo,
                idArea: idArea.campo,
                nombre: nombre.campo,
                modificado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.ok) {
                    vaciarDatos()
                    setModalEditar(false)
                    listarServicio()
                }
                else
                    setMensaje(json.data.msg)
            })

        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }

    }

    const eliminar = async (ids) => {

        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok) {
            if (ids !== null) {

                axios.post(URL + '/servicio/eliminar', { id: ids }).then(json => {
                    if (json.data.ok) {
                        vaciarDatos()
                        listarServicio()
                    }
                    else
                        setMensaje(json.data.msg)
                })

            } else {
                setMensaje('ERROR EN LA SELECCION')
            }
        }
    }

    const buscar = () => {
        if (inputBuscar.valido === 'true') {
            console.log('pasa validaciones')

            axios.post(URL + '/servicio/buscar', { dato: inputBuscar.campo }).then(json => {
                serServicio(json.data)
            })

        }
        else {
            setMensaje('ERROR EN LA SELECCION')
        }
    }
    const siguiente = async () => {
        let tam = servicio.length - 1
        let id = servicio[tam].id
        axios.post(URL + '/servicio/siguiente', { id: id }).then(json => {
            if (json.data.stop !== true)
                serServicio(json.data)
        })
    }

    // const anterior = async () => {
    //     let id = servicio[0].id
    //     axios.post(URL + '/servicio/anterior', { id: id }).then(json => {
    //         if (json.data.stop !== true)
    //             serServicio(json.data)
    //     })
    // }


    return (
        <div style={{ margin: 'auto', marginTop: '10px' }}>
            <div className='card'>
                <div className="card-header">
                    <h3 className="card-title">Servicios</h3>
                </div>
                <div className="row m-3 ">
                    <div className=" col-4 ">
                        <Button color="success" className="btnNuevo" onClick={abrirModalInsetar} >Nuevo</Button>
                    </div>
                    <div className=" col-8">
                        <ComponenteInputBuscar
                            estado={inputBuscar}
                            cambiarEstado={setInputBuscar}
                            name="inputBuscar"
                            ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                            placeholder="SERVICIO"
                            eventoBoton={buscar}
                            etiqueta={'Buscar'}
                        />
                    </div>
                </div>
                {/* <div className="card-body table table-responsive "> */}
                <div className="card-body ">
                    <Table id="example12" className="table table-bordered table-sm">
                        <thead>
                            <tr >

                                {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                <th className="col-4  ">Area</th>
                                <th className="col-5 ">servicio</th>
                                <th className="col-1 text-center">DEL</th>
                                <th className="col-1 text-center">UPD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicio.map((s) => (
                                <tr key={s.id}>
                                    <td className="col-5">{s.area}</td>

                                    <td className="col-5 ">{s.servicio}</td>

                                    <td className="col-1"><p className='btnverSolicitud text-center' onClick={() => eliminar(s.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>

                                    <td className="col-1"><p className='btnverSolicitud text-center' onClick={() => abrirModalEditar(s)}><FontAwesomeIcon icon={faEdit} /></p></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </Table>
                </div>
                <div className="card-footer clearfix">
                    <ul className="pagination pagination-sm m-0 float-right">
                        <li className="page-item"><Link className="page-link" to="#" onClick={() => listarServicio()} >&laquo;</Link></li>
                        <li className="page-item"><Link className="page-link" to="#" onClick={() => listarServicio()}>Reinicar</Link></li>
                        <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>

                        <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                    </ul>
                </div>
            </div>
            <Modal isOpen={modalInsertar}>
                <ModalBody>
                    <form>
                        <div className="row">
                            <h6>Nuevo Servicio</h6>
                            {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <Select1
                                    estado={idArea}
                                    cambiarEstado={setIdArea}
                                    name="nombre"
                                    ExpresionRegular={INPUT.ID}  //expresion regular
                                    lista={area}
                                    etiqueta='Area'
                                />
                            </div>
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="servicio"
                                    placeholder="AREA DE SERVICIO"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Servicio'
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                    <ul className="pagination pagination-sm m-0 float-right">
                        <button className='info' onClick={() => insertar()} style={{ marginRight: '5px' }}>Registrar</button>
                        <button className='danger' onClick={() => setModalInsertar(false)} >Cancelar</button>
                    </ul>
                </div>
            </Modal>

            <Modal isOpen={modalEditar}>

                <ModalBody>
                    <h6>Modificar Registro</h6>
                    {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                    <form>
                        <div className="row">
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <Select1
                                    estado={idArea}
                                    cambiarEstado={setIdArea}
                                    name="nombre"
                                    ExpresionRegular={INPUT.ID}  //expresion regular
                                    lista={area}
                                    etiqueta='Area'
                                />
                            </div>
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="servicio"
                                    placeholder="AREA DE SERVICIO"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Servicio'
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                    <ul className="pagination pagination-sm m-0 float-right">
                        <button className='info' onClick={() => actualizar()} style={{ marginRight: '5px' }}>actualizar</button>
                        <button className='danger' onClick={() => setModalEditar(false)} >Cancelar</button>
                    </ul>
                </div>
            </Modal>
        </div>
    );

}
export default Servicio;
