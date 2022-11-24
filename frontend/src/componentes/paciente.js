
import React from 'react';
import { Link } from 'react-router-dom'

import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { Select1, ComponenteInputUser, ComponenteInputBuscar, ComponenteInputfecha } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { LeyendaError } from './elementos/estilos';
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';


function Paciente() {

    const [paciente, setPaciente] = useState([]);
    const [sexos] = useState([{ id: "M", nombre: "Masculino" }, { id: "F", nombre: "Femenino" }]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);

    const [id, setId] = useState({ campo: '', valido: null })
    const [ci, setCi] = useState({ campo: '', valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })
    const [apellidoPat, setApellidoPat] = useState({ campo: '', valido: null })
    const [apellidoMat, setApellidoMat] = useState({ campo: '', valido: null })
    const [nhc, setNhc] = useState({ campo: null, valido: null })
    const [fechaNac, setFechaNac] = useState({ campo: '', valido: null })
    const [sexo, setSexo] = useState({ campo: '', valido: null })
    const [telefono, setTelefono] = useState({ campo: '', valido: null })
    const [direccion, setDireccion] = useState({ campo: '', valido: null })

    const [inputBuscar, setInputBuscar] = useState({ campo: '', valido: null })
    const [mensaje, setMensaje] = useState(null)

    const auth = useAuth()
    useEffect(() => {
        listarPacientes()
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

    const listarPacientes = async () => {
        try {
            axios.post(URL + '/paciente/all').then(json => {
                setPaciente(json.data)
            })
        } catch (error) {
            return error
        }
    }

    const vaciarDatos = () => {
        setId({ campo: '', valido: null })
        setCi({ campo: '', valido: null })
        setNombre({ campo: '', valido: null })
        setApellidoPat({ campo: '', valido: null })
        setApellidoMat({ campo: '', valido: null })
        setFechaNac({ campo: '', valido: null })
        setNhc({ campo: null, valido: null })

        setSexo({ campo: '', valido: null })
        setTelefono({ campo: '', valido: null })
        setDireccion({ campo: '', valido: null })
    }

    const abrirModalInsetar = () => {
        vaciarDatos()
        setModalInsertar(true);
        setMensaje(null)

    }

    const rellenar = async (ids) => {

        setId({ campo: ids.id, valido: 'true' })
        setCi({ campo: ids.ci, valido: 'true' })
        setNombre({ campo: ids.nombre, valido: 'true' })
        setApellidoPat({ campo: ids.apellidoPaterno, valido: 'true' })
        setApellidoMat({ campo: ids.apellidoMaterno, valido: 'true' })
        setNhc({ campo: ids.nhc, valido: 'true' })
        // const receivedDate = json.data[0].fechaNac;
        // const formatedDate = receivedDate.split('/').reverse().join('-');
        setFechaNac({ campo: ids.fechaNac, valido: 'true' })
        setSexo({ campo: ids.sexo, valido: 'true' })
        setTelefono({ campo: ids.telefono, valido: 'true' })
        setDireccion({ campo: ids.direccion, valido: 'true' })
        setModalEditar(true)

    }


    const insertar = async (e) => {

        if (ci.valido === 'true' && nombre.valido === 'true' && apellidoPat.valido === 'true' &&
            apellidoMat.valido === 'true' && nhc.valido === 'true' && fechaNac.valido === 'true' &&
            sexo.valido === 'true' && telefono.valido === 'true' && direccion.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            try {
                axios.post(URL + '/paciente/insertar', {
                    ci: ci.campo,
                    nombre: nombre.campo,
                    apellidoPaterno: apellidoPat.campo,
                    apellidoMaterno: apellidoMat.campo,
                    nhc: nhc.campo,
                    fechaNac: fechaNac.campo,
                    sexo: sexo.campo,
                    telefono: telefono.campo,
                    direccion: direccion.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setPaciente(json.data.data)
                        vaciarDatos()
                        setModalInsertar(false)
                    }
                    else
                        setMensaje(json.data.msg)
                })
            } catch (error) {
                setMensaje('VUELVA A INTENTARLO MAS TARDE !!!')
            }
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }


    const actualizar = async (e) => {
        if (id.valido === 'true' && ci.valido === 'true' && nombre.valido === 'true' && apellidoPat.valido === 'true' &&
            apellidoMat.valido === 'true' && nhc.valido === 'true' && fechaNac.valido === 'true' && sexo.valido === 'true' &&
            telefono.valido === 'true' && direccion.valido === 'true') {
            console.log('pasa validaciones')

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            try {
                axios.post(URL + '/paciente/actualizar', {
                    id: id.campo,
                    ci: ci.campo,
                    nombre: nombre.campo,
                    apellidoPaterno: apellidoPat.campo,
                    apellidoMaterno: apellidoMat.campo,
                    nhc: nhc.campo,
                    fechaNac: fechaNac.campo,
                    sexo: sexo.campo,
                    telefono: telefono.campo,
                    direccion: direccion.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.ok) {
                        setPaciente(json.data.data)
                        vaciarDatos()
                        setModalEditar(false)
                    }
                    else
                        setMensaje(json.data.msg)
                })
            } catch (error) {
                setMensaje('VUELVA A INTENTARLO MAS TARDE !!!')
            }
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }

    }

    const eliminar = async (id) => {
        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok === true) {

            if (id !== null) {
                try {
                    axios.post(URL + '/paciente/eliminar', { id: id }).then(json => {
                        if (json.data.ok) {
                            setPaciente(json.data.data)
                            vaciarDatos()
                        }
                        else
                            setMensaje(json.data.msg)
                    })
                } catch (error) {
                    setMensaje('error de sistema!!!, consulte con el administrador.')
                }
            } else {
                setMensaje('ERROR EN LA SELECCION')
            }
        }
    }

    const buscar = () => {
        if (inputBuscar.valido === 'true') {
            try {
                axios.post(URL + '/paciente/buscar', { dato: inputBuscar.campo }).then(json => {
                    setPaciente(json.data)
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
        let tam = paciente.length - 1
        let id = paciente[tam].id
        axios.post(URL + '/paciente/siguiente', { id: id }).then(json => {
            if (json.data.stop !== true)
                setPaciente(json.data)
        })
    }

    // const anterior = async () => {
    //     let id = paciente[0].id
    //     axios.post(URL + '/paciente/anterior', { id: id }).then(json => {
    //         if (json.data.stop !== true)
    //             setPaciente(json.data)
    //     })
    // }



    const handleClick = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())

    }

    const handleKeyPress = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
    }

    return (
        <div  >
            <div className="hold-transition sidebar-mini" onClick={handleClick} onKeyPress={handleKeyPress}>
                <div className="wrapper">
                    <Home />
                    <div className="content-wrapper">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="page-wrapper" style={{ marginTop: '10px' }}>

                                    <div className='card' >
                                        <div className="card-header">
                                            <h3 className="card-title">Pacientes</h3>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-5 ">
                                                <Button className="btnNuevo" onClick={abrirModalInsetar} >Nuevo</Button>
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
                                        <div className="card-body table table-responsive  " style={{ marginBottom: "0px" }}>
                                            {/* <div className="card-body "> */}

                                            <Table id="example12" className="table table-bordered table-sm">
                                                <thead>
                                                    <tr >
                                                        <th className="col-1 ">C.I.</th>
                                                        <th className="col-3">Paciente</th>

                                                        <th className="col-1">fecha Nac.</th>
                                                        <th className="col-1  text-center">Sexo</th>
                                                        <th className="col-1  text-center">NHC</th>
                                                        <th className="col-1  text-center">TELEF.</th>
                                                        <th className="col-3  ">DIRECCION</th>

                                                        <th className="col-1  text-center">DEL</th>
                                                        <th className="col-1  text-center">UPD</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paciente.map((p) => (
                                                        <tr key={p.ci} >
                                                            <td className="col-1 ">{p.ci}</td>
                                                            <td className="col-3 ">{p.nombre + ' ' + p.apellidoPaterno + ' ' + p.apellidoMaterno}</td>
                                                            <td className="col-1  ">{p.fechaNac}</td>
                                                            <td className="col-1  text-center">{p.sexo}</td>
                                                            <td className="col-1 text-center">{p.nhc}</td>
                                                            <td className="col-1 text-center">{p.telefono}</td>
                                                            <td className="col-3 ">{p.direccion}</td>
                                                            <td className="col-1 text-center"><p  className='btnverSolicitud text-center' onClick={() => eliminar(p.id)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                                                            <td className="col-1 text-center"><p  className='btnverSolicitud text-center' onClick={() => rellenar(p)}><FontAwesomeIcon icon={faEdit} /></p></td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>

                                                </tfoot>
                                            </Table>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><Link className="page-link" to="#" onClick={() => listarPacientes()} >&laquo;</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#" onClick={() => listarPacientes()}>Reinicar</Link></li>
                                                <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>

                                                <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                                            </ul>
                                        </div>



                                        <Modal isOpen={modalInsertar}>
                                            <ModalBody>
                                                <form>
                                                    <div className="row">
                                                        <div>
                                                            <h6>Nuevo Paciente</h6>
                                                            {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                                                        </div>
                                                        <div className="form-group col-5 mb-2 mt-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={ci}
                                                                cambiarEstado={setCi}
                                                                name="ci"
                                                                placeholder="CEDULA DE IDENTIDAD"
                                                                ExpresionRegular={INPUT.CI}  //expresion regular
                                                                etiqueta='CI'
                                                            />
                                                        </div>
                                                        <div className="form-group col-7 mb-2 mt-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={nombre}
                                                                cambiarEstado={setNombre}
                                                                name="nombre"
                                                                placeholder="NOMBRE COMPLETO"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Nombre'
                                                            />
                                                        </div>

                                                        <div className="form-group col-6  mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={apellidoPat}
                                                                cambiarEstado={setApellidoPat}
                                                                name="apellidoPat"
                                                                placeholder="Apellido Paterno"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Apellido Paterno'
                                                            />
                                                        </div>

                                                        <div className="form-group col-6  mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={apellidoMat}
                                                                cambiarEstado={setApellidoMat}
                                                                name="apellidoMat"
                                                                placeholder="Apellido Materno"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Apellido Materno'
                                                            />
                                                        </div>

                                                        <div className="form-group col-5 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={nhc}
                                                                cambiarEstado={setNhc}
                                                                name="nhc"
                                                                ExpresionRegular={INPUT.NHC}  //expresion regular
                                                                placeholder="numero historial clinico"
                                                                etiqueta='Numero historial clinico'
                                                            />
                                                        </div>
                                                        <div className="form-group col-7 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputfecha
                                                                estado={fechaNac}
                                                                cambiarEstado={setFechaNac}
                                                                name="fechaNac"
                                                                ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                etiqueta='FECHA NAC.'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <Select1
                                                                estado={sexo}
                                                                cambiarEstado={setSexo}
                                                                name="sexo"
                                                                ExpresionRegular={INPUT.SEXO}  //expresion regular
                                                                lista={sexos}
                                                                etiqueta='Sexo'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={direccion}
                                                                cambiarEstado={setDireccion}
                                                                name="direccion"
                                                                placeholder="direccion"
                                                                ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                                etiqueta='Direccion'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={telefono}
                                                                cambiarEstado={setTelefono}
                                                                name="telefono"
                                                                placeholder="telefono"
                                                                ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                                                etiqueta='telefono/celular'
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </ModalBody>
                                            <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                                <ul className="pagination pagination-sm m-0 float-right">
                                                    <button className='info' onClick={() => insertar()} style={{ marginRight: '5px' }}>Registrar</button>
                                                    <button className='danger' onClick={() => setModalInsertar(false)} style={{ marginRight: '5px' }}>Cancelar</button>

                                                </ul>
                                            </div>
                                        </Modal>

                                        <Modal isOpen={modalEditar}>
                                            <ModalBody>
                                                <form>
                                                    <div className="row">
                                                        <div>
                                                            <h6>Modificar Registro</h6>
                                                            {mensaje !== '' && <LeyendaError valido='false' >{mensaje}</LeyendaError>}
                                                        </div>
                                                        <div className="form-group col-5 mb-2 mt-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={ci}
                                                                cambiarEstado={setCi}
                                                                name="ci"
                                                                placeholder="CEDULA DE IDENTIDAD"
                                                                ExpresionRegular={INPUT.CI}  //expresion regular
                                                                etiqueta='CI'
                                                            />
                                                        </div>
                                                        <div className="form-group col-7 mb-2 mt-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={nombre}
                                                                cambiarEstado={setNombre}
                                                                name="nombre"
                                                                placeholder="NOMBRE COMPLETO"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Nombre'
                                                            />
                                                        </div>

                                                        <div className="form-group col-6  mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={apellidoPat}
                                                                cambiarEstado={setApellidoPat}
                                                                name="apellidoPat"
                                                                placeholder="Apellido Paterno"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Apellido Paterno'
                                                            />
                                                        </div>

                                                        <div className="form-group col-6  mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={apellidoMat}
                                                                cambiarEstado={setApellidoMat}
                                                                name="apellidoMat"
                                                                placeholder="Apellido Materno"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='Apellido Materno'
                                                            />
                                                        </div>
                                                        <div className='col-5'>
                                                            <ComponenteInputUser
                                                                estado={nhc}
                                                                cambiarEstado={setNhc}
                                                                name="nhc"
                                                                placeholder="N.H.CL."
                                                                ExpresionRegular={INPUT.NHC}  //expresion regular
                                                                etiqueta='NHC'
                                                            />
                                                        </div>

                                                        <div className="form-group col-7 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputfecha
                                                                estado={fechaNac}
                                                                cambiarEstado={setFechaNac}
                                                                name="fechaNac"
                                                                ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                etiqueta='fecha Nac.'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <Select1
                                                                estado={sexo}
                                                                cambiarEstado={setSexo}
                                                                name="sexo"
                                                                ExpresionRegular={INPUT.SEXO}  //expresion regular
                                                                lista={sexos}
                                                                etiqueta='Sexo'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={direccion}
                                                                cambiarEstado={setDireccion}
                                                                name="direccion"
                                                                placeholder="direccion"
                                                                ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                                etiqueta='Direccion'
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 mb-2 mt-1 pr-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={telefono}
                                                                cambiarEstado={setTelefono}
                                                                name="telefono"
                                                                placeholder="telefono"
                                                                ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                                                                etiqueta='telefono/celular'
                                                            />
                                                        </div>
                                                    </div>
                                                </form>

                                            </ModalBody>
                                            <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                                <ul className="pagination pagination-sm m-0 float-right">
                                                    <button className='info' onClick={() => actualizar()} style={{ marginRight: '5px' }}>actualizar</button>
                                                    <button className='danger' onClick={() => setModalEditar(false)} style={{ marginRight: '5px' }}>Cancelar</button>

                                                </ul>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Paciente;
