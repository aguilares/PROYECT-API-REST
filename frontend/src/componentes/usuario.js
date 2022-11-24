
import React from 'react';

import { Link } from 'react-router-dom'
import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputBuscar } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from './elementos/estilos';
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';


function Usuario() {

    const [usuario, setUsuario] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [servicios, setServicios] = useState([])
    const [rol, setRol] = useState([])

    const [id, setId] = useState({ campo: '', valido: null })
    const [idServicio, setIdServicio] = useState({ campo: '', valido: null })
    const [idRol, setIdRol] = useState({ campo: '', valido: null })


    const [inputBuscar, setInputBuscar] = useState({ campo: '', valido: null })
    const [mensaje, setMensaje] = useState(null)
    const [nuevos, setNuevos] = useState(false)

    const auth = useAuth()
    try {


        useEffect(() => {
            listarUsuarios()
            listarNuevosUsuarios()
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

        const listarUsuarios = async () => {
            try {
                axios.post(URL + '/usuario/all').then(json => {
                    setUsuario(json.data)
                })
            } catch (error) {
                return error
            }
        }
        const listarNuevosUsuarios = async () => {
            try {
                axios.post(URL + '/usuario/nuevos').then(json => {
                    setNuevoUsuario(json.data)
                })
            } catch (error) {
                return error
            }
        }
        const listarServicios = async () => {

            axios.post(URL + '/servicio/listaRegistroUsuario').then(json => {
                setServicios(json.data)
            })

        }
        const listarRol = async () => {

            axios.post(URL + '/usuario/rol').then(json => {
                setRol(json.data)
            })

        }

        const vaciarDatos = () => {
            setId({ campo: '', valido: null })
            setIdServicio({ campo: '', valido: null })
            setIdRol({ campo: '', valido: null })
        }


        const rellenar = async (usuario) => {
            setId({ campo: usuario.id, valido: 'true' })
            setIdServicio({ campo: usuario.idServicio, valido: 'true' })
            setIdRol({ campo: usuario.idRol, valido: 'true' })
            listarServicios()
            listarRol()
            setModalEditar(true)
        }


        const actualizar = async () => {
            if (id.valido === 'true' && idServicio.valido === 'true' && idRol.valido === 'true') {
                // console.log('pasa validaciones')

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                try {
                    axios.post(URL + '/usuario/actualizar', {
                        id: id.campo,
                        idServicios: idServicio.campo,
                        idRol: idRol.campo,
                        modificado: fecha + ' ' + new Date().toLocaleTimeString()
                    }).then(json => {
                        setUsuario(json.data)
                        setId({ campo: null, valido: null })
                        setIdServicio({ campo: null, valido: null })
                        setIdRol({ campo: null, valido: null })
                        setModalEditar(false)
                        vaciarDatos()
                    })
                } catch (error) {
                    setMensaje('VUELVA A INTENTARLO MAS TARDE !!!')
                }
            } else {
                setMensaje('COMPLETE LOS DATOS!!')
            }

        }

        const eliminar = async (user) => {
            const ok = window.confirm('¿está seguro de eliminar este registro?');
            if (ok === true) {

                if (user != null) {
                    axios.post(URL + '/usuario/eliminar', { id: user }).then(json => {
                        setUsuario(json.data)

                    })
                }
            }
        }

        const eliminarNuevo = async (user) => {
            const ok = window.confirm('¿está seguro de eliminar este registro?');
            if (ok === true) {

                if (user != null) {
                    axios.post(URL + '/usuario/eliminarNuevo', { id: user }).then(json => {
                        setNuevoUsuario(json.data)

                    })
                }
            }
        }

        const validar = async () => {
            const ok = window.confirm('Esta seguro de esta operacion ?');

            if (ok === true) {
                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                if (id.valido === 'true') {
                    axios.post(URL + '/usuario/validar', {
                        id: id.campo,
                        idServicios: idServicio.campo,
                        idRol: idRol.campo,
                        modificado: fecha + ' ' + new Date().toLocaleTimeString()
                    }).then(json => {
                        setNuevoUsuario(json.data)
                        setModalEditar(false)
                        vaciarDatos()
                    })
                } else {
                    setMensaje('ERROR EN LA SELECCION')
                }
            }
        }

        const buscar = () => {
            if (inputBuscar.valido === 'true') {
                console.log('pasa validaciones')
                try {
                    axios.post(URL + '/usuario/buscar', { dato: inputBuscar.campo }).then(json => {
                        setUsuario(json.data)
                        setInputBuscar({ campo: null, valido: null })

                    })
                } catch (error) {
                    return error
                }
            }
            else {
                setMensaje('ERROR EN LA SELECCION')
            }
        }

        const siguiente = async () => {
            let tam = usuario.length - 1
            let id = usuario[tam].id
            axios.post(URL + '/usuario/siguiente', { id: id }).then(json => {
                if (json.data.stop !== true)
                    setUsuario(json.data)
            })
        }

        const siguienteNuevoUsuario = async () => {
            let tam = nuevoUsuario.length - 1
            let id = nuevoUsuario[tam].id
            axios.post(URL + '/usuario/siguientenuevosusuarios', { id: id }).then(json => {
                if (json.data.stop !== true)
                    setNuevoUsuario(json.data)
            })
        }


        const handleClick = () => {
            localStorage.setItem('tiempo', new Date().getMinutes())

        }

        const handleKeyPress = () => {
            localStorage.setItem('tiempo', new Date().getMinutes())
        }

        return (
            <div>

                <div className="hold-transition sidebar-mini" onClick={handleClick} onKeyPress={handleKeyPress}>
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper" onClick={handleClick} onKeyPress={handleKeyPress}>
                            <div className="content">
                                <div className="container-fluid">
                                    {nuevos === false ?
                                        <div className="page-wrapper" style={{ marginTop: '10px' }}>
                                            <div className='card'>
                                                <div className="card-header">
                                                    <h3 className="card-title">Usuarios</h3>
                                                </div>
                                                <div className="row m-2">
                                                    <div className='col-5'>
                                                        {nuevoUsuario.length > 0 &&
                                                            <Button className='btnNuevo' onClick={() => { setNuevos(true) }}>validar</Button>
                                                        } </div>
                                                    <div className=" col-7">
                                                        <ComponenteInputBuscar
                                                            estado={inputBuscar}
                                                            cambiarEstado={setInputBuscar}
                                                            name="inputBuscar"
                                                            ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                            placeholder="NOMBRE"
                                                            eventoBoton={buscar}
                                                            etiqueta={'Buscar'}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="card-body table table-responsive  ">

                                                        <Table id="example12" className="table table-bordered table-sm">
                                                            <thead>
                                                                <tr >
                                                                    <th className="col-1 text-center">CI</th>
                                                                    <th className="col-2  ">USUARIO</th>
                                                                    <th className="col-1 ">ROL</th>
                                                                    <th className="col-1  text-center">USUARIO</th>
                                                                    <th className="col-2  ">SERVICIO</th>
                                                                    <th className="col-2  text-center">CEL./TEL.</th>
                                                                    <th className="col-3  ">DIRECCION</th>
                                                                    <th className="col-1 text-center">DEL</th>
                                                                    <th className="col-1  text-center">UPD</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {usuario.map((u) => (
                                                                    <tr key = {u.id}>
                                                                        <td className="col-1 text-center">{u.ci}</td>
                                                                        <td className="col-2 ">{u.nombre + ' ' + u.apellidoPaterno + ' ' + u.apellidoMaterno}</td>
                                                                        <td className="col-1  ">{u.rol}</td>
                                                                        <td className="col-1  text-center">{u.username}</td>
                                                                        <td className="col-2  ">{u.servicio}</td>
                                                                        <td className="col-2  text-center">{u.telefono}</td>
                                                                        <td className="col-3  ">{u.direccion}</td>
                                                                        <td className="col-1 text-center"><p className='btnverSolicitud text-center' onClick={() => eliminar(u.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                                                                        <td className="col-1 text-center"><p className='btnverSolicitud text-center' onClick={() => rellenar(u)}><FontAwesomeIcon icon={faEdit} /></p></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>

                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                    <div className="card-footer clearfix">
                                                        <ul className="pagination pagination-sm m-0 float-right">
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listarUsuarios()} >&laquo;</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listarUsuarios()}>Reinicar</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>

                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="page-wrapper " style={{ marginTop: '10px' }}>
                                            <div className='card'>
                                                <div className="card-header">
                                                    <h3 className="card-title">Usuarios</h3>
                                                </div>
                                                <div className="row m-2">
                                                    <div className='col-5'>

                                                        <Button color='success' className='btnNuevo' onClick={() => { setNuevos(false); listarUsuarios() }}>volver</Button>
                                                    </div>
                                                    <div className=" col-7">
                                                        <ComponenteInputBuscar
                                                            estado={inputBuscar}
                                                            cambiarEstado={setInputBuscar}
                                                            name="inputBuscar"
                                                            ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                            placeholder="NOMBRE"
                                                            eventoBoton={buscar}
                                                            etiqueta={'Buscar'}
                                                        />
                                                    </div>

                                                </div>
                                                <div>
                                                    <div className="card-body table table-responsive ">

                                                        <Table id="example12" className="table table-bordered table-sm">
                                                            <thead>
                                                                <tr >
                                                                    <th className="col-1 text-center">CI</th>
                                                                    <th className="col-2  ">USUARIO</th>
                                                                    <th className="col-1  text-center">USERNAME</th>
                                                                    <th className="col-2  text-center">CEL./TEL.</th>
                                                                    <th className="col-3  ">DIRECCION</th>
                                                                    <th className="col-1 text-center">DEL</th>
                                                                    <th className="col-1  text-center">VALIDAR</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {nuevoUsuario.map((u) => (
                                                                    <tr >
                                                                        <td className="col-1 text-center">{u.ci}</td>
                                                                        <td className="col-2 ">{u.nombre + ' ' + u.apellidoPaterno + ' ' + u.apellidoMaterno}</td>
                                                                        <td className="col-1  text-center">{u.username}</td>
                                                                        <td className="col-2  text-center">{u.telefono}</td>
                                                                        <td className="col-3  ">{u.direccion}</td>
                                                                        <td className="col-1 text-center"><p className='btnverSolicitud text-center' onClick={() => eliminarNuevo(u.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                                                                        <td className="col-1 text-center"><p className='btnverSolicitud text-center' onClick={() => {
                                                                            setId({ campo: u.id, valido: 'true' }); setModalEditar(true);
                                                                            listarRol(); listarServicios()
                                                                        }}><FontAwesomeIcon icon={faCheck} /></p></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>

                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                    <div className="card-footer clearfix">
                                                        <ul className="pagination pagination-sm m-0 float-right">
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listarNuevosUsuarios()} >&laquo;</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listarNuevosUsuarios()}>Reinicar</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguienteNuevoUsuario()}>Siguiente</Link></li>

                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguienteNuevoUsuario()}>&raquo;</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <Modal isOpen={modalEditar}>
                                        <ModalBody>
                                            <form>
                                                <div className="row">
                                                    <div>
                                                        <h6>Modificar Registro</h6>
                                                        {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-2 mt-0 pr-1">
                                                        <Select1
                                                            estado={idServicio}
                                                            cambiarEstado={setIdServicio}
                                                            name="servicio"
                                                            ExpresionRegular={INPUT.ID}
                                                            lista={servicios}
                                                            etiqueta={'Sevicio'}
                                                        >
                                                        </Select1>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-2 mt-0 pr-1">
                                                        <Select1
                                                            estado={idRol}
                                                            cambiarEstado={setIdRol}
                                                            name="rol"
                                                            ExpresionRegular={INPUT.ID}
                                                            lista={rol}
                                                            etiqueta={'Rol'}
                                                        >
                                                        </Select1>
                                                    </div>

                                                </div>
                                            </form>
                                        </ModalBody>
                                        <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                {nuevos === false ? <button className='info' onClick={() => actualizar()} style={{ marginRight: '5px' }}>Registrar</button> :
                                                    <button className='info' onClick={() => validar()} >validar</button>}
                                                <button className='danger' onClick={() => { setModalEditar(); vaciarDatos() }} style={{ marginRight: '5px' }}>Cancelar</button>

                                            </ul>
                                        </div>

                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        auth.logout()
    }

}
export default Usuario;
