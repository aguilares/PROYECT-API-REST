
import React from 'react';
import { ComponenteInputUser } from './elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados
import { useState } from "react";
import { URL, INPUT } from '../Auth/config';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import md5 from 'md5'



function Registrame() {
    const [username, setUsername] = useState({ campo: '', valido: null })
    const [password, setPassword] = useState({ campo: '', valido: null })
    const [ci, setCi] = useState({ campo: '', valido: null })
    const [nombre, setNombre] = useState({ campo: '', valido: null })
    const [apellidoPat, setApellidoPat] = useState({ campo: '', valido: null })
    const [apellidoMat, setApellidoMat] = useState({ campo: '', valido: null })
    const [telefono, setTelefono] = useState({ campo: '', valido: null })
    const [direccion, setDireccion] = useState({ campo: '', valido: null })
    const [mensaje, setMensaje] = useState(null)
    const [modalVer, setModalVer] = useState(false)

    const insertar = async () => {

        // console.log("datos usuario : ", nombre, apellidoPat, apellidoMat, telefono, direccion)

        if (username.valido === 'true' && password.valido === 'true' && ci.valido === 'true' && telefono.valido === 'true' &&
            nombre.valido === 'true' && apellidoPat.valido === 'true' && apellidoMat.valido === 'true' && direccion.valido === 'true') {
            let today = new Date()
            let fecha = today.toISOString().split('T')[0]
            const pas = md5(password.campo)
            axios.get(URL + '/public/registrarme', {params:{

                username: username.campo,
                pass: pas,
                ci: ci.campo,
                nombre: nombre.campo,
                apellidoPaterno: apellidoPat.campo,
                apellidoMaterno: apellidoMat.campo,
                telefono: telefono.campo,
                direccion: direccion.campo,
                creado: fecha + ' ' + new Date().toLocaleTimeString()
            }}).then(json => {
                if (json.data.msg != null)
                    setMensaje(json.data.msg)
                if(json.data.ok === true){
                    window.location.href = '/'
                }

            })
        } else {
            setMensaje('complete todos los campos')
        }
    }

    
    const ver = async () => {


        if (username.valido === 'true' && password.valido === 'true' && ci.valido === 'true' && telefono.valido === 'true' &&
            nombre.valido === 'true' && apellidoPat.valido === 'true' && apellidoMat.valido === 'true' && direccion.valido === 'true') {
            setModalVer(true)
        } else {
            setMensaje('complete todos los campos')
        }
    }



    return (
        <>
            <form  className='card' style={{ width: '500px', margin: 'auto', padding: '10px', marginTop: '30px'}}>
                <small className='text-center'>REGISTRARME</small>
                <div className="row">
                    <div className="col-6">
                        <ComponenteInputUser
                            estado={username}
                            cambiarEstado={setUsername}
                            name="username"
                            placeholder="Usuario"
                            ExpresionRegular={INPUT.INPUT_USUARIO}
                            etiqueta={'Usuario'}
                            campoUsuario={true}
                        />
                    </div>

                    <div className="col-6">
                        <ComponenteInputUser
                            estado={password}
                            cambiarEstado={setPassword}
                            name="apellidoPat"
                            placeholder="Contraseña"
                            ExpresionRegular={INPUT.PASSWORD}  //expresion regular
                            etiqueta='Contraseña'
                        />
                    </div>
                    <div className="col-6">
                        <ComponenteInputUser
                            estado={ci}
                            cambiarEstado={setCi}
                            name="ci"
                            placeholder="CEDULA DE IDENTIDAD"
                            ExpresionRegular={INPUT.CI}  //expresion regular
                            etiqueta='CI'
                        />
                    </div>
                    <div className="col-12">
                        <ComponenteInputUser
                            estado={nombre}
                            cambiarEstado={setNombre}
                            name="nombre"
                            placeholder="NOMBRE COMPLETO"
                            ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                            etiqueta='Nombre'
                        />
                    </div>
                    <div className="col-6">
                        <ComponenteInputUser
                            estado={apellidoPat}
                            cambiarEstado={setApellidoPat}
                            name="apellidoPat"
                            placeholder="Apellido Paterno"
                            ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                            etiqueta='Apellido Paterno'
                        />
                    </div>

                    <div className="col-6">
                        <ComponenteInputUser
                            estado={apellidoMat}
                            cambiarEstado={setApellidoMat}
                            name="apellidoMat"
                            placeholder="Apellido Materno"
                            ExpresionRegular={INPUT.NOMBRE_PERSONA}  //expresion regular
                            etiqueta='Apellido Materno'
                        />
                    </div>
                    <div className="col-6">
                        <ComponenteInputUser
                            estado={telefono}
                            cambiarEstado={setTelefono}
                            name="telefono"
                            placeholder="telefono"
                            ExpresionRegular={INPUT.TELEFONO}  //expresion regular
                            etiqueta='telefono/celular'
                        />
                    </div>
                    <div className="col-12">
                        <ComponenteInputUser
                            estado={direccion}
                            cambiarEstado={setDireccion}
                            name="direccion"
                            placeholder="direccion"
                            ExpresionRegular={INPUT.DIRECCION}  //expresion regular
                            etiqueta='Direccion'
                        />
                    </div>
                </div>
                <div>
                    <Button style={{ width: "100%" }} color='success' onClick={() => ver()}>Registrarme</Button>
                </div>
                <div style={{ color: 'red', margin: 'auto', marginTop: '15px' }}>
                    {mensaje}
                </div>
            </form>

            <Modal isOpen={modalVer}>
                <ModalHeader>
                    <label className='text-center'>MIS DATOS</label>
                </ModalHeader>
                <ModalBody>

                    <div className='row paginaversolicitud'>
                        <div className='col-12'>
                            <div className='col-12'>
                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label> Nombre: </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label>{nombre.campo + ' ' + apellidoPat.campo + ' ' + apellidoMat.campo} </label>
                                    </div>
                                </div>

                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label> C.I.:  </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label>{ci.campo}</label>
                                    </div>
                                </div>

                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label> USUARIO: </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label> {username.campo} </label>
                                    </div>
                                </div>
                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label>Contraseña:  </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label>  {password.campo}</label>
                                    </div>
                                </div>
                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label>Direccion:  </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label>  {direccion.campo}</label>
                                    </div>
                                </div>
                                <div className='row verSolicitud'>
                                    <div className='col-5 fontTitulo'>
                                        <label>telefono : </label>
                                    </div>
                                    <div className='col-7 fontContenido'>
                                        <label>  {telefono.campo}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalFooter>
                        <button className='btn btn-success' onClick={() => insertar()}>Registrarme</button>
                        <button className='btn btn-danger' onClick={() => setModalVer(false)} >corregir</button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </>


    );

}
export default Registrame;
