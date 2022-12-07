import { Table, Button, Modal, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";

import useAuth from "../Auth/useAuth" // verificacion de la existencia de la sesion
import {
    ComponenteInputBuscar, ComponenteInputfecha, ComponenteInputUser
} from './elementos/input';  // componente input que incluye algunas de las


import { Label, RegistraResultados, InputTabla, Select, InputArea } from './elementos/estilos';
import Home from './elementos/home';
import { URL, INPUT } from '../Auth/config'  // variables globales que estan disponibles para todo el sistema client
import axios from 'axios';
import { Line } from './elementos/estilos';  // componente input que incluye algunas de la



function Resultados() {
    const auth = useAuth()

    const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
    const [resultado, setResultado] = useState({ campo: null, valido: null })
    const [all, setall] = useState(0)
    const [acept, setAcept] = useState(0)
    const [pendding, setPendding] = useState(0)
    const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio
    const [solicitud, setSolicitud] = useState([])

    const [ver, setVer] = useState(false)
    const [lista, setLista] = useState(true)
    const [formulario, setFormulario] = useState(false)   // salas que estan disponibles en el servicio
    const [verEnviar, setVerEnviar] = useState(false)   // ver solicitud nates de enviar
    const [modal, setModal] = useState(false)   // despachar solicitud en caso de banco de sangre y servicio de hemoterapia

    // const [mensaje, setMensaje] = useState(null)
    const [intervalo, setIntervalo] = useState([])

    const [codigo, setCodigo] = useState([])
    const [indice, setIndice] = useState(0)
    const [indiceVer, setIndiceVer] = useState(0)
    const [mensaje, setMensaje] = useState(null)

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
    useEffect(() => {
        setTimeout(() => {
            setMensaje(null)
        }, 10000);
    }, [mensaje])
    try {

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


        const listarIntervalos = async (codigo) => {

            if (codigo != null) {
                axios.post(URL + '/intervalo/listarporcodigo', { codigo: codigo }).then(json => {
                    setIntervalo(json.data)
                })
            }
        }



        const verSolicitud = async (dato) => {
            setIndice(0)
            setIndiceVer(0)

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            let hora = new Date().toLocaleTimeString()
            await axios.post(URL + '/solicitud/verL', { dato: dato, fecha: fecha, hora: hora }).then(json => {
                let data = []
                json.data.forEach(element => {
                    data.push(element.codigo)
                });
                let sel = data.filter((item, index) => {
                    return data.indexOf(item) === index
                })
                setCodigo(sel)
                setSolicitud(json.data)
                setLista(false)
                setVer(true)
                console.log(json.data)
            })
        }


        const capturar = async () => {
            let res = true
            console.log(res, 'entes del bucle')
            solicitud.forEach(ele => {
                if (ele.codigo === codigo[indice]) { // es codigo es un valor que se le asigna a un grupo de examen y sus variantes
                    if (document.getElementById(ele.id + 'resultado').value === '' || document.getElementById(ele.id + 'intervalo').value === '') {
                        res = false
                    }
                }
            })
            console.log(res, 'despues del bucle')

            if (document.getElementById('numMuestra').value !== '' && res === true &&
                document.getElementById('procedenciaMuestra').value !== '' && document.getElementById('numIdentificacionLab').value !== '') {

                solicitud.forEach(ele => {
                    if (ele.codigo === codigo[indice]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        solicitud[i].fechaAnalisis = fechaHoy.campo
                        solicitud[i].resultado = document.getElementById(ele.id + 'resultado').value
                        solicitud[i].intervalo = parseInt(document.getElementById(ele.id + 'intervalo').value)
                        solicitud[i].numMuestra = document.getElementById('numMuestra').value
                        solicitud[i].procedenciaMuestra = document.getElementById('procedenciaMuestra').value
                        solicitud[i].numIdentificacionLab = document.getElementById('numIdentificacionLab').value
                        solicitud[i].interpretacionResLab = document.getElementById('interpretacionResLab').value
                        solicitud[i].condicionMuestra = document.getElementById('condicionMuestra').value
                        solicitud[i].condicionPaciente = document.getElementById('condicionPaciente').value
                        solicitud[i].farmacosPaciente = document.getElementById('farmacosPaciente').value
                        solicitud[i].observacionLab = document.getElementById('observacionLab').value

                    }
                })

                //al capturar los datos se desplaza el formulario hacie otro formulario, si se tiene para ese formulario se rellenan los valores
                let codigoServicio = null
                solicitud.forEach(ele => {
                    if (ele.codigo === codigo[indice + 1]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        codigoServicio = ele.codigo
                        document.getElementById('numMuestra').value = solicitud[i].numMuestra
                        document.getElementById('procedenciaMuestra').value = solicitud[i].procedenciaMuestra
                        document.getElementById('numIdentificacionLab').value = solicitud[i].numIdentificacionLab
                        document.getElementById('interpretacionResLab').value = solicitud[i].interpretacionResLab
                        document.getElementById('condicionMuestra').value = solicitud[i].condicionMuestra
                        document.getElementById('condicionPaciente').value = solicitud[i].condicionPaciente
                        document.getElementById('farmacosPaciente').value = solicitud[i].farmacosPaciente
                        document.getElementById('observacionLab').value = solicitud[i].observacionLab
                    }
                })
                // un espera que se renderize los compenentes de input de los resultado y el select del 
                listarIntervalos(codigoServicio)
                setTimeout(() => {
                    solicitud.forEach(ele => {

                        if (ele.codigo === codigo[indice + 1]) {
                            let i = solicitud.findIndex(e => e.id === ele.id)
                            document.getElementById(ele.id + 'resultado').value = solicitud[i].resultado

                            document.getElementById(ele.id + 'intervalo').value = solicitud[i].intervalo
                            console.log(codigo[indice + 1], "codigo principal", i, 'indice del la solicitud', ele.id, solicitud[i].resultado)
                        }
                    })
                }, 50)
                //incremento del indice del codigo del servicio
                if (indice < codigo.length - 1) {
                    setIndice(indice + 1)
                }
            }
            else { setMensaje('COMPLETE TODOS LOS DATOS REQUERIDOS (*) EN ESTE FORMULARIO') }
        }

        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        const next = () => {
            if (indice < codigo.length - 1) {
                setIndice(indice + 1)
                solicitud.forEach(ele => {

                    if (ele.codigo === codigo[indice + 1]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        document.getElementById('numMuestra').value = solicitud[i].numMuestra
                        document.getElementById('procedenciaMuestra').value = solicitud[i].procedenciaMuestra
                        document.getElementById('numIdentificacionLab').value = solicitud[i].numIdentificacionLab
                        document.getElementById('interpretacionResLab').value = solicitud[i].interpretacionResLab
                        document.getElementById('condicionMuestra').value = solicitud[i].condicionMuestra
                        document.getElementById('condicionPaciente').value = solicitud[i].condicionPaciente
                        document.getElementById('farmacosPaciente').value = solicitud[i].farmacosPaciente
                        document.getElementById('observacionLab').value = solicitud[i].observacionLab
                    }
                })

                listarIntervalos(codigo[indice + 1])
                setTimeout(() => {
                    solicitud.forEach(ele => {

                        if (ele.codigo === codigo[indice + 1]) {
                            let i = solicitud.findIndex(e => e.id === ele.id)
                            document.getElementById(ele.id + 'resultado').value = solicitud[i].resultado

                            document.getElementById(ele.id + 'intervalo').value = solicitud[i].intervalo

                        }
                    })
                }, 200)
            }
        }

        const back = () => {

            if (indice > 0) {
                listarIntervalos(codigo[indice - 1])
                setIndice(indice - 1)
                solicitud.forEach(ele => {
                    if (ele.codigo === codigo[indice - 1]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        document.getElementById('numMuestra').value = solicitud[i].numMuestra
                        document.getElementById('procedenciaMuestra').value = solicitud[i].procedenciaMuestra
                        document.getElementById('numIdentificacionLab').value = solicitud[i].numIdentificacionLab
                        document.getElementById('interpretacionResLab').value = solicitud[i].interpretacionResLab
                        document.getElementById('condicionMuestra').value = solicitud[i].condicionMuestra
                        document.getElementById('condicionPaciente').value = solicitud[i].condicionPaciente
                        document.getElementById('farmacosPaciente').value = solicitud[i].farmacosPaciente
                        document.getElementById('observacionLab').value = solicitud[i].observacionLab
                    }
                })

                setTimeout(() => {
                    solicitud.forEach(ele => {

                        if (ele.codigo === codigo[indice - 1]) {
                            let i = solicitud.findIndex(e => e.id === ele.id)
                            document.getElementById(ele.id + 'resultado').value = solicitud[i].resultado

                            document.getElementById(ele.id + 'intervalo').value = solicitud[i].intervalo
                            console.log(codigo[indice - 1], "codigo principal", i, 'indice del la solicitud', ele.id, solicitud[i].resultado)

                        }
                    })

                }, 200)

            }
        }


        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////
        ///////////////////AFINAR NEXT Y BACK ////////////////////////////////////////////////





        const volverAformulario = () => {
            // listarIntervalos(codigo[indice])
            setVerEnviar(false)
            setTimeout(() => {
                solicitud.forEach(ele => {
                    if (ele.codigo === codigo[indice]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        document.getElementById('numMuestra').value = solicitud[i].numMuestra
                        document.getElementById('procedenciaMuestra').value = solicitud[i].procedenciaMuestra
                        document.getElementById('numIdentificacionLab').value = solicitud[i].numIdentificacionLab
                        document.getElementById('interpretacionResLab').value = solicitud[i].interpretacionResLab
                        document.getElementById('condicionMuestra').value = solicitud[i].condicionMuestra
                        document.getElementById('condicionPaciente').value = solicitud[i].condicionPaciente
                        document.getElementById('farmacosPaciente').value = solicitud[i].farmacosPaciente
                        document.getElementById('observacionLab').value = solicitud[i].observacionLab
                    }
                })
                // document.getElementById('intervalo').value = null
                setTimeout(() => {
                    solicitud.forEach(ele => {

                        if (ele.codigo === codigo[indice]) {
                            let i = solicitud.findIndex(e => e.id === ele.id)
                            document.getElementById(ele.id + 'resultado').value = solicitud[i].resultado

                            document.getElementById(ele.id + 'intervalo').value = solicitud[i].intervalo

                            console.log(codigo[indice - 1], "codigo principal", i, 'indice del la solicitud', ele.id, solicitud[i].resultado)
                        }
                    })

                }, 50)
            }, 500)
            setFormulario(true)
        }

        const abrirFormulario = () => {
            setVer(false)
            setTimeout(() => {
                solicitud.forEach(ele => {
                    if (ele.codigo === codigo[indice]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)
                        document.getElementById(ele.id + 'resultado').value = solicitud[i].resultado
                        document.getElementById('numMuestra').value = solicitud[i].numMuestra
                        document.getElementById('procedenciaMuestra').value = solicitud[i].procedenciaMuestra
                        document.getElementById('numIdentificacionLab').value = solicitud[i].numIdentificacionLab
                        document.getElementById('interpretacionResLab').value = solicitud[i].interpretacionResLab
                        document.getElementById('condicionMuestra').value = solicitud[i].condicionMuestra
                        document.getElementById('condicionPaciente').value = solicitud[i].condicionPaciente
                        document.getElementById('farmacosPaciente').value = solicitud[i].farmacosPaciente
                        document.getElementById('observacionLab').value = solicitud[i].observacionLab
                    }
                })
                // document.getElementById('intervalo').value = null
                listarIntervalos(codigo[indice])


            }, 500)

            setTimeout(() => {
                solicitud.forEach(ele => {

                    if (ele.codigo === codigo[indice]) {
                        let i = solicitud.findIndex(e => e.id === ele.id)

                        document.getElementById(ele.id + 'intervalo').value = solicitud[i].intervalo

                        console.log(codigo[indice - 1], "codigo principal", i, 'indice del la solicitud', ele.id, solicitud[i].resultado)
                    }
                })

            }, 500)

            setFormulario(true)
        }


        const avanzar = () => {
            if (indiceVer < codigo.length - 1)
                setIndiceVer(indiceVer + 1)
        }
        const atras = () => {
            if (indiceVer > 0)
                setIndiceVer(indiceVer - 1)
        }

        const validacionfinal = () => {
            let check = false
            solicitud.forEach(ele => {
                if (ele.resultado !== null && ele.intervalo !== null && ele.numMuestra !== null && ele.procedenciaMuestra !== null &&
                    ele.numIdentificacionLab !== null && ele.fechaAnalisis !== null) {
                    check = true
                    console.log('datos validos')
                }
            })
            if (check === true) {
                console.log('camiamos ventana')
                setFormulario(false)
                setVerEnviar(true)
            }
            else setMensaje('COMPLETAR TODA LA INFORMACION REQUERIDA')
        }

        const enviar = async (lab = false) => {

            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            await axios.post(URL + '/solicitud/grabarresultados', { solicitud: solicitud, fechaHoraPublicacionRes: fecha + ' ' + new Date().toLocaleTimeString() }).then(json => {
                setSolicitud(json.data)
                if (lab)
                    setModal(false)
                else
                    setVerEnviar(false)
                setVer(true)
            })
        }

        const despachar = async () => {
            solicitud.forEach(ele => {
                let i = solicitud.findIndex(e => e.id === ele.id)
                solicitud[i].fechaAnalisis = fechaHoy.campo
                solicitud[i].resultado = resultado.campo
                solicitud[i].intervalo = null
                solicitud[i].numMuestra = null
                solicitud[i].procedenciaMuestra = null
                solicitud[i].numIdentificacionLab = null
                solicitud[i].interpretacionResLab = null
                solicitud[i].condicionMuestra = null
                solicitud[i].condicionPaciente = null
                solicitud[i].farmacosPaciente = null
                solicitud[i].observacionLab = null
            })
            enviar(true)
        }
        return (
            <div>
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
                                                        <div className="font-weight-bold text-center" >
                                                            {
                                                                solicitud.map(e => (
                                                                    e.codigo === codigo[indice] && e.encabezado === 1 &&
                                                                    <RegistraResultados key={e.id} >{e.servicioSolicitado} </RegistraResultados>
                                                                ))
                                                            }
                                                            {mensaje !== null &&
                                                                <RegistraResultados style={{ color: 'red' }}>{mensaje}</RegistraResultados>}
                                                        </div>
                                                    </div>
                                                    <div className="Label-box-footer bg-gray-dark">
                                                        <div className="brand-text font-weight-light text-center" > <Label>{'RED DE SALUD 1 | LABORATORIO '}</Label></div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-11" >

                                                        <div className='row'>
                                                            <div className='col-7'>

                                                                <div className='row'>
                                                                    <div className='col-4'>
                                                                        <ComponenteInputfecha
                                                                            estado={fechaHoy}
                                                                            cambiarEstado={setFechaHoy}
                                                                            name="fechaSolicitud"
                                                                            ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                            etiqueta='fecha analisis'
                                                                        />
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <div className="field">
                                                                            <label>  Numero Muestra *  </label>
                                                                            <InputTabla className="form-control form-control-sm" id={'numMuestra'} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <div className="field ">
                                                                            <label>  Indentificaion laboratorio * </label>
                                                                            <InputTabla className="form-control form-control-sm" id={'numIdentificacionLab'} />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="field ">
                                                                    <label>  Procedencia Muestra *:  </label>
                                                                    <InputTabla className="form-control form-control-sm" id={'procedenciaMuestra'} />
                                                                </div>

                                                                <div className="field ">
                                                                    <label>  Interpretacion laboratorio :  </label>
                                                                    <InputArea className="form-control form-control-sm" id={'interpretacionResLab'} />
                                                                </div>
                                                                <div className="field ">
                                                                    <label>  Condicion Muestra :  </label>
                                                                    <InputArea className="form-control form-control-sm" id={'condicionMuestra'} />
                                                                </div>
                                                                <div className="field ">
                                                                    <label>  Condicion Paciente :  </label>
                                                                    <InputArea className="form-control form-control-sm" id={'condicionPaciente'} />
                                                                </div>
                                                                <div className="field">
                                                                    <label>  farmacos del paciente :  </label>
                                                                    <InputArea className="form-control form-control-sm" id={'farmacosPaciente'} />
                                                                </div>
                                                                <div className="field ">
                                                                    <label>  Otras observaciones :  </label>
                                                                    <InputArea className="form-control form-control-sm" id={'observacionLab'} />
                                                                </div>
                                                            </div>
                                                            <div className='col-1'></div>
                                                            <div className='col-4 float-right'>

                                                                {
                                                                    solicitud.map((input) => (
                                                                        input.codigo === codigo[indice] &&
                                                                        <div key={input.id} className="field ">
                                                                            {
                                                                                input.encabezado === 1 &&
                                                                                <div className='row'>
                                                                                    <div className='col-8'>
                                                                                        <label>  {input.servicioSolicitado + ' : *'}  </label>
                                                                                        <InputTabla className="form-control form-control-sm" id={input.id + 'resultado'} style={{ border: '2px solid blue' }} />
                                                                                    </div>

                                                                                    <div className='col-4'>
                                                                                        <div className="field">
                                                                                            <label>  Intervalo *  </label>
                                                                                            <Select className="form-control form-control-sm" id={input.id + 'intervalo'}   >
                                                                                                <option>seleccione</option>
                                                                                                {
                                                                                                    intervalo.map((i) => (
                                                                                                        i.idItemServicio === input.idItemServicio &&
                                                                                                        <option key={i.id} value={i.id} id={i.id + 'opcion-inter'}>{i.descripcion}</option>

                                                                                                    ))}
                                                                                            </Select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    solicitud.map((input) => (
                                                                        input.codigo === codigo[indice] &&
                                                                        <div key={input.id} className="field ">
                                                                            {
                                                                                input.encabezado === 0 &&
                                                                                <div className='row'>
                                                                                    <div className='col-8 float-right'>
                                                                                        <label>  {input.servicioSolicitado + ' : *'}  </label>
                                                                                        <InputTabla className="form-control form-control-sm" id={input.id + 'resultado'} style={{ border: '' }} />
                                                                                    </div>
                                                                                    <div className='col-4'>
                                                                                        <div className="field">
                                                                                            <label>  Intervalo *  </label>
                                                                                            <Select className="form-control form-control-sm" id={input.id + 'intervalo'}   >
                                                                                                <option>seleccione</option>
                                                                                                {
                                                                                                    intervalo.map((i) => (
                                                                                                        i.idItemServicio === input.idItemServicio &&
                                                                                                        <option key={i.id} value={i.id} id={i.id + 'opcion-inter'}>{i.descripcion}</option>
                                                                                                    ))}
                                                                                            </Select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1'>
                                                        <div className='row contendorButton'>
                                                            <>
                                                                <Button className='mt-3 cancelar' onClick={() => abandonarFormularioEditar()}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                                <Button className='mt-3 actualizar' onClick={() => capturar()}><FontAwesomeIcon icon={faCheck} /> </Button>
                                                                <Button className='mt-3 autorizar' onClick={() => validacionfinal()}><FontAwesomeIcon icon={faAngleRight} /> </Button>
                                                            </>
                                                        </div>
                                                    </div>
                                                </div >
                                                <div className="card-footer clearfix">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { back() }} >&laquo;</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { back() }}>anterior</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { next() }}>Siguiente</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { next() }}>&raquo;</Link></li>
                                                    </ul>
                                                </div>
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
                                                                    <th className="col-1  text-center">estado</th>
                                                                    <th className="col-1  text-center">R-LAB</th>
                                                                    <th className="col-1  text-center">G-INF</th>
                                                                    <th className="col-1  text-center">N.H.C</th>
                                                                    <th className="col-1 text-center">ver</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {cantidad.map((c) => (
                                                                    <tr key={c.id + 'sol'}>
                                                                        <td className="col-1  text-center">{c.cantidad}</td>
                                                                        <td className="col-2  text-center">{c.fecha}</td>
                                                                        <td className="col-1  text-center">{c.ci}</td>
                                                                        <td className="col-2 ">{c.paciente}</td>
                                                                        <td className="col-2 ">{c.diagnostico}</td>

                                                                        {c.estado === 1 ? <td className="col-1 listEstado  text-center " style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado text-center " ><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.recibidoLab === 1 ? <td className="col-1 listEstado  text-center" style={{ color: "#198754" }} ><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado  text-center"><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.resultadoRecibido === 1 ? <td className="col-1 listEstado  text-center" style={{ color: "#198754" }} ><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado  text-center"><FontAwesomeIcon icon={faTimes} /> </td>}

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
                                                        <Button className=' success' onClick={() => buscarPorFecha()}>buscar</Button>
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
                                            <div>
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
                                                                        <label>Codigo solicitud: </label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].codigoSol}</label>
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
                                                                        <label> Seguro:  </label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>{solicitud[0].seguro}</label>
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
                                                                        <label>  {solicitud[0].horaSol.split(':')[0] + ':' + solicitud[0].horaSol.split(':')[1]}</label>
                                                                    </div>
                                                                </div>




                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>Fecha de autorizacion</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].fechaHoraAutorizacion ? solicitud[0].fechaHoraAutorizacion.split('T')[0] + '  ' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0].split(':')[0] + ':' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0].split(':')[1] : '-'}</label>
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>FECHA Y HORA DE RECEPCION:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label >  {solicitud[0].fechaRecLab ? solicitud[0].fechaRecLab.split('T')[0] + '   ' + solicitud[0].horaRecLab.split(':')[0] + ':' + solicitud[0].horaRecLab.split(':')[1] : '-'} </label >
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>Fecha y hora publicacion resultado:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].fechaHoraPublicacionRes ? solicitud[0].fechaHoraPublicacionRes.split('T')[0] + '         ' + solicitud[0].fechaHoraPublicacionRes.split('T')[1].split('.')[0].split(':')[0] + ':' + solicitud[0].fechaHoraPublicacionRes.split('T')[1].split('.')[0].split(':')[1] : '-'}</label>
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>hecha y hora Generacion del informe:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label >  {solicitud[0].fechaGenInforme ? solicitud[0].fechaGenInforme.split('T')[0] + '  ' + solicitud[0].fechaGenInforme.split('T')[1].split('.')[0].split(':')[0] + ' ' + solicitud[0].fechaGenInforme.split('T')[1].split('.')[0].split(':')[1] : '-'} </label >
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className='col-5'>
                                                                <div className='fontTitulo'>
                                                                    {solicitud.map((item) => (
                                                                        item.codigo === codigo[indiceVer] &&
                                                                        item.encabezado === 1 &&
                                                                        <div className='row verSolicitud ' key={item.id}>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'FECHA : '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label>  {item.fechaAnalisis ? item.fechaAnalisis.split('T')[0] : '-'}</label>
                                                                            </div>
                                                                            {
                                                                                solicitud[0].servicio !== 'BANCO DE SANGRE' && solicitud[0].servicio !== 'SERVICIOS DE HEMOTERAPIA' &&
                                                                                <div className='row verSolicitud '>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'Muestra: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.numMuestra || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'Procedencia Muestra: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.procedenciaMuestra || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'# Identificacion: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.numIdentificacionLab || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'Interpretacion: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.interpretacionResLab || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'condiciones Muestra: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.condicionMuestra || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'condiciones Paciente: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.condicionPaciente || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'Farmacos del Paciente: '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.farmacosPaciente || '-'} </label >
                                                                                    </div>
                                                                                    <div className='col-5 fontTitulo float-right'>
                                                                                        <label>{'Otras Observaciones '}</label>
                                                                                    </div>
                                                                                    <div className='col-7 fontContenido float-left'>
                                                                                        <label >  {item.observacionLab || '-'} </label >
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>

                                                                    ))}
                                                                    <div className='card-body table table-responsive' style={{ marginBottom: "0px", padding: '0px' }}>
                                                                        {
                                                                            solicitud[0].servicio !== 'BANCO DE SANGRE' && solicitud[0].servicio !== 'SERVICIOS DE HEMOTERAPIA' &&
                                                                            <Table style={{ border: 'none' }}>
                                                                                <tbody>

                                                                                    {
                                                                                        solicitud.map(e => (
                                                                                            e.codigo === codigo[indiceVer] && e.encabezado === 1 &&
                                                                                            <tr key={e.id} >
                                                                                                <td className='col-4' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.servicioSolicitado}</td>
                                                                                                <td className='col-3' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.resultado}</td>
                                                                                                <td className='col-5' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.descripcion}</td>
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                    {solicitud.map(e => (
                                                                                        e.codigo === codigo[indiceVer] && e.encabezado === 0 &&
                                                                                        <tr key={e.id}>
                                                                                            <td className='col-4' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.servicioSolicitado}</td>
                                                                                            <td className='col-3' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.resultado}</td>
                                                                                            <td className='col-5' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.descripcion}</td>
                                                                                        </tr>
                                                                                    ))}

                                                                                </tbody>
                                                                            </Table>
                                                                        }
                                                                        {
                                                                            (solicitud[0].servicio === 'BANCO DE SANGRE' || solicitud[0].servicio === 'SERVICIOS DE HEMOTERAPIA') &&
                                                                            <Table style={{ border: 'none', marginTop: '30px' }}>
                                                                                <tbody>
                                                                                    {
                                                                                        solicitud.map(e => (
                                                                                            <tr key={e.id} >
                                                                                                <td className='col-4' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.servicioSolicitado}</td>
                                                                                                <td className='col-2' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}></td>
                                                                                                <td className='col-6' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.resultado}</td>
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                </tbody>
                                                                            </Table>
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1 check-r'>
                                                        <div className='row contendorButton'>
                                                            <button className='mt-3 cancelar' onClick={() => abandonarVentanaVer()}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                                                            {
                                                                solicitud[0].resultadoRecibido === 0 &&
                                                                solicitud[0].servicio !== 'BANCO DE SANGRE' && solicitud[0].servicio !== 'SERVICIOS DE HEMOTERAPIA' &&
                                                                <button className='mt-3 autorizar' onClick={() => abrirFormulario()}><FontAwesomeIcon icon={faEdit} /> </button>
                                                            }
                                                            {
                                                                solicitud[0].resultadoRecibido === 0 &&
                                                                (solicitud[0].servicio === 'BANCO DE SANGRE' || solicitud[0].servicio === 'SERVICIOS DE HEMOTERAPIA') &&
                                                                <button className='mt-3 autorizar' onClick={() => setModal(true)}><FontAwesomeIcon icon={faCheck} /> </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer clearfix">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { atras() }} >&laquo;</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { atras() }}>anterior</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { avanzar() }}>Siguiente</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { avanzar() }}>&raquo;</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                        {
                                            verEnviar === true &&
                                            <div>
                                                <div className='row paginaversolicitud'>
                                                    <div className='col-11'>
                                                        <div className='mt-1 mb-1'>
                                                            <h6 className='text-center'>REVISION DE DATOS</h6>
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
                                                                        <label>Codigo solicitud: </label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].codigoSol}</label>
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
                                                                        <label> Seguro:  </label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>{solicitud[0].seguro}</label>
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
                                                                        <label>  {solicitud[0].horaSol.split(':')[0] + ':' + solicitud[0].horaSol.split(':')[1]}</label>
                                                                    </div>
                                                                </div>



                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>Fecha de autorizacion</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].fechaHoraAutorizacion ? solicitud[0].fechaHoraAutorizacion.split('T')[0] + '  ' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0].split(':')[0] + ':' + solicitud[0].fechaHoraAutorizacion.split('T')[1].split('.')[0].split(':')[1] : '-'}</label>
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>FECHA Y HORA DE RECEPCION:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label >  {solicitud[0].fechaRecLab ? solicitud[0].fechaRecLab.split('T')[0] + '   ' + solicitud[0].horaRecLab.split(':')[0] + ':' + solicitud[0].horaRecLab.split(':')[1] : '-'} </label >
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>Fecha y hora publicacion resultado:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label>  {solicitud[0].fechaHoraPublicacionRes ? solicitud[0].fechaHoraPublicacionRes.split('T')[0] + '         ' + solicitud[0].fechaHoraPublicacionRes.split('T')[1].split('.')[0].split(':')[0] + ':' + solicitud[0].fechaHoraPublicacionRes.split('T')[1].split('.')[0].split(':')[1] : '-'}</label>
                                                                    </div>
                                                                </div>


                                                                <div className='row verSolicitud'>
                                                                    <div className='col-5 fontTitulo'>
                                                                        <label>hecha y hora Generacion del informe:</label>
                                                                    </div>
                                                                    <div className='col-7 fontContenido'>
                                                                        <label >  {solicitud[0].fechaGenInforme ? solicitud[0].fechaGenInforme.split('T')[0] + '  ' + solicitud[0].fechaGenInforme.split('T')[1].split('.')[0].split(':')[0] + ' ' + solicitud[0].fechaGenInforme.split('T')[1].split('.')[0].split(':')[1] : '-'} </label >
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className='col-5'>
                                                                <div className='fontTitulo'>
                                                                    {solicitud.map((item) => (
                                                                        item.codigo === codigo[indiceVer] &&
                                                                        item.encabezado === 1 &&
                                                                        <div className='row verSolicitud ' key={item.id}>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'FECHA : '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.fechaAnalisis || '   -'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'Muestra: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.numMuestra || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'Procedencia Muestra: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.procedenciaMuestra || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'# Identificacion: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.numIdentificacionLab || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'Interpretacion: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.interpretacionResLab || ''} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'condiciones Muestra: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.condicionMuestra || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'condiciones Paciente: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.condicionPaciente || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'Farmacos del Paciente: '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.farmacosPaciente || '-'} </label >
                                                                            </div>
                                                                            <div className='col-5 fontTitulo float-right'>
                                                                                <label>{'Otras Observaciones '}</label>
                                                                            </div>
                                                                            <div className='col-7 fontContenido float-left'>
                                                                                <label >  {item.observacionLab || '-'} </label >
                                                                            </div>
                                                                        </div>

                                                                    ))}
                                                                    <div className='card-body table table-responsive' style={{ marginBottom: "0px", padding: '0px' }}>
                                                                        <Table style={{ border: 'none' }}>
                                                                            <tbody>
                                                                                {solicitud.map(e => (
                                                                                    e.codigo === codigo[indiceVer] && e.encabezado === 1 &&
                                                                                    <tr key={e.id} >
                                                                                        <td className='col-4' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.servicioSolicitado}</td>
                                                                                        <td className='col-3' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.resultado}</td>
                                                                                        <td className='col-5' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.descripcion}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                {solicitud.map(e => (
                                                                                    e.codigo === codigo[indiceVer] && e.encabezado === 0 &&
                                                                                    <tr key={e.id}>
                                                                                        <td className='col-4' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.servicioSolicitado}</td>
                                                                                        <td className='col-3' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.resultado}</td>
                                                                                        <td className='col-5' style={{ margin: "0px", padding: '3px', fontSize: '11px' }}>{e.descripcion}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1 check-r'>
                                                        <div className='row contendorButton'>
                                                            <button color="danger" className='mt-3 cancelar' onClick={() => volverAformulario()}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                                                            <button color="danger" className='mt-3 autorizar' onClick={() => enviar()}><FontAwesomeIcon icon={faAngleRight} /> </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer clearfix">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { atras() }} >&laquo;</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='back' onClick={() => { atras() }}>anterior</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { avanzar() }}>Siguiente</Link></li>
                                                        <li className="page-item"><Link className="page-link" to="#" id='next' onClick={() => { avanzar() }}>&raquo;</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modal}>
                    <ModalBody>
                        <form>
                            <div className="row">
                                <div>
                                    <h3>Modificar Registro</h3>
                                </div>
                                <div className='col-4'>
                                    <ComponenteInputfecha
                                        estado={fechaHoy}
                                        cambiarEstado={setFechaHoy}
                                        name="fechaSolicitud"
                                        ExpresionRegular={INPUT.FECHA}  //expresion regular
                                        etiqueta='fecha analisis'
                                    />
                                </div>
                                <div className="form-group col-9 mb-2 mt-1 pl-1">
                                    <ComponenteInputUser
                                        estado={resultado}
                                        cambiarEstado={setResultado}
                                        name="resultado"
                                        placeholder="DESCRIPCION"
                                        ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                                        etiqueta='Descripcion'
                                    />
                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <div className="card-footer clearfix" style={{ paddingTop: '0px' }}>
                        <ul className="pagination pagination-sm m-0 float-right">
                            <button className='info' onClick={() => despachar()} style={{ marginRight: '5px' }}>GUARDAR</button>
                            <button className='danger' onClick={() => setModal(false)} >Cancelar</button>
                        </ul>
                    </div>
                </Modal>
            </div >

        );
    } catch (error) {
        auth.logout()
    }
}
export default Resultados;
