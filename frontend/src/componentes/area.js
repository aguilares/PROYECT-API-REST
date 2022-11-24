
// import { Link } from 'react-router-dom'
import React from 'react';


import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { ComponenteInputUser, Select1 } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from './elementos/estilos';
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Area() {

    const [area, setArea] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [seleccion] = useState([{ id: 1, nombre: 'SI' }, { id: 0, nombre: 'NO' }])

    const [id, setId] = useState({ campo: null, valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })
    const [laboratorio, setLaboratorio] = useState({ campo: false, valido: true })

    const [mensaje, setMensaje] = useState(null)

    const auth = useAuth()
    useEffect(() => {
        document.title = 'area'
        listarArea()
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

    const listarArea = async () => {
        axios.post(URL + '/area/all').then(json => {
            setArea(json.data)
        })

    }


    const vaciarDatos = () => {
        setId({ campo: '', valido: null })
        setNombre({ campo: '', valido: null })
        setLaboratorio({ campo: null, valido: 'true' })

    }

    const abrirModalInsetar = () => {
        vaciarDatos()
        setModalInsertar(true);
        setMensaje(null)

    }

    const abrirModalEditar = (a) => {
        setId({ campo: a.id, valido: 'true' })
        setNombre({ campo: a.nombre, valido: 'true' })
        setLaboratorio({ campo: a.laboratorio, valido: 'true' })
        setMensaje(null)
        setModalEditar(true)
    }

    const insertar = async () => {

        // console.log("datos area : ", nombre, laboratorio)

        if (nombre.valido === 'true' && laboratorio.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            axios.post(URL + '/area/insertar', {
                nombre: nombre.campo,
                laboratorio: laboratorio.campo,
                creado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.ok) {
                    vaciarDatos()
                    setModalInsertar(false)
                    listarArea()
                }
                else
                    setMensaje(json.data.msg)
            })
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }


    const actualizar = async (e) => {
        if (id.valido === 'true' && nombre.valido === 'true' && laboratorio.valido === 'true') {
            console.log('pasa validaciones')

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]

            axios.post(URL + '/area/actualizar', {
                id: id.campo,
                nombre: nombre.campo,
                laboratorio: laboratorio.campo,
                modificado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.ok) {
                    vaciarDatos()
                    setModalEditar(false)
                    listarArea()
                }
                else
                    setMensaje(json.data.msg)
            })
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }

    }

    const eliminar = async (a) => {
        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok) {
            if (a != null) {
                await axios.post(URL + '/area/eliminar', { id: a }).then(json => {
                    if (json.data.ok) {
                        vaciarDatos()
                        listarArea()
                    }
                    else
                        setMensaje(json.data.msg)
                })

            } else {
                console.log('error en la seleccion:', id)
                setMensaje('ERROR EN LA SELECCION')
            }
        }
    }
    const siguiente = async () => {
        let tam = area.length - 1
        let id = area[tam].id
        axios.post(URL + '/area/siguiente', { id: id }).then(json => {
            if (json.data.stop !== true)
                setArea(json.data)
        })
    }

    // const anterior = async () => {

    //     let id = area[0].id
    //     console.log(id)
    //     axios.post(URL + '/area/anterior',{id: id}).then(json => {
    //         if(json.data.stop !== true)
    //         setArea(json.data)
    //     })
    // }

    return (
        <div className='col-12' style={{ margin: 'auto', marginTop: '10px' }}>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Area</h3>
                </div>
                {/* <div className="card-body table table-responsive " > */}
                <div className="card-body  " >
                    <Table id='example12' className="table table-bordered table-sm" >
                        <thead>
                            <tr className='col-12' >
                                {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                <th className="col-1 ">#</th>
                                <th className="col-5 ">Area</th>
                                <th className="col-1  text-center">DEL</th>
                                <th className="col-1  text-center">UPD</th>
                            </tr>
                        </thead>
                        <tbody >
                            {area.map((a) => (
                                <tr key={a.nombre} >
                                    <td className="col-1">{a.id}</td>
                                    <td className="col-6">{a.nombre}</td>
                                    <td className="col-1 "><p  className='btnverSolicitud text-center' onClick={() => eliminar(a.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                                    <td className="col-1  "><p className='btnverSolicitud text-center' color="primary" onClick={() => abrirModalEditar(a)}><FontAwesomeIcon icon={faEdit} /></p></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <div className="card-footer clearfix">
                            <ul className="pagination pagination-sm m-0 float-right">
                                <li className="page-item"><Link className="page-link" to="#" onClick={() => listarArea()} >&laquo;</Link></li>
                                <li className="page-item"><Link className="page-link" to="#" onClick={() => listarArea()}>Reiniciar</Link></li>
                                <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>

                                <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-4 '>
                        <div className="card-footer clearfix">
                            <Button className='btnNuevo' onClick={abrirModalInsetar} style={{ height: '30px', fontSize: '14px', paddingTop: '3px' }} >Nuevo</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalInsertar}>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div>
                                <h3>Nuevo Area</h3>
                                {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                            </div>
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="nombre"
                                    placeholder="AREA DE SERVICIO"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Nombre'
                                />
                            </div>
                            <div className="form-group col-3 mb-2 mt-1 pl-2">
                                <Select1
                                    estado={laboratorio}
                                    cambiarEstado={setLaboratorio}
                                    name="laboratorio"
                                    ExpresionRegular={INPUT.EDAD}  //expresion regular
                                    lista={seleccion}
                                    etiqueta={'LABORATORIO'}
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
                    <form>
                        <div className="row">
                            <div>
                                <h3>Modificar Registro</h3>
                                {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                            </div>
                            <div className="form-group col-9 mb-2 mt-1 pl-1">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="nombre"
                                    placeholder="AREA DE SERVICIO"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Nombre'
                                />
                            </div>
                            <div className="form-group col-3 mb-2 mt-1 pl-2">
                                <Select1
                                    estado={laboratorio}
                                    cambiarEstado={setLaboratorio}
                                    name="laboratorio"
                                    ExpresionRegular={INPUT.EDAD}  //expresion regular
                                    lista={seleccion}
                                    etiqueta={'LABORATORIO'}
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
export default Area;
