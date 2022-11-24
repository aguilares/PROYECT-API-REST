import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";

import useAuth from "../Auth/useAuth" // verificacion de la existencia de la sesion
import {
    ComponenteInputBuscar, ComponenteInputfecha
} from './elementos/input';  // componente input que incluye algunas de las


import { Label, InputTabla, Select } from './elementos/estilos';
import Home from './elementos/home';
import { URL, INPUT } from '../Auth/config'  // variables globales que estan disponibles para todo el sistema client
import axios from 'axios';
import { Line } from './elementos/estilos';  // componente input que incluye algunas de la



function Resultados() {
    const auth = useAuth()
    try {

        const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
        const [all, setall] = useState(0)
        const [acept, setAcept] = useState(0)
        const [pendding, setPendding] = useState(0)
        const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio y registros
        const [solicitud, setSolicitud] = useState([])

        const [ver, setVer] = useState(false)
        const [lista, setLista] = useState(true)
        const [formulario, setFormulario] = useState(false)   // salas que estan disponibles en el servicio

        // const [mensaje, setMensaje] = useState(null)
        const [intervalo, setIntervalo] = useState([])

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

        const count = async () => {

            let list = []

            await axios.post(URL + '/solicitud/countL').then(json => {
                json.data.map((datos) => (
                    list.push(datos.estado)
                ))
            })
            setall(list.length)
            setPendding(list.filter((num) => num === 0).length)
            setAcept(list.filter((num) => num === 1).length)

        }

        const listar = async () => {
            // console.log('ya viene la lista')
            await axios.post(URL + '/solicitud/listarL').then(json => {
                setCantidad(json.data)
            })
        }


        useEffect(() => {
            listar()
            count()
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

        const verSolicitud = async (dato) => {
            await axios.post(URL + '/solicitud/verL', { dato: dato }).then(json => {
                // console.log(json.data)
                setSolicitud(json.data)
                setLista(false)
                setVer(true)
            })

        }
        const abandonarVentanaVer = () => {
            listar()
            setLista(true)
            setSolicitud([])
            setVer(false)
        }
        const abandonarFormularioEditar = () => {
            setVer(true)
            setFormulario(false)
        }

        const buscar = async () => {
            if (ciBuscar.valido === 'true') {
                await axios.post(URL + '/solicitud/buscarS', { dato: ciBuscar.campo }).then(json => {
                    setCantidad(json.data)
                })
            }
        }

        const buscarPorFecha = async () => {
            console.log('fecha actual: ', fechaHoy)
            // const fechaSolicitud = fechaHoy.toISOString().split('T')[0]

            if (fechaHoy.valido === 'true') {
                await axios.post(URL + '/solicitud/buscarfechaS', { fecha: fechaHoy.campo }).then(json => {
                    setCantidad(json.data)
                })
            }
        }
        const preanalitico = async () => {
            await axios.post(URL + '/solicitud/preanaliticoS').then(json => {
                setCantidad(json.data)
            })
        }
        const analitico = async () => {
            await axios.post(URL + '/solicitud/analiticoS').then(json => {
                setCantidad(json.data)
            })
        }
        const postanalico = async () => {
            await axios.post(URL + '/solicitud/postanaliticoS').then(json => {
                setCantidad(json.data)
            })
        }

        const siguiente = async () => {
            if (solicitud.length > 0) {
                let tam = solicitud.length - 1
                let id = solicitud[tam].id
                axios.post(URL + '/paciente/siguiente', { id: id }).then(json => {
                    if (json.data.stop !== true)
                        setSolicitud(json.data)
                })
            }
        }



        const listarIntervalos = async (id) => {

            await axios.post(URL + '/intervalo/all', { id:  id}).then(json => {
                setIntervalo(json.data)
            })
        }
        return (
            <>
                <div className="hold-transition sidebar-mini">
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="container-fluid ">
                                    <div className="page-wrapper mt-2">
                                        {
                                            formulario === true &&

                                            <div className="card p-2 mt-2">
                                                <div className="small-box mb-2">
                                                    <div className="inner">
                                                        <div className="font-weight-bold text-center" ><Label >GRABAR RESULTADOS </Label></div>
                                                    </div>
                                                    <div className="Label-box-footer bg-gray-dark">
                                                        <div className="brand-text font-weight-light text-center" > <Label>{'RED DE SALUD 1 | LABORATORIO ' + localStorage.getItem('laboratorio') + ' '}</Label></div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-11" >


                                                        <div className='col-6 col-sm-6 col-md-4 col-lg-4'>
                                                            <ComponenteInputfecha
                                                                estado={fechaHoy}
                                                                cambiarEstado={setFechaHoy}
                                                                name="fechaSolicitud"
                                                                ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                etiqueta='FECHA DE ANALISIS'
                                                            />
                                                        </div>

                                                        <div className='card'>
                                                            <div className="card-body table table-responsive custom" style={{ marginBottom: "0px", padding: '0px' }}>

                                                                <Table id="example12" className="table table-sm">
                                                                    <thead>
                                                                        <tr >
                                                                            <th className="col-1  text-center">INTERVALO DE REFERENCIA</th>
                                                                            <th className="col-1  text-center">RESULTADOS</th>

                                                                            <th className="col-1 text-center">NUM. MUESTRA</th>
                                                                            <th className="col-2  text-center">PROCEDENCIA MUESTRA</th>
                                                                            <th className="col-1 text-center">FECHA OBT. MUESTRA</th>
                                                                            <th className="col-2 ">NUM. IDENTITIFICACION LAB</th>
                                                                            <th className="col-2  ">INTERPRETACION</th>
                                                                            <th className="col-1  text-center">CONDICION MUESTRA</th>
                                                                            <th className="col-1  text-center">CONDICION PACIENTE</th>
                                                                            <th className="col-1  text-center">FARMACOS PACIENTE</th>
                                                                            <th className="col-1  text-center">OBSERVACIONES</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {solicitud.map((s) => (
                                                                            s.encabezado === 1 ?
                                                                                <tr style={{ background: '#006572' }} key={s.id}>

                                                                                    <td className="col-1  text-center" onClick={()=>listarIntervalos(s.idItemServicio)}><Select  className="form-control form-control-sm" id={s.id + s.resultado + s.codigo} name={s.id + s.resultado} >
                                                                                        <option>seleccione</option>
                                                                                        {intervalo.map((i)=>(
                                                                                          <option key={i.id} value={i.id}>{i.descripcion}</option>  
                                                                                        ))
                                                                                        }
                                                                                        </Select></td>

                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.resultado} name={s.id + s.resultado} encabezado={true} /></td>

                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.numMuetra} name={s.id + s.numMuetra} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.procedenciaMuestra} name={s.id + s.procedenciaMuestra} encabezado={true} /></td>

                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.fechaHoraObtMuestra} name={s.id + s.fechaHoraObtMuestra} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.numIdentificacionLab} name={s.id + s.numIdentificacionLab} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.interpretacionResLab} name={s.id + s.interpretacionResLab} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.condicionMuestra} name={s.id + s.condicionMuestra} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.condicionPaciente} name={s.id + s.condicionPaciente} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.farmacosPaciente} name={s.id + s.farmacosPaciente} encabezado={true} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.observacionLab} name={s.id + s.observacionLab} encabezado={true} /></td>
                                                                                </tr> :

                                                                                <tr key={s.id}>
                                                                                    <td className="col-1  text-center" onClick={()=>listarIntervalos(s.idItemServicio)}><Select  className="form-control form-control-sm" id={s.id + s.resultado + s.codigo} name={s.id + s.resultado} >
                                                                                        <option>seleccione</option>
                                                                                        {intervalo.map((i)=>(
                                                                                          <option key={i.id} value={i.id}>{i.descripcion}</option>  
                                                                                        ))
                                                                                        }
                                                                                        </Select></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.resultado} name={s.id + s.resultado} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.numMuetra} name={s.id + s.numMuetra} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.procedenciaMuestra} name={s.id + s.procedenciaMuestra} /></td>

                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.fechaHoraObtMuestra} name={s.id + s.fechaHoraObtMuestra} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.numIdentificacionLab} name={s.id + s.numIdentificacionLab} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.interpretacionResLab} name={s.id + s.interpretacionResLab} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.condicionMuestra} name={s.id + s.condicionMuestra} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.condicionPaciente} name={s.id + s.condicionPaciente} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.farmacosPaciente} name={s.id + s.farmacosPaciente} /></td>
                                                                                    <td className="col-1  text-center"><InputTabla id={s.id + s.observacionLab} name={s.id + s.observacionLab} /></td>
                                                                                </tr>

                                                                        ))}
                                                                    </tbody>
                                                                    <tfoot>

                                                                    </tfoot>
                                                                </Table>
                                                            </div>
                                                            <div className="card-footer clearfix">
                                                                <ul className="pagination pagination-sm m-0 float-right">
                                                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => listar()} >&laquo;</Link></li>
                                                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => listar()}>Reinicar</Link></li>
                                                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>
                                                                    <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1'>
                                                        <div className='row contendorButton'>
                                                            <>
                                                                <Button color="danger" className='mt-3 cancelar' onClick={() => abandonarFormularioEditar()}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                                {/* <Button className='mt-3 actualizar' onClick={() => actualizar()}><FontAwesomeIcon icon={faEdit} /> </Button> */}
                                                            </>

                                                        </div>
                                                    </div>
                                                </div >
                                            </div >
                                        }
                                        {
                                            lista === true &&
                                            <div className='row'>
                                                <div className=' col-10 card'>
                                                    <div className="row mt-2 mb-2">
                                                        <div className='col-5 '>
                                                        </div>

                                                        <div className='col-7 '>

                                                            <ComponenteInputBuscar
                                                                estado={ciBuscar}
                                                                cambiarEstado={setCiBuscar}
                                                                name="buscarCi"
                                                                placeholder="C.I."
                                                                ExpresionRegular={INPUT.INPUT_BUSCAR}  //expresion regular
                                                                eventoBoton={buscar}
                                                                etiqueta={'Buscar'}
                                                            />
                                                        </div>

                                                    </div>
                                                    {/* <br /> */}
                                                    <div className="card-body table table-responsive custom" style={{ marginBottom: "0px", padding: '0px' }}>

                                                        <Table id="example12" className="table table-sm">
                                                            <thead>
                                                                <tr >
                                                                    <th className="col-1 text-center">Items</th>
                                                                    <th className="col-2  text-center">FSecha</th>
                                                                    <th className="col-1 text-center">C.I.</th>
                                                                    <th className="col-2 ">Paciente</th>
                                                                    <th className="col-2  ">Diagnostico</th>
                                                                    <th className="col-1  text-center">ESTADO</th>
                                                                    <th className="col-1  text-center">R-LAB</th>
                                                                    <th className="col-1  text-center">G-INF</th>
                                                                    <th className="col-1  text-center">N.H.C</th>
                                                                    <th className="col-1 text-center">ver</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {cantidad.map((c) => (
                                                                    <tr key={c.id}>
                                                                        <td className="col-1  text-center">{c.cantidad}</td>
                                                                        <td className="col-2  text-center">{c.fecha}</td>
                                                                        <td className="col-1  text-center">{c.NumMuetra}</td>
                                                                        <td className="col-2 ">{c.paciente}</td>
                                                                        <td className="col-2 ">{c.procedenciaMuestra}</td>

                                                                        {c.estado === 1 ? <td className="col-1 listEstado  text-center " style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado text-center " ><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.recibidoLab === 1 ? <td className="col-1 listEstado  text-center" style={{ color: "#198754" }} ><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado  text-center"><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.publisher === 1 ? <td className="col-1 text-center listEstado" style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 text-center listEstado"><FontAwesomeIcon icon={faTimes} /> </td>}


                                                                        <td className="col-1  text-center">{c.nhc}</td>
                                                                        <td className="col-1  text-center "> <p className='btnverSolicitud' onClick={() => verSolicitud(c.codigoSol)}><FontAwesomeIcon icon={faAngleRight} /> </p></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>

                                                            </tfoot>
                                                        </Table>
                                                    </div>
                                                    <div className="card-footer clearfix">
                                                        <ul className="pagination pagination-sm m-0 float-right">
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listar()} >&laquo;</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => listar()}>Reinicar</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>
                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>























                                                <div className="col-2 check-r">
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
                                                        <Button color='success' className=' modificarSeleccion' onClick={() => buscarPorFecha()}>buscar</Button>
                                                    </div>
                                                    <div className='botonOrganizar'>
                                                        <label>ORGANIZAR POR FASE</label>
                                                        <Button color='danger' className='  modificarSeleccion' onClick={() => preanalitico()}>Preanalitico</Button>
                                                        <Button color='success' className=' modificarSeleccion' onClick={() => analitico()}>Analitico</Button>
                                                        <Button color='primary' className=' modificarSeleccion' onClick={() => postanalico()}>PostAnalitico</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            ver === true &&

                                            <div className='row paginaversolicitud'>
                                                <div className='col-11'>
                                                    <div className='mt-3 mb-2'>
                                                        <label ><h6 className='text-center'>SOLICITUD DE EXAMEN DE LABORATORIO</h6></label >
                                                    </div>

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
                                                                    <label>  {solicitud[0].NumMuetra}</label>
                                                                </div>
                                                            </div>
                                                            <div className='row verSolicitud'>
                                                                <div className='col-5 fontTitulo'>
                                                                    <label>Diagnostico: </label>
                                                                </div>
                                                                <div className='col-7 fontContenido'>
                                                                    <label>  {solicitud[0].procedenciaMuestra}</label>
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

                                                            <div className='row '>
                                                                <div className='col-5 fontTitulo'>
                                                                    <p>Items: </p>
                                                                </div>
                                                                <div className='col-7 fontTitulo'>
                                                                    {solicitud.map((item) => (
                                                                        <p key={item.servicioSolicitado}>  {item.servicioSolicitado} </p >
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
                                                                    <label >  {solicitud[0].fechaGenInforme ? solicitud[0].fechaGenInforme.split('T')[0] + '  ' + solicitud[0].fechaGenInforme.split('T')[1].split('.')[0] : '.............'} </label >
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
                                                        <button color="danger" className='mt-3 cancelar' onClick={() => abandonarVentanaVer()}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                                                        <button color="danger" className='mt-3 cancelar' onClick={() => {
                                                            setFormulario(true);
                                                            setVer(false)
                                                        }}><FontAwesomeIcon icon={faAngleRight} /> </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    } catch (error) {
        // auth.logout()
    }
}
export default Resultados;
