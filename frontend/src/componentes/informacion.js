import useAuth from "../Auth/useAuth";
import { useEffect } from "react";
import { LeyendaError } from './elementos/estilos'
import React from 'react';
import { useState } from "react";
import { URL, INPUT } from '../Auth/config';
import { ComponenteInputUser } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados

import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'


function Informaciones() {
    const auth = useAuth()

    const [modalInsertar, setModalInsertar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [id, setId] = useState({ campo: null, valido: null })
    const [red, setRed] = useState({ campo: null, valido: null })
    const [nombre, setNombre] = useState({ campo: null, valido: null })
    const [telefono, setTelefono] = useState({ campo: null, valido: null })
    const [direccion, setDireccion] = useState({ campo: null, valido: null })

    const [mensaje, setMensaje] = useState(null)
    useEffect(() => {
        verLaboratorio()
    }, [auth])

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
        try {
            axios.post(URL + '/laboratorio/all').then(json => {
                if (json.data.resultado.length > 0) {
                    
                    // console.log(json.data.resultado)
                    setId({ campo: json.data.resultado[0].id, valido: 'true' })
                    setRed({ campo: json.data.resultado[0].red, valido: 'true' })
                    setNombre({ campo: json.data.resultado[0].nombre, valido: 'true' })
                    setTelefono({ campo: json.data.resultado[0].telefono, valido: 'true' })
                    setDireccion({ campo: json.data.resultado[0].direccion, valido: 'true' })
                } else {
                    setModalInsertar(true)
                }

            })
        } catch (error) {
            return error
        }
    }


    const abrirModalEditar = () => {
        setMensaje(null)
        setModalEditar(true)
    }



    const insertar = async () => {

        // console.log("datos laboratorio : ", nombre, laboratorio)

        if (nombre.valido === 'true' && red.valido === 'true' && telefono.valido === 'true' && direccion.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            try {
                axios.post(URL + '/laboratorio/insertar', {
                    red: red.campo,
                    nombre: nombre.campo,
                    telefono: telefono.campo,
                    direccion: direccion.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setModalInsertar(false)
                        verLaboratorio()
                    }
                    else
                        setMensaje(json.data.msg)
                })
            } catch (error) {
                return error
            }
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }


    const actualizar = async (e) => {
        if (id.valido === 'true' && nombre.valido === 'true' && red.valido === 'true'
            && telefono.valido === 'true' && direccion.valido === 'true') {

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            try {
                axios.post(URL + '/laboratorio/actualizar', {
                    id: id.campo,
                    red: red.campo,
                    nombre: nombre.campo,
                    telefono: telefono.campo,
                    direccion: direccion.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setModalEditar(false)
                        verLaboratorio()
                    }
                    else
                        setMensaje(json.data.msg)
                })
            } catch (error) {
                return error
            }
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }

    }
    return (
        // <div  >
            <div className=" col-12  col-sm-6 col-md-6 col-lg-4"  style={{ width: '500px', margin: 'auto', padding: '10px', marginTop: '30px' }} >

                <div className="card card-widget widget-user-2">
                    <div className="widget-user-header bg-warning">
                        <div className="widget-user-image">
                            <img className="img-circle elevation-2" src="../../dist/img/sp.png" alt="User Avatar" />
                        </div>
                        <h3 className="widget-user-username">{nombre.campo}</h3>
                        <h5 className="widget-user-desc">{red.campo}</h5>
                    </div>
                    <div className="card-footer p-0">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    {direccion.campo} <i className="fas fa-map-marker-alt mr-1"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    {telefono.campo} <i className="fas fa-phone mr-1"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className='row'>
                                    <div className='col-8'>

                                        <div className="card-footer clearfix">
                                            <Button color="success" onClick={() => abrirModalEditar()} style={{ height: '30px', fontSize: '14px', paddingTop: '3px' }}  >actualizar</Button>
                                        </div>
                                    </div>
                                    <div className='col-4 '>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><Link className="page-link" to="/"  >&laquo;</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            {/* </div> */}




            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>REGISTRAR LABORATORIO</h3>
                        {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className='row'>
                            <div className="form-group col-12">
                                <ComponenteInputUser
                                    estado={direccion}
                                    cambiarEstado={setDireccion}
                                    name="Dieccion"
                                    placeholder="DIRECCION"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Direccion'
                                />
                            </div>
                            <div className="form-group col-12">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="nombre"
                                    placeholder="LABORATORIO"
                                    ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                    etiqueta='Nombre'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <ComponenteInputUser
                                    estado={telefono}
                                    cambiarEstado={setTelefono}
                                    name="telefono"
                                    placeholder="TELEFONO"
                                    ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                    etiqueta='Telefono'
                                />
                            </div>
                            <div className="form-group col-6">
                                <ComponenteInputUser
                                    estado={red}
                                    cambiarEstado={setRed}
                                    name="red"
                                    placeholder="RED"
                                    ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                    etiqueta='Red'
                                />
                            </div>
                        </div>
                    </form>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={insertar}>Registrar</button>
                        <button className='btn btn-danger' onClick={() => setModalInsertar(false)} >Cancelar</button>
                    </ModalFooter>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Modificar Registro</h3>
                        {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <div className='row'>
                            <div className="form-group col-12">
                                <ComponenteInputUser
                                    estado={direccion}
                                    cambiarEstado={setDireccion}
                                    name="Dieccion"
                                    placeholder="DIRECCION"
                                    ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                    etiqueta='Direccion'
                                />
                            </div>
                            <div className="form-group col-12">
                                <ComponenteInputUser
                                    estado={nombre}
                                    cambiarEstado={setNombre}
                                    name="nombre"
                                    placeholder="LABORATORIO"
                                    ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                    etiqueta='Nombre'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <ComponenteInputUser
                                    estado={telefono}
                                    cambiarEstado={setTelefono}
                                    name="telefono"
                                    placeholder="TELEFONO"
                                    ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                    etiqueta='Telefono'
                                />
                            </div>
                            <div className="form-group col-6">
                                <ComponenteInputUser
                                    estado={red}
                                    cambiarEstado={setRed}
                                    name="red"
                                    placeholder="RED"
                                    ExpresionRegular={INPUT.SEGURO}  //expresion regular
                                    etiqueta='Red'
                                />
                            </div>
                        </div>
                    </form>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={actualizar}>Actualizar</button>
                        <button className='btn btn-danger' onClick={() => setModalEditar(false)} >Cancelar</button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Informaciones;