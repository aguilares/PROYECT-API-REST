import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useEffect, useState } from "react";

import Home from './elementos/home'
import { URL, INPUT } from '../Auth/config'  // variables globales que estan disponibles para todo el sistema client

import useAuth from "../Auth/useAuth" // verificacion de la existencia de la sesion
import { ComponenteInputBuscar, ComponenteInputfecha, ComponenteInputUser } from './elementos/input';  // componente input que incluye algunas de las
import { Line } from './elementos/estilos';  // componente input que incluye algunas de las
import axios from 'axios';

function AtorizarSolicitud() {


    const auth = useAuth()

    let fecha = new Date().toLocaleDateString()
    // console.log('fecha de loggg : ', fecha.toLocaleString())
    let año = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    if (mes < 10) {
        mes = 0 + '' + mes
    }
    if (dia < 10) {
        dia = 0 + '' + dia

    }
    const [fechaHoy, setFechaHoy] = useState({ campo: año + '-' + mes + '-' + dia, valido: 'true' })

    const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
    const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio y registros
    const [solicitud, setSolicitud] = useState([]) // cantidad de solicitudes en inicio y registros
    const [all, setall] = useState(0)
    const [acept, setAcept] = useState(0)
    const [pendding, setPendding] = useState(0)


    // const [color, setColor] = useState(null)
    const [ver, setVer] = useState(false)
    const [descripcion, setDescripcion] = useState(false)
    const [texto, setTexto] = useState({ campo: null, valido: false })
    useEffect(() => {
        listar()
        count()
    }, [solicitud])
    const count = async () => {
        try {
            let list = []

            await axios.post(URL + '/solicitud/countA').then(json => {
                json.data.map((datos) => (
                    list.push(datos.estado)
                ))
            })
            setall(list.length)
            setPendding(list.filter((num) => num === 0).length)
            setAcept(list.filter((num) => num === 1).length)

        } catch (error) {

            let location = window.location.href
            window.location.href = location
            return error
        }
    }
    const listar = async () => {
        try {

            await axios.post(URL + '/solicitud/listarA').then(json => {
                setCantidad(json.data)
            })

        } catch (error) {

            let location = window.location.href
            window.location.href = location
            return error

        }
    }

    try {

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



        const verSolicitud = async (dato) => {

            await axios.post(URL + '/solicitud/ver', { dato: dato }).then(json => {
                setSolicitud(json.data)
            })
            setVer(true)
        }

        const autorizar = async (dato) => {

            let ok = window.confirm('AUTORIZAR SOLICITUD ?')

            if (ok === true && solicitud !== null && solicitud[0].estado === 0 && solicitud[0].codigoSol === dato) {

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]

                await axios.post(URL + '/solicitud/autorizar', {

                    codigoSol: dato,
                    fecha: fecha + ' ' + new Date().toLocaleTimeString()

                }).then(json => {

                    // console.log(json.data)
                    setSolicitud(json.data)
                    // console.log(solicitud)
                })

            }
        }
        const eliminar = async () => {

            let ok = window.confirm('AUTORIZAR SOLICITUD ?')

            if (ok === true && solicitud !== null && texto.valido === 'true' && solicitud[0].codigoSol != null) {

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]

                await axios.post(URL + '/solicitud/eliminarA', {

                    codigoSol: solicitud[0].codigoSol,
                    texto: texto.campo + '  /ACCION REALIZADA EN:  ' + fecha + '   ' + new Date().toLocaleTimeString()

                }).then(json => {

                    // console.log(json.data)
                    setCantidad(json.data)
                    setDescripcion(false)
                    setVer(false)
                    setTexto({ campo: null, valido: null })
                    setSolicitud([])
                    // console.log(solicitud)
                })
            }
        }




        const buscar = async () => {
            if (ciBuscar.valido === 'true') {
                await axios.post(URL + '/solicitud/buscarA', { dato: ciBuscar.campo }).then(json => {
                    setCantidad(json.data)
                })
            }
        }

        const buscarPorFecha = async () => {
            console.log('fecha actual: ', fechaHoy)
            // const fechaSolicitud = fechaHoy.toISOString().split('T')[0]

            if (fechaHoy.valido === 'true') {
                await axios.post(URL + '/solicitud/buscarfechaA', { fecha: fechaHoy.campo }).then(json => {
                    setCantidad(json.data)
                })
            }
        }
        const preanalitico = async () => {
            await axios.post(URL + '/solicitud/preanaliticoA').then(json => {
                setCantidad(json.data)
            })
        }
        const analitico = async () => {
            await axios.post(URL + '/solicitud/analiticoA').then(json => {
                setCantidad(json.data)
            })
        }
        const postanalico = async () => {
            await axios.post(URL + '/solicitud/postanaliticoA').then(json => {
                setCantidad(json.data)
            })
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
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="container-fluid ">
                                    <div className="page-wrapper">
                                        {ver === false &&
                                            <div className='row'>
                                                <div className='card col-10'>
                                                    <div className="row mt-2 mb-2 ">
                                                        <div className='col-5'></div>
                                                        <div className=" col-7">
                                                            <ComponenteInputBuscar
                                                                estado={ciBuscar}
                                                                cambiarEstado={setCiBuscar}
                                                                tipo="text"
                                                                name="buscarCi"
                                                                placeholder="C.I."
                                                                ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                                // className_="form-control form-control-sm mr-0 ml- "
                                                                eventoBoton={buscar}
                                                                etiqueta={'Buscar'}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="table table-responsive custom">

                                                        {/* <Table id="example12" className="col-12 table-striped table table-sm"> */}
                                                        <Table id="example12" className=" table table-sm">
                                                            <thead>
                                                                <tr >
                                                                    <th className="col-1  text-center">items</th>
                                                                    <th className="col-2  text-center">fecha</th>
                                                                    <th className="col-1  text-center">C.I.</th>
                                                                    <th className="col-2 ">Paciente</th>
                                                                    <th className="col-2  ">diagnostico</th>
                                                                    <th className="col-1  text-center">estado</th>
                                                                    <th className="col-1  text-center">R-LAB</th>
                                                                    <th className="col-1  text-center">G-INF</th>
                                                                    <th className="col-1 text-center">N.H.C</th>
                                                                    <th className="col-1 text-center">ver</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {cantidad.map((c) => (
                                                                    <tr key={c.id}>
                                                                        <td className="col-1  text-center">{c.cantidad}</td>
                                                                        <td className="col-2 text-center">{c.fecha}</td>
                                                                        <td className="col-1 text-center">{c.ci}</td>
                                                                        <td className="col-2  ">{c.paciente}</td>
                                                                        <td className="col-2  ">{c.diagnostico}</td>
                                                                        {c.estado === 1 ? <td className="col-1 listEstado  text-center " style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado text-center "><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.recibidoLab === 1 ? <td className="col-1 listEstado  text-center" style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado  text-center"><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.publisher === 1 ? <td className="col-1 text-center listEstado" style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /></td> :
                                                                            <td className="col-1 text-center listEstado"><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        <td className="col-1  text-center">{c.nhc}</td>
                                                                        <td className="col-1  text-center"> <div className='btnverSolicitud' onClick={() => verSolicitud(c.codigoSol)}><FontAwesomeIcon icon={faAngleRight} /> </div></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>

                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                </div>
                                                <div className="col-2">

                                                    <div className="progress-group">
                                                        Pendientes
                                                        <span className="float-right"><b>{pendding}</b>/{all}</span>
                                                        <div className="progress progress-sm">
                                                            <Line className="progress-bar bg-danger" valor={(pendding * 100) / all}></Line>
                                                        </div>
                                                    </div>

                                                    <div className="progress-group">
                                                        <span className="progress-text">Aceptados</span>
                                                        <span className="float-right"><b>{acept}</b>/{all}</span>
                                                        <div className="progress progress-sm">
                                                            <Line className="progress-bar bg-success " valor={(acept * 100) / all}></Line>
                                                        </div>
                                                    </div>
                                                    <div className='calendario'>
                                                        <ComponenteInputfecha
                                                            estado={fechaHoy}
                                                            cambiarEstado={setFechaHoy}
                                                            name="fechaSolicitud"
                                                            ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                            etiqueta='ORGANIZAR POR FECHA'
                                                        />
                                                        <Button className='success' onClick={() => buscarPorFecha()}>Buscar</Button>
                                                    </div>
                                                    <div className='botonOrganizar'>
                                                        <label>ORGANIZAR POR FASE</label>
                                                        <Button className='  danger' onClick={() => preanalitico()}>Preanalitico</Button>
                                                        <Button className=' info' onClick={() => analitico()}>Analitico</Button>
                                                        <Button className=' success' onClick={() => postanalico()}>PostAnalitico</Button>
                                                    </div>
                                                </div>
                                            </div>



                                        }

                                        {
                                            ver === true &&
                                            <div className='row paginaversolicitud'>
                                                <div className='col-11'>
                                                    {/* <div className='m'> */}
                                                    <label ><h6 className='text-center'>SOLICITUD DE EXAMEN DE LABORATORIO</h6></label >
                                                    {/* </div> */}

                                                    <div className='row'>
                                                        <div className='col-7'>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label> SOLICITANTE: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>{solicitud[0].solicitante} </label>
                                                                </div>
                                                            </div>

                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label> Seguro:  </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>{solicitud[0].seguro}</label>
                                                                </div>
                                                            </div>

                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label> Paciente: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label> {solicitud[0].paciente} </label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>C.I.: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].ci}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Diagnostico: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].diagnostico}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Numero Historial Clinico: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].nhc}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Fecha de solicitud: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].fecha}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Hora de solicitud: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].horaSol}</label>
                                                                </div>
                                                            </div>


                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Codigo solicitud: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].codigoSol}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Resultado recibido: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].resultadoRecibido === 1 ? 'SI' : 'NO'}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Estado: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].estado === 1 ? 'Autorizado' : 'Pendiente'}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Fecha de autorizacion</label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].fechaHoraAutorizacion ? solicitud[0].fechaHoraAutorizacion.split('T')[0] + '  ' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0] : '.............'}</label>
                                                                </div>
                                                            </div>

                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Items: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    {solicitud.map((item) => (

                                                                        <label key={item.idItemServicio}>  {item.servicioSolicitado} </label >
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-5'>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Solicitud Recepcionado:</label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].recibidoLab ? 'SI' : 'NO'}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>FECHA Y HORA DE RECEPCION:</label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label >  {solicitud[0].fechaRecLab ? solicitud[0].fechaRecLab + '   ' + solicitud[0].horaRecLab : '..............'} </label >
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>hecha y hora Generacion del informe:</label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label >  {solicitud[0].fechaGenInforme ? solicitud[0].fechaHoraAutorizacion.split('T')[0] + '  ' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0] : '.............'} </label >
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Resultado Disponible: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label >  {solicitud[0].publisher ? 'SI' : 'NO'} </label >
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Fecha y hora publicacion resultado:</label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label >  {solicitud[0].fechaHoraPublicacionRes || '.............'} </label >
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-1 check-r'>
                                                    <div className='row contendorButton'>
                                                        <div className='row contendorButton'>
                                                            <Button className='mt-3 actualizar' onClick={() => setVer(false)}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                            {
                                                                solicitud[0].estado === 0 &&
                                                                <Button className='mt-3 autorizar' onClick={() => autorizar(solicitud[0].codigoSol)}><FontAwesomeIcon icon={faCheck} /> </Button>
                                                            }
                                                            <Button className='mt-3 eliminar' onClick={() => { setDescripcion(true) }}><FontAwesomeIcon icon={faTrashAlt} /> </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        }
                                        <Modal isOpen={descripcion}>
                                            <ModalHeader>
                                                <div>
                                                    <h3>Añadir Descripcion</h3>
                                                </div>
                                            </ModalHeader>
                                            <ModalBody>
                                                <form>
                                                    <div className="row">
                                                        <div className="form-group col-9 mb-2 mt-1 pl-1">
                                                            <ComponenteInputUser
                                                                estado={texto}
                                                                cambiarEstado={setTexto}
                                                                name="servicio"
                                                                placeholder="AREA DE SERVICIO"
                                                                ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                                                etiqueta='Item'
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                <ModalFooter>
                                                    <button className='btn btn-success' onClick={() => eliminar()}>eliminar</button>
                                                    <button className='btn btn-danger' onClick={() => { setDescripcion(false); setTexto({ campo: null, valido: false }) }} >Cancelar</button>
                                                </ModalFooter>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </>
        );
    } catch (error) {
        auth.logout()
    }
}
export default AtorizarSolicitud;
