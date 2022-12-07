
// import { Link } from 'react-router-dom'
import React from 'react';

import { Link } from 'react-router-dom'
import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { ComponenteInputUser } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from './elementos/estilos';
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';


function Seguro() {
    const auth = useAuth()

    const [seguro, setSeguro] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    const [id, setId] = useState({ campo: '', valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })

    const [mensaje, setMensaje] = useState(null)
    try {

        useEffect(() => {
            listaSeguro()
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

        const listaSeguro = async () => {

            axios.post(URL + '/seguro/all').then(json => {
                setSeguro(json.data)
            })

        }


        const vaciarDatos = () => {
            setId({ campo: '', valido: null })
            setNombre({ campo: '', valido: null })

        }

        const abrirModalInsetar = () => {
            vaciarDatos()
            setModalInsertar(true);
            setMensaje(null)

        }

        const abrirModalEditar = (s) => {
            setId({ campo: s.id, valido: 'true' })
            setNombre({ campo: s.nombre, valido: 'true' })
            setMensaje(null)
            setModalEditar(true)
        }

        const insertar = async () => {

            // console.log("datos seguro : ", nombre, laboratorio)

            if (nombre.valido === 'true') {
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]

                axios.post(URL + '/seguro/insertar', {
                    nombre: nombre.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        vaciarDatos()
                        setModalInsertar(false)
                        listaSeguro()
                    }
                    else
                        setMensaje(json.data.msg)
                })

            } else {
                setMensaje('COMPLETE LOS DATOS!!')
            }
        }


        const actualizar = async (e) => {
            if (id.valido === 'true' && nombre.valido === 'true') {

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                axios.post(URL + '/seguro/actualizar', {
                    id: id.campo,
                    nombre: nombre.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        vaciarDatos()
                        setModalEditar(false)
                        listaSeguro()
                    }
                    else
                        setMensaje(json.data.msg)
                })

            } else {
                setMensaje('COMPLETE LOS DATOS!!')
            }

        }

        const eliminar = async (ids) => {

            const ok = window.confirm('¿está seguro de eliminar este registro ?');
            if (ok) {
                if (ids != null) {

                    axios.post(URL + '/seguro/eliminar', { id: ids }).then(json => {
                        if (json.data.ok) {
                            vaciarDatos()
                            listaSeguro()
                        }
                        else
                            setMensaje(json.data.msg)
                    })

                } else {
                    setMensaje('ERROR EN LA SELECCION')
                }
            }
        }

        const siguiente = async () => {
            let tam = seguro.length - 1
            let id = seguro[tam].id
            // console.log(id)
            axios.post(URL + '/seguro/siguiente', { id: id }).then(json => {
                if (json.data.stop !== true)
                    setSeguro(json.data)
            })
        }

        // const anterior = async () => {
        //     let id = seguro[0].id
        //     axios.post(URL + '/seguro/anterior', { id: id }).then(json => {
        //         if (json.data.stop !== true)
        //             setSeguro(json.data)
        //     })
        // }

        return (
            <div className=' col-12 ' style={{ margin: 'auto', marginTop: '10px' }}>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Seguro</h3>
                    </div>
                    {/* <div className=" card-body table table-responsive " > */}
                    <div className=" card-body " >
                        <Table id="example12" className="table table-bordered table-sm">
                            <thead>
                                <tr className='col-12'>
                                    {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                    <th className="col-1">#</th>
                                    <th className="col-9">seguro</th>
                                    <th className="col-1 text-center">DEL</th>
                                    <th className="col-1 text-center">UPD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seguro.map((s) => (
                                    <tr key={s.id}>
                                        <td className="col-1">{s.id}</td>
                                        <td className="col-9">{s.nombre}</td>

                                        <td className="col-1"><p className='btnverSolicitud text-center' onClick={() => eliminar(s.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>

                                        <td className="col-1"><p className='btnverSolicitud text-center' onClick={() => abrirModalEditar(s)}><FontAwesomeIcon icon={faEdit} /></p></td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                    </div>
                    <div className='row'>
                        <div className='col-8'>
                            <div className="card-footer clearfix">
                                <ul className="pagination pagination-sm m-0 float-right">
                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => listaSeguro()} >&laquo;</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => listaSeguro()}>Reiniciar</Link></li>
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
                                <h6>Nuevo Registro</h6>
                                {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                                <div className="form-group col-10">
                                    <ComponenteInputUser
                                        estado={nombre}
                                        cambiarEstado={setNombre}
                                        name="nombre"
                                        placeholder="SEGURO"
                                        ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                        etiqueta='Nombre'
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
                                <h6>actualizar Registro</h6>
                                {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                                <div className="form-group col-9 ">
                                    <ComponenteInputUser
                                        estado={nombre}
                                        cambiarEstado={setNombre}
                                        name="nombre"
                                        placeholder="SEGURO"
                                        ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                        etiqueta='Nombre'
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
    } catch (error) {
        auth.logout()
    }


}
export default Seguro;
