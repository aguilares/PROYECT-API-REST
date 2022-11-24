import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faDownload, faEdit, faNotesMedical, faRecycle, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";

import useAuth from "../Auth/useAuth" // verificacion de la existencia de la sesion
import {
    Select1, ComponenteInputBuscar, ComponenteInputfecha, ComponenteInputUserDisabled, ComponenteInputHora, ComponenteCheck, ComponenteInputUserRow,
    ComponenteInputBuscarPaciente, ComponenteInputUserDisabledRow, SelectRow, GenerarPdf

} from './elementos/input';  // componente input que incluye algunas de las

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import { Label } from './elementos/estilos';
import Home from './elementos/home';
import { URL, INPUT } from '../Auth/config'  // variables globales que estan disponibles para todo el sistema client
import axios from 'axios';
import { Line } from './elementos/estilos';  // componente input que incluye algunas de la



function RegistrarSolicitud() {
    const auth = useAuth()
    try {

        const [ciBuscar, setCiBuscar] = useState({ campo: null, valido: null })
        const [all, setall] = useState(0)
        const [acept, setAcept] = useState(0)
        const [pendding, setPendding] = useState(0)
        const [cantidad, setCantidad] = useState([]) // cantidad de solicitudes en inicio y registros
        const [solicitud, setSolicitud] = useState([])
        const [informe, setInforme] = useState([])

        const [seguros, setSeguros] = useState([])
        const [servicio, setServicio] = useState([])
        const [ver, setVer] = useState(false)
        const [pdf, setPdf] = useState(false)
        const [lista, setLista] = useState(true)
        const [verListaExamen, setVerListarExamen] = useState(false)
        const [formulario, setFormulario] = useState(false)   // salas que estan disponibles en el servicio
        const [idServicio, setIdServicio] = useState({ campo: null, valido: null })
        const [examenesSeleccionados, setExamenesSeleccionados] = useState([])
        const [examenesSeleccionadosMostrar, setExamenesSeleccionadosMostrar] = useState([])
        // const [mensaje, setMensaje] = useState(null)




        const [examen, setExamen] = useState([])
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

        const [fechaSolicitud, setFechaSolicitud] = useState({ campo: año + '-' + mes + '-' + dia, valido: 'true' })
        const [codigoSol, setCodigoSol] = useState(null)
        const [idPaciente, setIdPaciente] = useState(null)
        const [ci, setCi] = useState({ campo: null, valido: null })
        const [edad, setEdad] = useState({ campo: null, valido: null })
        const [sexo, setSexo] = useState({ campo: null, valido: null })
        const [nhc, setNhc] = useState({ campo: null, valido: null })
        const [fechaNac, setFechaNac] = useState({ campo: null, valido: null })
        const [nombrePaciente, setNombrePaciente] = useState({ campo: null, valido: null })
        const [diagnostico, setDiagnostico] = useState({ campo: null, valido: null })
        const [HoraSolicitud, setHoraSolicitud] = useState({ campo: new Date().toLocaleTimeString(), valido: 'true' })
        const [idSeguro, setIdseguro] = useState({ campo: null, valido: null })
        // const [inputChecked, setInputChecked] = useState([])

        const count = async () => {

            let list = []

            await axios.post(URL + '/solicitud/countS').then(json => {
                json.data.map((datos) => (
                    list.push(datos.estado)
                ))
            })
            setall(list.length)
            setPendding(list.filter((num) => num === 0).length)
            setAcept(list.filter((num) => num === 1).length)

        }

        const listar = async () => {

            await axios.post(URL + '/solicitud/listarS').then(json => {
                setCantidad(json.data)
            })
        }

        const listaSeguro = async () => {

            axios.post(URL + '/seguro/all').then(json => {
                console.log('datos de los seguros: ', json.data)
                setSeguros(json.data)
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


        const buscarPaciente = async () => {
            if (ci.valido === 'true') {

                await axios.post(URL + '/paciente/buscar', { dato: ci.campo }).then(json => {

                    if (json.data.length > 0) {
                        setIdPaciente(json.data[0].id) // el atributo .id consuce directamente a un error de modo que cuando no se encuentre ningun registro para dicho ci 
                        setCi({ campo: json.data[0].ci, valido: 'true' })
                        setNombrePaciente({ campo: json.data[0].nombre + ' ' + json.data[0].apellidoPaterno + ' ' + json.data[0].apellidoMaterno, valido: 'true' })
                        setNhc({ campo: json.data[0].nhc, valido: 'true' })
                        setSexo({ campo: json.data[0].sexo, valido: 'true' })
                        setFechaNac({ campo: json.data[0].fechaNac.split('T')[0], valido: 'true' })
                        let hoy = new Date()
                        let antes = new Date(json.data[0].fechaNac) // formato: yyyy-MM-dd
                        let edad1 = hoy.getFullYear() - antes.getFullYear()
                        let mes = hoy.getMonth() - antes.getMonth()
                        if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
                            edad1--
                        }
                        setEdad({ campo: edad1, valido: 'true' })
                        // console.log('Paciente: ', json.data)
                    }
                })
            }
        }


        const cargarServicio = async () => {

            await axios.post(URL + '/servicio/listaSimple').then(json => {
                setServicio(json.data)
                // console.log(json.data)
            })
        }
        const listarExamenes = async (id = null) => {


            const ids = idServicio.campo || id
            if (id === null) {
                setExamenesSeleccionados([])
            }
            if (ids !== null) {

                await axios.post(URL + '/itemservicio/listar', { id: ids }).then(json => {
                    setExamen(json.data)
                    let data = []
                    examenesSeleccionados.forEach(x => {
                        json.data.forEach(y => {
                            if (x === y.idItemServicio) {
                                data.push({ nombre: y.servicioSolicitado })
                            }
                        })
                    })

                    setExamenesSeleccionadosMostrar(data)

                    // if (solicitud.length === 0) {
                    //     setExamen(json.data)
                    // } else {

                    //     let data = []
                    //     let c = 0
                    //     json.data.forEach(x => {
                    //         solicitud.forEach(y => {
                    //             if (y.idItemServicio === x.idItemServicio) {

                    //                 data.push({ id: x.idItemServicio, item: x.servicioSolicitado, checked: true })
                    //                 delete (json.data[c])
                    //             }
                    //         })
                    //         c++
                    //     })
                    //     json.data.forEach(dato =>{
                    //         data.push({id: dato.idItemServicio, item: dato.servicioSolicitado, checked: false})
                    //     })
                    //     setInputChecked(data)
                    // }
                    // setExamenesSeleccionados([])

                })
            }
        }


        const verSolicitud = async (dato) => {
            await axios.post(URL + '/solicitud/ver', { dato: dato }).then(json => {
                console.log(json.data)
                setSolicitud(json.data)
                setLista(false)
                setVer(true)
            })

        }
        const abandonarVentanaVer = () => {
            listar()
            setLista(true)
            setSolicitud([])
            setSolicitud([])
            setVer(false)
        }
        const abandonarFormularioEditar = () => {
            setVerListarExamen(false)
            setVer(true)
            setFormulario(false)
            vaciarFormulario()
            setExamenesSeleccionadosMostrar([])
        }
        const abandonarFormularioInsertar = () => {
            setLista(true)
            setFormulario(false)
            vaciarFormulario()
            setExamenesSeleccionadosMostrar([])

        }
        const vaciarFormulario = () => {
            setIdPaciente(null)
            setCodigoSol(null)
            setCi({ campo: null, valido: null })
            setEdad({ campo: null, valido: null })
            setSexo({ campo: null, valido: null })
            setNhc({ campo: null, valido: null })
            setFechaNac({ campo: null, valido: null })
            setNombrePaciente({ campo: null, valido: null })
            setDiagnostico({ campo: null, valido: null })
            setIdseguro({ campo: null, valido: null })
            setIdServicio({ campo: null, valido: null })
            setExamenesSeleccionados([])
            setExamen([])
        }

        const nuevaSolicitud = () => {
            setFormulario(true)
            setLista(false)
            cargarServicio()
            listaSeguro()
        }

        const actualizarSolicitud = () => {
            console.log(solicitud)
            setCodigoSol(solicitud[0].codigoSol)
            setCi({ campo: solicitud[0].ci, valido: 'true' })
            setIdPaciente(solicitud[0].idPaciente)
            setFechaNac({ campo: solicitud[0].fechaNac, valido: 'true' })
            setFechaSolicitud({ campo: solicitud[0].fecha, valido: 'true' })
            setHoraSolicitud({ campo: solicitud[0].horaSol, valido: 'true' })
            setNombrePaciente({ campo: solicitud[0].paciente, valido: 'true' })
            setDiagnostico({ campo: solicitud[0].diagnostico, valido: 'true' })
            let hoy = new Date()
            let antes = new Date(solicitud[0].fechaNac) // formato: yyyy-MM-dd
            let edad1 = hoy.getFullYear() - antes.getFullYear()
            let mes = hoy.getMonth() - antes.getMonth()
            if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
                edad1--
            }
            setEdad({ campo: edad1, valido: 'true' })
            setSexo({ campo: solicitud[0].sexo, valido: 'true' })
            setIdseguro({ campo: solicitud[0].idSeguro, valido: 'true' })
            setNhc({ campo: solicitud[0].nhc, valido: 'true' })
            setIdServicio({ campo: solicitud[0].idServicio, valido: 'true' })
            cargarServicio()
            listaSeguro()
            setVer(false)
            setFormulario(true)
            solicitud.forEach(x => {
                examenesSeleccionados.push(x.idItemServicio)
            })
            listarExamenes(solicitud[0].idServicio)

        }

        const asignarExamenesSeleccionados = async () => {
            let data = []
            examenesSeleccionados.forEach(x => {
                examen.forEach(y => {
                    // console.log(x, y)
                    if (x === y.idItemServicio) {
                        data.push({ nombre: y.servicioSolicitado })
                    }

                })
            })

            setExamenesSeleccionadosMostrar(data)

        }

        const mostrarListaExamenes = async () => {
            setVerListarExamen(true)
            setExamenesSeleccionados([])
            // console.log('examenes seleccionados.:',examenesSeleccionados)
            asignarExamenesSeleccionados()

        }



        const registrar = async () => {
            // console.log(fechaSolicitud, HoraSolicitud, idSeguro, diagnostico, 'idPaciente: ',idPaciente)
            if (fechaSolicitud.valido === 'true' && HoraSolicitud.valido === 'true' && idSeguro.valido === 'true' &&
                diagnostico.valido === 'true' && idPaciente !== null) {
                let seleccionExamen = []
                let ce = 0
                examenesSeleccionados.forEach(adm => {
                    if (adm !== null) {
                        seleccionExamen[ce] = adm
                        ce++
                    }
                });
                // console.log(fechaSolicitud, HoraSolicitud, idSeguro, diagnostico, idPaciente, seleccionExamen)

                if (seleccionExamen.length > 0) {
                    await axios.post(URL+'/solicitud/listarexamen', {examen:seleccionExamen}).then(
                        json=>{
                            // console.log('data final',json.data)
                            axios.post(URL + '/solicitud/registrarS', {
                                fecha: fechaSolicitud.campo,
                                hora: HoraSolicitud.campo,
                                diagnostico: diagnostico.campo,
                                seguro: idSeguro.campo,
                                paciente: idPaciente,
                                examen: json.data
                            }).then(json => {
                                console.log(json.data.codigo, '  codigo')
                                verSolicitud(json.data.codigo)
                                abandonarFormularioInsertar()
                            })
                        }
                    )
                }
                else {
                }
            }
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


        const actualizar = async () => {
            if (fechaSolicitud.valido === 'true' && HoraSolicitud.valido === 'true' && idSeguro.valido === 'true' &&
                nhc.valido === 'true' && diagnostico.valido === 'true' && idPaciente !== null && codigoSol !== null) {
                let seleccionExamen = []
                let ce = 0
                examenesSeleccionados.forEach(adm => {
                    if (adm !== null) {
                        seleccionExamen[ce] = adm
                        ce++
                    }
                });
                if (seleccionExamen.length > 0) {
                    await axios.post(URL + '/solicitud/actualizarS', {
                        codigoSol: codigoSol,
                        fecha: fechaSolicitud.campo,
                        hora: HoraSolicitud.campo,
                        diagnostico: diagnostico.campo,
                        seguro: idSeguro.campo,
                        paciente: idPaciente,
                        examen: seleccionExamen
                    }).then(json => {
                        setSolicitud(json.data)
                        abandonarFormularioEditar()
                        // setVerListarExamen(false)
                    })
                }
                else {
                    alert("POR FAVOR SELECCIONE AL MENOS UN EXAMEN DE LOS DISPONIBLES")
                }
            }
            else { alert("faltan datos") }
        }

        const eliminarSolicitud = () => {
            const ok = window.confirm('DESEA ELIMINAR ESTE REGISTRO ?')
            if (ok && solicitud[0].codigoSol !== null) {
                axios.post(URL + '/solicitud/eliminarS', { codigoSol: solicitud[0].codigoSol }).then(json => {
                    setCantidad(json.data)
                })
                setLista(true)
                setSolicitud([])
                setVer(false)
            }
        }
        const generarInforme = async (movil = false) => {

            if (solicitud[0].codigoSol) {

                let today = new Date()
                let fecha = today.toISOString().split('T')[0]
                await axios.post(URL + '/solicitud/genInforme', {

                    codigoSol: solicitud[0].codigoSol,
                    fecha: fecha + ' ' + new Date().toLocaleTimeString()

                }).then(json => {

                    if (json.data.length > 0) {
                        // console.log(json.data)
                        setInforme(json.data)

                        if (movil === true) {
                            // setInforme(json.data)
                            // if (jso !== null) {
                            document.getElementById('descargarDocu').click()
                            // setInforme([])
                            // }
                        }
                        else {
                            setPdf(true)
                            setVer(false)
                        }
                    }

                })
            }
        }

        // const siguiente = async () => {
        //     if (solicitud.length > 0) {
        //         let tam = solicitud.length - 1
        //         let id = solicitud[tam].id
        //         axios.post(URL + '/paciente/siguiente', { id: id }).then(json => {
        //             if (json.data.stop !== true)
        //                 setSolicitud(json.data)
        //         })
        //     }
        // }


        return (
            <>
                <div className="hold-transition sidebar-mini">
                    <div className="wrapper">
                        <Home />
                        <div className="content-wrapper">
                            <div className="content">
                                <div className="container-fluid ">
                                    <div className="page-wrapper" style={{ marginTop: '5px' }}>
                                        {
                                            formulario === true &&

                                            <div className="card p-2 mt-2">
                                                <div className="small-box mb-2">
                                                    <div className="inner">
                                                        {
                                                            solicitud.length > 0 &&
                                                            <div className="font-weight-bold text-center" ><Label >ACTUALIZAR SOLICITUD DE EXAMENES DE LABORATORIO Y SERVICIO DE SANGRE SEGURA </Label></div>

                                                        }
                                                        {
                                                            solicitud.length === 0 &&
                                                            <div className="font-weight-bold text-center" ><Label >SOLICITUD DE EXAMENES DE LABORATORIO Y SERVICIO DE SANGRE SEGURA </Label></div>

                                                        }
                                                    </div>
                                                    <div className="Label-box-footer bg-gray-dark">
                                                        <div className="brand-text font-weight-light text-center" > <Label>{'RED DE SALUD 1 | LABORATORIO ' + localStorage.getItem('laboratorio') + ' '}</Label></div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-11" >
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                                <div className='row'>
                                                                    <div className='col-7'>
                                                                        <ComponenteInputBuscarPaciente
                                                                            estado={ci}
                                                                            cambiarEstado={setCi}
                                                                            name="ci"
                                                                            placeholder="C.I."
                                                                            ExpresionRegular={INPUT.CI}  //expresion regular
                                                                            eventoBoton={buscarPaciente}
                                                                            etiqueta='Cédula de Identidad'
                                                                        />
                                                                    </div>
                                                                    <div className='col-5'>
                                                                        <ComponenteInputUserDisabled
                                                                            estado={fechaNac}
                                                                            cambiarEstado={setFechaNac}
                                                                            name="fechaNac"
                                                                            ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                            etiqueta='FECHA DE NACIMIENTO'
                                                                        />
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                                                <div className='row'>
                                                                    <div className='col-6'>
                                                                        <ComponenteInputfecha
                                                                            estado={fechaSolicitud}
                                                                            cambiarEstado={setFechaSolicitud}
                                                                            name="fechaSolicitud"
                                                                            ExpresionRegular={INPUT.FECHA}  //expresion regular
                                                                            className_="form-control form-control-sm"
                                                                            etiqueta='FECHA DE SOLICITUD'
                                                                        />
                                                                    </div>
                                                                    <div className='col-6'>
                                                                        <ComponenteInputHora
                                                                            estado={HoraSolicitud}
                                                                            cambiarEstado={setHoraSolicitud}
                                                                            name="horaSolicitud"
                                                                            ExpresionRegular={INPUT.HORA}  //expresion regular
                                                                            className_="form-control form-control-sm"
                                                                            etiqueta='HORA DE SOLICITUD'
                                                                        />
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <ComponenteInputUserDisabledRow
                                                                estado={nombrePaciente}
                                                                cambiarEstado={setNombrePaciente}
                                                                name="paciente"
                                                                ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                                                                etiqueta='PACIENTE'
                                                            />
                                                            <ComponenteInputUserRow
                                                                estado={diagnostico}
                                                                cambiarEstado={setDiagnostico}
                                                                name="DIAGNOSTICO"
                                                                ExpresionRegular={INPUT.DIAGNOSTICO}  //expresion regular
                                                                etiqueta={'DIAGNOSTICO  '}
                                                            />
                                                            <div className="col-12" >
                                                                <div className='row'>
                                                                    <div className='row col-5'>
                                                                        <div className='col-6'>
                                                                            <ComponenteInputUserDisabled
                                                                                estado={edad}
                                                                                cambiarEstado={setEdad}
                                                                                name="edad"
                                                                                ExpresionRegular={INPUT.EDAD}  //expresion regular
                                                                                etiqueta='EDAD'
                                                                            />
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <ComponenteInputUserDisabled
                                                                                estado={sexo}
                                                                                cambiarEstado={setSexo}
                                                                                name="sexo"
                                                                                ExpresionRegular={INPUT.SEXO}  //expresion regular
                                                                                etiqueta='SEXO'
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                    <div className='row col-6'>
                                                                        <div className='col-6'>
                                                                            <Select1
                                                                                name="seguro"
                                                                                estado={idSeguro}
                                                                                cambiarEstado={setIdseguro}
                                                                                ExpresionRegular={INPUT.ID}
                                                                                lista={seguros}
                                                                                etiqueta='SEGURO'
                                                                            />
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <ComponenteInputUserDisabled
                                                                                estado={nhc}
                                                                                cambiarEstado={setNhc}
                                                                                name="nhc"
                                                                                ExpresionRegular={INPUT.NHC}  //expresion regular
                                                                                etiqueta='N.H.C.'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            examenesSeleccionadosMostrar.length > 0 &&
                                                            <div className='showExamen'>
                                                                {examenesSeleccionadosMostrar.map((x) => (
                                                                    <small key={x.nombre}>{'-' + x.nombre + '-'}</small>
                                                                ))
                                                                }
                                                            </div>
                                                        }
                                                        {solicitud.length > 0 &&
                                                            <Button color='success' className=' modificarSeleccion' onClick={() => mostrarListaExamenes()}>actualizar lista</Button>
                                                        }
                                                        {
                                                            formulario === true && solicitud.length === 0 &&
                                                            <>
                                                                <div className=" col-12 " >
                                                                    <SelectRow
                                                                        estado={idServicio}
                                                                        cambiarEstado={setIdServicio}
                                                                        name="nombre"
                                                                        ExpresionRegular={INPUT.ID}  //expresion regular
                                                                        lista={servicio}
                                                                        funcion={listarExamenes}
                                                                        etiqueta='Servicio'
                                                                    />
                                                                </div>



                                                                {examen.map((x) => (
                                                                    <div key={x.servicioSolicitado} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                                        {
                                                                            <ComponenteCheck
                                                                                id={x.idItemServicio}
                                                                                item={x.servicioSolicitado}
                                                                                admitidos={examenesSeleccionados}
                                                                                funcion={asignarExamenesSeleccionados}

                                                                            />
                                                                        }
                                                                    </div>
                                                                ))}</>
                                                        }
                                                        {
                                                            formulario === true && solicitud.length > 0 && verListaExamen === true &&
                                                            <>
                                                                <div className=" col-12 " >
                                                                    <SelectRow
                                                                        estado={idServicio}
                                                                        cambiarEstado={setIdServicio}
                                                                        name="nombre"
                                                                        ExpresionRegular={INPUT.ID}  //expresion regular
                                                                        lista={servicio}
                                                                        funcion={listarExamenes}
                                                                        etiqueta='Servicio'
                                                                    />
                                                                </div>



                                                                {examen.map((x) => (
                                                                    <div key={x.servicioSolicitado} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                                                        {
                                                                            <ComponenteCheck
                                                                                id={x.idItemServicio}
                                                                                item={x.servicioSolicitado}
                                                                                admitidos={examenesSeleccionados}
                                                                                funcion={asignarExamenesSeleccionados}

                                                                            />
                                                                        }
                                                                    </div>
                                                                ))}</>
                                                        }

                                                    </div>

                                                    <div className='col-1'>
                                                        <div className='row contendorButton'>
                                                            {
                                                                solicitud.length > 0 &&
                                                                <Button color="danger" className='mt-3 cancelar' onClick={() => abandonarFormularioEditar()}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                            }

                                                            {
                                                                solicitud.length === 0 &&
                                                                <Button color="danger" className='mt-3 cancelar' onClick={() => abandonarFormularioInsertar()}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                            }


                                                            {
                                                                solicitud.length === 0 &&
                                                                <>
                                                                    <Button color="success" className='mt-3 guardar' onClick={() => registrar()}><FontAwesomeIcon icon={faSave} /> </Button>
                                                                    <Button className='mt-3 eliminar' onClick={() => vaciarFormulario()}><FontAwesomeIcon icon={faRecycle} /> </Button>
                                                                </>

                                                            }
                                                            {solicitud.length > 0 &&
                                                                <Button className='mt-3 actualizar' onClick={() => actualizar()}><FontAwesomeIcon icon={faEdit} /> </Button>
                                                            }

                                                        </div>
                                                    </div>
                                                </div >
                                            </div>

                                        }
                                        {
                                            lista === true &&
                                            <div className='row'>
                                                <div className=' col-10 card '>
                                                   
                                                    <div className="row mt-2 mb-2">
                                                        <div className='col-5 '>
                                                            <Button className=' btnNuevo' onClick={() => nuevaSolicitud()}>Nuevo </Button>
                                                        </div>

                                                        <div className='col-7'>

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
                                                    <div className="card-body table table-responsive custom" style={{ marginBottom: "0px", padding: '0px' }}>

                                                        <Table id="example12" className=" table table-sm">
                                                            {/* <Table id="example12" className=" table table-bordered table-sm"> */}
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
                                                                    <tr key={c.id} >
                                                                        <td className="col-1  text-center">{c.cantidad}</td>
                                                                        <td className="col-2  text-center">{c.fecha}</td>
                                                                        <td className="col-1  text-center">{c.ci}</td>
                                                                        <td className="col-2 ">{c.paciente}</td>
                                                                        <td className="col-2 ">{c.diagnostico}</td>

                                                                        {c.estado === 1 ? <td className="col-1 listEstado  text-center " style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado text-center " ><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.recibidoLab === 1 ? <td className="col-1 listEstado  text-center" style={{ color: "#198754" }} ><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 listEstado  text-center"><FontAwesomeIcon icon={faTimes} /> </td>}

                                                                        {c.publisher === 1 ? <td className="col-1 text-center listEstado" style={{ color: "#198754" }}><FontAwesomeIcon icon={faCheck} /> </td> :
                                                                            <td className="col-1 text-center listEstado"><FontAwesomeIcon icon={faTimes} /> </td>}


                                                                        <td className="col-1  text-center">{c.nhc}</td>
                                                                        <td className="col-1  text-center"> <p className='btnverSolicitud' onClick={() => verSolicitud(c.codigoSol)}><FontAwesomeIcon icon={faAngleRight} /> </p></td>
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
                                                            {/* <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>Siguiente</Link></li>

                                                            <li className="page-item"><Link className="page-link" to="#" onClick={() => siguiente()}>&raquo;</Link></li> */}
                                                        </ul>
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
                                                        <Button className=' success' onClick={() => buscarPorFecha()}>Buscar</Button>
                                                    </div>
                                                    <div className='botonOrganizar'>
                                                        <label>ORGANIZAR POR FASE</label>
                                                        <Button className=' danger' onClick={() => preanalitico()}>Preanalitico</Button>
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

                                                                        <label key={item.servicioSolicitado}>  {item.servicioSolicitado} </label >
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
                                                        <Button color="danger" className='mt-3 cancelar' onClick={() => abandonarVentanaVer()}><FontAwesomeIcon icon={faAngleLeft} /> </Button>
                                                        {
                                                            solicitud[0].estado === 0 &&
                                                            <>
                                                                <Button className='mt-3 actualizar' onClick={() => actualizarSolicitud()}><FontAwesomeIcon icon={faEdit} /> </Button>
                                                                <Button className='mt-3 eliminar' onClick={() => eliminarSolicitud()}><FontAwesomeIcon icon={faTrashAlt} /> </Button>
                                                            </>
                                                        }
                                                        {
                                                            solicitud[0].publisher === 1 &&
                                                            <>
                                                                <div className='btnMovil'>
                                                                    {/* <h4>DISPOSITIVO MOVIL</h4> */}
                                                                    <Button className='mt-3 inf' onClick={() => generarInforme()}><FontAwesomeIcon icon={faNotesMedical} /> </Button>

                                                                </div>
                                                                <div >
                                                                    <Button className='mt-3 inf ml-0' onClick={() => generarInforme(true)}><FontAwesomeIcon icon={faDownload} /> </Button>

                                                                    {
                                                                        informe.length > 0 &&
                                                                        <PDFDownloadLink
                                                                            document={<GenerarPdf informe={informe} />}
                                                                            fileName={informe[0].paciente + '.pdf'}
                                                                        >
                                                                            <Button className='mt-3 inf ml-0' id='descargarDocu' style={{ display: 'none' }}><FontAwesomeIcon icon={faDownload} /> </Button>
                                                                        </PDFDownloadLink>
                                                                    }
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        }
                                        {
                                            pdf &&
                                            <PDFViewer style={{ width: '90%', height: '90vh' }}>
                                                <GenerarPdf
                                                    informe={informe}
                                                />
                                            </PDFViewer>
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
export default RegistrarSolicitud;
