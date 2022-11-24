
import React from 'react';
import { Link } from 'react-router-dom';

import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEdit, faInfo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import useAuth from "../Auth/useAuth"
import { ComponenteInputUser, Select1 } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import Home from './elementos/home'
import { useState, useEffect } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';


function ItemServicio() {


    const [datos, setDatos] = useState([]);
    const [modalInsertarItem, setModalInsertarItem] = useState(false);
    const [modalEditarItem, setModalEditarItem] = useState(false);
    const [modalInsertarDependientes, setModalInsertarDependientes] = useState(false);
    const [modalEditarDependientes, setModalEditarDependientes] = useState(false)
    const [verDependientes, setVerDependientes] = useState(false);

    const [id, setId] = useState({ campo: null, valido: null })
    const [nombre, setNombre] = useState({ campo: null, valido: null })
    const [nombreDependiente, setNombreDependiente] = useState({ campo: null, valido: null })
    const [codigo, setCodigo] = useState(null)
    const [itemServicio, setItemServicio] = useState([]);


    const [verIntervalo, setVerIntervalo] = useState(false);
    const [modalInsertarIntervalo, setModalInsertatIntervalo] = useState(false)
    const [modalVerIntervalo, setModalVerIntervalo] = useState(false)
    const [idIntervalo, setIdIntervalo] = useState({ campo: null, valido: null })
    const [descripcion, setDescripcion] = useState({ campo: null, valido: null })
    const [metodologia, setMetodologia] = useState({ campo: null, valido: null })
    const [intervalo, setIntervalo] = useState({ campo: null, valido: null })
    const [unidad, setUnidad] = useState({ campo: null, valido: null })
    const [inferior, setInferior] = useState({ campo: null, valido: null })
    const [superior, setSuperior] = useState({ campo: null, valido: null })
    const [edad1, setEdad1] = useState({ campo: null, valido: null })
    const [edad2, setEdad2] = useState({ campo: null, valido: null })
    const [sexo, setSexo] = useState({ campo: null, valido: null })
    const [muestras, setMuestras] = useState({ campo: null, valido: null })
    const [idItemServicio, setIdItemServicio] = useState({ campo: null, valido: null })
    const [sexos] = useState([{ id: "M", nombre: "Masculino" }, { id: "F", nombre: "Femenino" }]);
    const [listIntervalo, setListIntervalo] = useState([])



    const [mensaje, setMensaje] = useState(null)

    const auth = useAuth()
    useEffect(() => {
        listaItemServicio()
    }, [])

    useEffect(() => {
        const inter = setInterval(() => {
            setMensaje(null)
        }, 10000);
        return inter;
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

    const listaItemServicio = async () => {
  
        axios.post(URL + '/itemservicio/all').then(json => {
            setItemServicio(json.data)
        })

    }


    const vaciarDatos = () => {
        setId({ campo: null, valido: null })
        setNombre({ campo: null, valido: 'true' })
    }

    const abrirModalInsetar = () => {

        setModalInsertarItem(true);
        setMensaje(null)

    }

    const abrirModalEditar = (a) => {
        setId({ campo: a.id, valido: 'true' })
        setNombre({ campo: a.item, valido: 'true' })
        setMensaje(null)
        setModalEditarItem(true)
    }

    const insertar = async () => {
        // console.log("datos servicio : ", nombre)
        if (nombre.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]

            await axios.post(URL + '/itemservicio/insertar', {
                nombre: nombre.campo,
                creado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.msg != null) {
                    setMensaje(json.data.msg)
                }
                else {
                    setItemServicio(json.data)
                    vaciarDatos()
                    setModalInsertarItem(false)
                }
            })

        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }


    const actualizar = async (e) => {
        if (id.valido === 'true' && nombre.valido === 'true') {
            console.log('pasa validaciones')

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            axios.post(URL + '/itemservicio/actualizar', {
                id: id.campo,
                nombre: nombre.campo,
                modificado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.msg != null) {
                    setMensaje(json.data.msg)
                }
                else {
                    setItemServicio(json.data)
                    vaciarDatos()
                    setModalEditarItem(false)
                }
            })
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }

    const eliminar = async (codigo) => {

        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok) {
            if (codigo != null) {
                axios.post(URL + '/itemservicio/eliminar', { codigo: codigo }).then(json => {
                    setItemServicio(json.data)
                    setDatos([])
                    vaciarDatos()
                })

            } else {
                setMensaje('ERROR EN LA SELECCION')
            }
        }
    }

    const listarDependientes = (dato) => {
        setNombre({ campo: dato.item, valido: null })
        setCodigo(dato.codigo)
        setDatos([])
        if (dato.codigo !== null) {
            axios.post(URL + '/itemServicio/dependientes1', { dato: dato.codigo }).then(json => {
                setDatos(json.data)
                setModalVerIntervalo(false)
            })
        }
    }
    const añadirDependientes = () => {
        // console.log(codigo, idServicio, nombreDependiente)
        let today = new Date()
        let fecha = today.toISOString().split('T')[0]
        if (codigo !== null && nombreDependiente.valido === 'true') {
            axios.post(URL + '/itemServicio/anadirDependientes',
                {
                    codigo: codigo,
                    nombre: nombreDependiente.campo,
                    creado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.msg != null) {
                        setMensaje(json.data.msg)
                    } else {
                        setDatos(json.data)
                        setNombreDependiente({ campo: null, valido: null })
                        setModalInsertarDependientes(false)
                    }
                })
        }
        else {
            setMensaje('Registro incompleto!')
        }
    }
    const actualizarDependientes = async (e) => {
        if (id.valido === 'true' && codigo !== null && nombreDependiente.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            axios.post(URL + '/itemservicio/actualizarDependientes', {
                id: id.campo,
                codigo: codigo,
                nombre: nombreDependiente.campo,
                modificado: fecha + ' ' + new Date().toLocaleTimeString()
            }).then(json => {
                if (json.data.msg != null) {
                    setMensaje(json.data.msg)
                }
                else {
                    setDatos(json.data)
                    setNombreDependiente({ campo: null, valido: null })
                    setModalEditarDependientes(false)
                }
            })
        } else {
            setMensaje('COMPLETE LOS DATOS!!')
        }
    }



    const eliminarDependiente = async (dato) => {
        const ok = window.confirm('¿está seguro de eliminar este registro?');
        if (ok) {
            if (dato.id != null && dato.codigo != null) {
                axios.post(URL + '/itemservicio/eliminarDependiente', { id: dato.id, codigo: dato.codigo }).then(json => {
                    setDatos(json.data)
                })

            } else {
                setMensaje('ERROR EN LA SELECCION')
            }
        }
    }


    const listaIntervalos = async (intervalo) => {

        setNombre({ campo: intervalo.item, valido: 'true' })
        setIdItemServicio({ campo: intervalo.id, valido: 'true' })
        setDatos([])
        if (intervalo.id != null) {

            axios.post(URL + '/intervalo/all', { id: intervalo.id }).then(json => {
                setDatos(json.data)
                setModalVerIntervalo(false)
            })
        }
        else {
            alert('falta infp')
        }
    }

    const vaciarIntervalos = () => {
        setIdItemServicio({ campo: null, valido: null })
        setDescripcion({ campo: null, valido: null })
        setMetodologia({ campo: null, valido: null })
        setIntervalo({ campo: null, valido: null })
        setUnidad({ campo: null, valido: null })
        setInferior({ campo: null, valido: null })
        setSuperior({ campo: null, valido: null })
        setEdad1({ campo: null, valido: null })
        setEdad2({ campo: null, valido: null })
        setSexo({ campo: null, valido: null })
        setMuestras({ campo: null, valido: null })
        setIdIntervalo({ campo: null, valido: null })
        setNombreDependiente({ campo: null, valido: null })
        setModalInsertatIntervalo(false)
        setVerIntervalo(false)
        setModalVerIntervalo(true)
        // setListIntervalo([])
    }
    const rellenarIntervalo = () => {
        setIdIntervalo({ campo: listIntervalo[0].id, valido: 'true' })
        setIdItemServicio({ campo: listIntervalo[0].idItemServicio, valido: 'true' })
        setDescripcion({ campo: listIntervalo[0].descripcion, valido: 'true' })
        setMetodologia({ campo: listIntervalo[0].metodologia, valido: 'true' })
        setIntervalo({ campo: listIntervalo[0].intervalo, valido: 'true' })
        setUnidad({ campo: listIntervalo[0].unidad, valido: 'true' })
        setInferior({ campo: listIntervalo[0].inferior, valido: 'true' })
        setSuperior({ campo: listIntervalo[0].superior, valido: 'true' })
        setEdad1({ campo: listIntervalo[0].edad1, valido: 'true' })
        setEdad2({ campo: listIntervalo[0].edad2, valido: 'true' })
        setSexo({ campo: listIntervalo[0].sexo, valido: 'true' })
        setMuestras({ campo: listIntervalo[0].muestras, valido: 'true' })
        setModalInsertatIntervalo(true)
        setVerIntervalo(false)
    }

    const mostrarIntervalo = async (intervalo) => {
        if (intervalo != null) {

            axios.post(URL + '/intervalo/ver', { id: intervalo }).then(json => {
                setListIntervalo(json.data)
                setVerIntervalo(false)
                setModalVerIntervalo(true)
            })
        }
        else {
            alert('falta info')
        }
    }

    const añadirIntervalo = () => {

        let today = new Date()
        let fecha = today.toISOString().split('T')[0]
        if (idItemServicio.valido === 'true' && descripcion.valido === 'true' && metodologia.valido === 'true' &&
            intervalo.valido === 'true' && unidad.valido === 'true' && inferior.valido === 'true' &&
            superior.valido === 'true' && edad1.valido === 'true' && edad2.valido === 'true' &&
            sexo.valido === 'true' && muestras.valido === 'true') {

            if (inferior.campo <= superior.campo) {

                if (edad2.campo >= edad1.campo) {
                    axios.post(URL + '/intervalo/insertar',
                        {
                            idItemServicio: idItemServicio.campo,
                            descripcion: descripcion.campo,
                            metodologia: metodologia.campo,
                            intervalo: intervalo.campo,
                            unidad: unidad.campo,
                            inferior: inferior.campo,
                            superior: superior.campo,
                            edad1: edad1.campo,
                            edad2: edad2.campo,
                            sexo: sexo.campo,
                            muestras: muestras.campo,
                            creado: fecha + ' ' + new Date().toLocaleTimeString()
                        }).then(json => {
                            if (json.data.msg != null) {
                                setMensaje(json.data.msg)
                            } else {
                                setDatos(json.data)
                                setIdItemServicio({ campo: null, valido: null })
                                setDescripcion({ campo: null, valido: null })
                                setMetodologia({ campo: null, valido: null })
                                setIntervalo({ campo: null, valido: null })
                                setUnidad({ campo: null, valido: null })
                                setInferior({ campo: null, valido: null })
                                setSuperior({ campo: null, valido: null })
                                setEdad1({ campo: null, valido: null })
                                setEdad2({ campo: null, valido: null })
                                setSexo({ campo: null, valido: null })
                                setMuestras({ campo: null, valido: null })
                                setIdIntervalo({ campo: null, valido: null })
                                setNombreDependiente({ campo: null, valido: null })
                                setModalInsertatIntervalo(false)
                                setListIntervalo([])
                            }
                        })
                }
                else { setMensaje('Edad minima deberia ser mayor a la edad máxima') }
            } else {
                setMensaje('limite superior deberia ser mayo a inferior')
            }
        } else {
            setMensaje('complnte todos los campos')
        }
    }

    const actualizarIntervalo = () => {

        let today = new Date()
        let fecha = today.toISOString().split('T')[0]
        if (idItemServicio.valido === 'true' && descripcion.valido === 'true' && metodologia.valido === 'true' &&
            intervalo.valido === 'true' && unidad.valido === 'true' && inferior.valido === 'true' &&
            superior.valido === 'true' && edad1.valido === 'true' && edad2.valido === 'true' &&
            sexo.valido === 'true' && muestras.valido === 'true' && idIntervalo.valido === 'true') {

            if (inferior.campo <= superior.campo) {

                if (edad2.campo >= edad1.campo) {
                    axios.post(URL + '/intervalo/actualizar',
                        {
                            id: idIntervalo.campo,
                            idItemServicio: idItemServicio.campo,
                            descripcion: descripcion.campo,
                            metodologia: metodologia.campo,
                            intervalo: intervalo.campo,
                            unidad: unidad.campo,
                            inferior: inferior.campo,
                            superior: superior.campo,
                            edad1: edad1.campo,
                            edad2: edad2.campo,
                            sexo: sexo.campo,
                            muestras: muestras.campo,
                            modificado: fecha + ' ' + new Date().toLocaleTimeString()
                        }).then(json => {
                            if (json.data.msg != null) {
                                setMensaje(json.data.msg)
                            } else {
                                setListIntervalo(json.data)
                                setIdItemServicio({ campo: null, valido: null })
                                setDescripcion({ campo: null, valido: null })
                                setMetodologia({ campo: null, valido: null })
                                setIntervalo({ campo: null, valido: null })
                                setUnidad({ campo: null, valido: null })
                                setInferior({ campo: null, valido: null })
                                setSuperior({ campo: null, valido: null })
                                setEdad1({ campo: null, valido: null })
                                setEdad2({ campo: null, valido: null })
                                setSexo({ campo: null, valido: null })
                                setMuestras({ campo: null, valido: null })
                                setIdIntervalo({ campo: null, valido: null })
                                setNombreDependiente({ campo: null, valido: null })
                                setModalInsertatIntervalo(false)
                            }
                        })
                }
                else { setMensaje('Edad minima deberia ser mayor a la edad máxima') }
            } else {
                setMensaje('limite superior deberia ser mayo a inferior')
            }
        } else {
            setMensaje('complnte todos los campos')
        }
    }

    const eliminarIntervalo = () => {
        let ok = window.confirm('liminar registro ?')
        let today = new Date()
        let fecha = today.toISOString().split('T')[0]
        if (listIntervalo[0].id != null && ok) {
            axios.post(URL + '/intervalo/eliminar',
                {
                    id: listIntervalo[0].id,
                    idItemServicio: idItemServicio.campo,
                    modificado: fecha + ' ' + new Date().toLocaleTimeString()
                }).then(json => {
                    if (json.data.msg != null) {
                        setMensaje(json.data.msg)
                    } else {
                        setDatos(json.data)
                        setVerIntervalo(true)
                        setModalVerIntervalo(false)
                    }
                })
        }
    }

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
                    <div className="content-wrapper" onClick={handleClick} onKeyPress={handleKeyPress}>
                        <div className="content">
                            <div className="container-fluid"></div>
                            <div className="page-wrapper  mt-2 row">
                                <div className="col-8 card">
                                    <div className=' mt-2 mb-2'>
                                        <Button className="btnNuevo mt-2" onClick={abrirModalInsetar} >Nuevo</Button>
                                    </div>

                                    <div className="card-body table table-responsive custom " style={{ marginBottom: "0px", padding: '0px' }}>

                                        <Table id="example12" className="  table table-sm">
                                            <thead>
                                                <tr >
                                                    {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                                    <th className="col-4 ">Servicio</th>
                                                    <th className="col-4 ">ITEMS</th>
                                                    <th className="col-1 text-center">REF</th>
                                                    <th className="col-1 text-center">DEL</th>
                                                    <th className="col-1 text-center">UPD</th>
                                                    <th className="col-1 text-center">COMPL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemServicio.map((i) => (
                                                    <tr key={i.item}>
                                                        <td className="col-4">{i.servicio}</td>
                                                        <td className="col-4 ">{i.item}</td>
                                                        <td className="col-1 " ><p className='btnverSolicitud text-center' onClick={() => { listaIntervalos(i); setVerIntervalo(true); setVerDependientes(false) }}><FontAwesomeIcon icon={faInfo} /></p></td>
                                                        <td className="col-1 "><p className='btnverSolicitud text-center' onClick={() => eliminar(i.codigo)}><FontAwesomeIcon icon={faTrashAlt} /></p></td>
                                                        <td className="col-1 "><p className='btnverSolicitud text-center' onClick={() => abrirModalEditar(i)}><FontAwesomeIcon icon={faEdit} /></p></td>
                                                        <td className="col-1 "><p className='btnverSolicitud text-center' onClick={() => { listarDependientes(i); setVerDependientes(true); setVerIntervalo(false) }}><FontAwesomeIcon icon={faAngleRight} /></p></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot >

                                            </tfoot>
                                        </Table>
                                    </div>
                                    <div className="card-footer clearfix">
                                        <ul className="pagination pagination-sm m-0 float-right">
                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listaItemServicio()}>Reinicar</Link></li>

                                        </ul>
                                    </div>
                                </div>
                                <div className=' card col-4 '>
                                    {verDependientes && datos.length > 0 &&
                                        <>

                                            <div className="card-header">
                                                <small className="card-title " style={{ fontSize: '15px' }}>{'DEPENDENCIAS ' + nombre.campo}</small>
                                            </div>
                                            <div className='card-body  table table-responsive custom ' style={{ marginBottom: "0px", padding: '0px' }}>
                                                <Table id="example12" className=" table table-sm">
                                                    <thead>
                                                        <tr >
                                                            {/* <th className="col-1 col-sm-1 col-md-1-col-lg-1  pl-4 pl-lg-4 pl-md-4 pl-sm-4">Nº</th> */}
                                                            <th className="col-5 ">COMPLEMENTOS</th>
                                                            <th className="col-1 text-center">DEL</th>
                                                            <th className="col-1 text-center">UPD</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((d) => (
                                                            <tr key={d.id}>

                                                                <td className="col-5 ">{d.y}</td>

                                                                <td className=" col-1 ">
                                                                    <p onClick={() => eliminarDependiente(d)} className='btnverSolicitud text-center' ><FontAwesomeIcon icon={faTrashAlt} /></p>
                                                                </td>

                                                                <td className="col-1 ">
                                                                    <p onClick={() => {
                                                                        setModalEditarDependientes(true); setId({ campo: d.id, valido: 'true' });
                                                                        setNombreDependiente({ campo: d.y, valido: 'true' }); setCodigo(d.codigo)
                                                                    }}  className='btnverSolicitud text-center'><FontAwesomeIcon icon={faEdit} />
                                                                    </p></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>

                                            </div>
                                            <div className="card-footer clearfix">
                                                <ul className="pagination pagination-sm m-0 float-right">
                                                    <li className="page-item"><Link className="page-link info" to="#" onClick={() => setModalInsertarDependientes(true)}>Añadir</Link></li>

                                                </ul>
                                            </div>

                                        </>
                                    }
                                    {verIntervalo && datos.length > 0 &&
                                        <>
                                            <div className="card-header">
                                                <small className="card-title " style={{ fontSize: '15px' }}>{'INTERVALO DE REFERENCIA ' + nombre.campo}</small>
                                            </div>
                                            <div className='card-body  table table-responsive custom ' style={{ marginBottom: "0px", padding: '0px' }}>
                                                <Table id="example12" className="table table-sm">
                                                    <thead>
                                                        <tr >
                                                            <th className="col-5 ">INTERVALO</th>
                                                            <th className="col-1 text-center">VER</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map((d) => (
                                                            <tr key={d.id}>

                                                                <td className="col-5 ">{d.descripcion}</td>

                                                                <td className=" col-1">
                                                                    <p onClick={() => mostrarIntervalo(d.id)} className='btnverSolicitud text-center' ><FontAwesomeIcon icon={faAngleRight} /></p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                    <tfoot >

                                                    </tfoot>
                                                </Table>

                                            </div>
                                            <div className="card-footer clearfix">
                                                <ul className="pagination pagination-sm m-0 float-right">
                                                    <li className="page-item"><Link className="page-link info" to="#" onClick={() => setModalInsertatIntervalo(true)}>Añadir</Link></li>

                                                </ul>
                                            </div>

                                        </>

                                    }
                                    {
                                        modalVerIntervalo &&
                                        <div >
                                            <div className='card-body'>
                                                <label ><h6 className='text-center'>intervalo de referencia {nombre.campo}</h6></label >

                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label> descripcion: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>{listIntervalo[0].descripcion} </label>
                                                    </div>
                                                </div>

                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label> Metodologia:  </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>{listIntervalo[0].metodologia}</label>
                                                    </div>
                                                </div>

                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label> Intervalo: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label> {listIntervalo[0].intervalo} </label>
                                                    </div>
                                                </div>
                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>Unidad: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].unidad}</label>
                                                    </div>
                                                </div>
                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>Limite inferior: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].inferior}</label>
                                                    </div>
                                                </div>
                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>Limite superior: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].superior}</label>
                                                    </div>
                                                </div>
                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>intervalo de edad: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].edad1 + ' - ' + listIntervalo[0].edad2 + '  años'}</label>
                                                    </div>
                                                </div>
                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>Sexo : </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].sexo}</label>
                                                    </div>
                                                </div>


                                                <div className='row verSolicitud'>
                                                    <div className='col-5 fontTitulo'>
                                                        <label>muestras: </label>
                                                    </div>
                                                    <div className='col-7 fontContenido'>
                                                        <label>  {listIntervalo[0].muestras}</label>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="card-footer clearfix">
                                                <ul className="pagination pagination-sm m-0 float-right">
                                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => { setModalVerIntervalo(false); setVerIntervalo(true) }}>Cerrar</Link></li>
                                                    <li className="page-item mr-1 ml-1"><Link className="page-link" to="#" onClick={() => rellenarIntervalo()}>Actualizar</Link></li>
                                                    <li className="page-item"><Link className="page-link " to="#" onClick={() => eliminarIntervalo()}>eliminar</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    {
                                        datos.length === 0 && verIntervalo === true &&
                                        <div className='row ' style={{ margin: '30px' }}>

                                            <div className='col-12'>
                                                <label>{nombre.campo}</label>
                                                <p style={{ color: "red" }} >No se han registados intervalos de referencia para este servicio</p>
                                                <Button className='info' onClick={() => setModalInsertatIntervalo(true)}>agregar</Button>

                                            </div>

                                        </div>
                                    }
                                    {
                                        datos.length === 0 && verDependientes &&
                                        <div className='row ' style={{ margin: '30px' }}>

                                            <div className='col-12'>
                                                <label>{nombre.campo}</label>
                                                <p style={{ color: "red" }} >No se han registados dependendias para este servicio</p>
                                                <Button className='info' onClick={() => setModalInsertarDependientes(true)}>agregar</Button>

                                            </div>

                                        </div>
                                    }
                                    {
                                        verDependientes === false && verIntervalo === false && datos.length === 0 &&
                                        <div className='row verSolicitud' style={{ margin: '30px' }}>
                                            AREA DE INTERVALOS DE REFERENCIA O LAS SUBCATEGORIAS DE LOS EXAMENES DE LABORATORIO
                                        </div>

                                    }

                                </div>
                                <Modal isOpen={modalInsertarItem}>

                                    <ModalBody>
                                        <form>
                                            <div className="row">
                                                <small>Crear Registro</small>
                                                {mensaje && <label style={{ color: 'red', fontSize: '14px' }}>{mensaje}</label>}

                                                <div className="form-group col-9 mb-2 mt-1 pl-1">
                                                    <ComponenteInputUser
                                                        estado={nombre}
                                                        cambiarEstado={setNombre}
                                                        name="servicio"
                                                        placeholder="ITEMS SERVICIO"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='item'
                                                    />
                                                </div>
                                            </div>
                                        </form>

                                    </ModalBody>
                                    <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                        <ul className="pagination pagination-sm m-0 float-right">
                                            <button className='info' onClick={() => insertar()} style={{ marginRight: '5px' }}>Registrar</button>
                                            <button className='danger' onClick={() => setModalInsertarItem(false)} >Cancelar</button>
                                        </ul>
                                    </div>
                                </Modal>

                                <Modal isOpen={modalEditarItem}>

                                    <ModalBody>
                                        {mensaje && <label style={{ color: 'red', fontSize: '14px' }}>{mensaje}</label>}
                                        <form>
                                            <div className="row">
                                                <small>Actualizar informacion</small>
                                                <div className="form-group col-9 mb-2 mt-1 pl-1">
                                                    <ComponenteInputUser
                                                        estado={nombre}
                                                        cambiarEstado={setNombre}
                                                        name="servicio"
                                                        placeholder="AREA DE SERVICIO"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Item'
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <button className='info' onClick={() => actualizar()} style={{ marginRight: '5px' }}>Registrar</button>
                                                <button className='danger' onClick={() => setModalEditarItem(false)} >Cancelar</button>
                                            </ul>
                                        </div>
                                    </ModalBody>
                                </Modal>
                                <Modal isOpen={modalInsertarDependientes}>

                                    <ModalBody>
                                        {mensaje && <label style={{ color: 'red', fontSize: '14px' }}>{mensaje}</label>}
                                        <form>
                                            <div className="row">
                                                <small>{nombre.campo}</small>
                                                <div className="form-group col-9 mb-2 mt-1 pl-1">
                                                    <ComponenteInputUser
                                                        estado={nombreDependiente}
                                                        cambiarEstado={setNombreDependiente}
                                                        name="servicio"
                                                        placeholder="AREA DE SERVICIO"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Item'
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <button className='info' onClick={() => añadirDependientes()} style={{ marginRight: '5px' }}>Registrar</button>
                                                <button className='danger' onClick={() => setModalInsertarDependientes(false)} >Cancelar</button>
                                            </ul>
                                        </div>
                                    </ModalBody>
                                </Modal>
                                <Modal isOpen={modalEditarDependientes}>
                                    <ModalBody>
                                        {mensaje && <label style={{ color: 'red', fontSize: '14px' }}>{mensaje}</label>}
                                        <form>
                                            <div className="row">
                                                <small>{nombre.campo}</small>
                                                <div className="form-group col-9 mb-2 mt-1 pl-1">
                                                    <ComponenteInputUser
                                                        estado={nombreDependiente}
                                                        cambiarEstado={setNombreDependiente}
                                                        name="servicio"
                                                        placeholder="AREA DE SERVICIO"
                                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                        etiqueta='Item'
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <button className='info' onClick={() => actualizarDependientes()} style={{ marginRight: '5px' }}>actualizar</button>
                                                <button className='danger' onClick={() => setModalEditarDependientes(false)} >Cancelar</button>
                                            </ul>
                                        </div>
                                    </ModalBody>
                                </Modal>

                                <Modal isOpen={modalInsertarIntervalo}>

                                    <ModalBody>
                                        {mensaje && <label style={{ color: 'red', fontSize: '14px' }}>{mensaje}</label>}
                                        <form>
                                            <div className="row">
                                                <small>Añadir intervalo</small>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={descripcion}
                                                        cambiarEstado={setDescripcion}
                                                        name="descripcion"
                                                        placeholder="DESCRIPCION"
                                                        ExpresionRegular={INPUT.TEXT}  //expresion regular
                                                        etiqueta='Descripcion'
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={metodologia}
                                                        cambiarEstado={setMetodologia}
                                                        name="metodologia"
                                                        placeholder="METODOLOGIA"
                                                        ExpresionRegular={INPUT.TEXT}  //expresion regular
                                                        etiqueta='Metodologia'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={intervalo}
                                                        cambiarEstado={setIntervalo}
                                                        name="intervalo"
                                                        placeholder="INTERVALO"
                                                        ExpresionRegular={INPUT.TEXT}  //expresion regular
                                                        etiqueta='Intervalo'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={unidad}
                                                        cambiarEstado={setUnidad}
                                                        name="unidad"
                                                        placeholder="Unidad"
                                                        ExpresionRegular={INPUT.TEXT}  //expresion regular
                                                        etiqueta='Unidad '
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={inferior}
                                                        cambiarEstado={setInferior}
                                                        name="inferior"
                                                        placeholder="LIMITE INFERIOR"
                                                        ExpresionRegular={INPUT.NUMEROS}  //expresion regular
                                                        etiqueta='Limite Inf.'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={superior}
                                                        cambiarEstado={setSuperior}
                                                        name="superior"
                                                        placeholder="LIMITE SUPERIOR"
                                                        ExpresionRegular={INPUT.NUMEROS}  //expresion regular
                                                        etiqueta='Limite Sup.'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={edad1}
                                                        cambiarEstado={setEdad1}
                                                        name="edad2"
                                                        tipo='number'
                                                        placeholder="EDAD 1"
                                                        ExpresionRegular={INPUT.EDAD}  //expresion regular
                                                        etiqueta='desde'
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <ComponenteInputUser
                                                        estado={edad2}
                                                        cambiarEstado={setEdad2}
                                                        name="edad2"
                                                        tipo='number'
                                                        placeholder="EDAD 2"
                                                        ExpresionRegular={INPUT.EDAD}  //expresion regular
                                                        etiqueta='hasta'
                                                    />
                                                </div>
                                                <div className=" col-12">
                                                    <Select1
                                                        estado={sexo}
                                                        cambiarEstado={setSexo}
                                                        name="nombre"
                                                        ExpresionRegular={INPUT.SEXO}  //expresion regular
                                                        lista={sexos}
                                                        etiqueta='Sexo'
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <ComponenteInputUser
                                                        estado={muestras}
                                                        cambiarEstado={setMuestras}
                                                        name="muestras"
                                                        placeholder="muestrar/s"
                                                        ExpresionRegular={INPUT.TEXT}  //expresion regular
                                                        etiqueta='Muestra/s'
                                                    />
                                                </div>

                                            </div>
                                        </form>
                                        <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                                            <ul className="pagination pagination-sm m-0 float-right">

                                                {idIntervalo.valido === 'true' ? <button className='info' onClick={() => actualizarIntervalo()} style={{ marginRight: '5px' }}>Actualizar</button> :
                                                    <button className='info' onClick={() => añadirIntervalo()} style={{ marginRight: '5px' }}>Registrar</button>}
                                                <button className='danger' onClick={() => vaciarIntervalos()} >Cancelar</button>
                                            </ul>
                                        </div>
                                    </ModalBody>
                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ItemServicio;
