import { useState, useEffect } from "react";
import axios from 'axios'
import { URL, INPUT } from '../Auth/config'
import { InputUsuario, InputUsuarioRegistro } from '../componentes/elementos/input';  // componente input que incluye algunas de las funcionalidades como, setInput, validaciones cambio de estados



function Registro() {
    const [red, setRed] = useState('')
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [area, setArea] = useState([])


    const [username, setUsername] = useState({ campo: '', valido: null })
    const [password, setPassword] = useState({ campo: '', valido: null })
    const [ci, setCi] = useState({ campo: '', valido: null })
    const [nombreU, setNombreU] = useState({ campo: '', valido: null })
    const [apellidoPat, setApellidoPat] = useState({ campo: '', valido: null })
    const [apellidoMat, setApellidoMat] = useState({ campo: '', valido: null })
    // const [validoFecha, setfechaValido] = useState(null) new Date().toString()
    const [telef, setTelef] = useState({ campo: '', valido: null })
    const [direccionU, setDireccionU] = useState({ campo: '', valido: null })

    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        cargarDatos()
        cargarAreas()
    }, [])

    const cargarAreas = async () => {
        await axios.get(URL + '/public/areas').then(json => {
            setArea(json.data)

        })
    }

    const cargarDatos = async () => {
        await axios.get(URL + '/public/hospital').then(json => {
            setRed(json.data[0].red)
            setNombre(json.data[0].nombre)
            setTelefono(json.data[0].telefono)
            setDireccion(json.data[0].direccion)

        })
    }

    const guardar = async () => {
        if (username.valido == 'true' && password.valido == 'true' && ci.valido == 'true' && nombreU.valido == 'true' && apellidoPat.valido == 'true'
            && apellidoMat.valido == 'true' && telef.valido == 'true' && direccionU.valido == 'true') {

            axios.get(URL + '/public/usuarioExiste', { params: { username: username.campo } }).then(
                json => {
                    if (json.data.existe == false) {
                        axios.get(URL + '/public/ciExiste', { params: { ci: ci.campo } }).then(cis => {
                            if (cis.data.existe == false) {
                                const ok = window.confirm('SU NOMBRE DE USUARIO ES: ' + username.campo + ' Y SU CONTRASEÑA ES: ' + password.campo
                                    + 'TOMAR EN CUENTA ESTOS DATOS')
                                if (ok == true) {
                                    axios.post(URL + '/public/registrarme', {
                                        username: username.campo,
                                        password: password.campo,
                                        ci: ci.campo,
                                        nombre: nombreU.campo,
                                        apellidoPaterno: apellidoPat.campo,
                                        apellidoMaterno: apellidoMat.campo,
                                        telefono: telef.campo,
                                        direccion: direccionU.campo
                                    }).then(res => {
                                        if (res.data.result == true) {
                                            setMensaje('OPERACION EXITOSA')
                                            setUsername(null)
                                            setPassword(null)
                                            setCi(null)
                                            setNombreU(null)
                                            setApellidoPat(null)
                                            setApellidoMat(null)
                                            setTelef(null)
                                            setDireccion(null)
                                        }
                                        else{
                                            setMensaje('VUELVA A INTENTARLO MAS TARDE')
                                        }
                                    })
                                }

                            } else {
                                setMensaje('LA PERSONA YA ESTA REGISTRADA')
                            }
                        })
                    } else {
                        setMensaje('EL NOMBRE DE USUARIO YA ESTA REGISTRADO')
                    }
                }
            )
        }

    }

    return (
        <>
            <div class="wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle"
                                                src="../../dist/img/sp.png"
                                                alt="User profile picture" />
                                        </div>

                                        <h3 className="profile-username text-center">{nombre}</h3>

                                        <p className="text-muted text-center">{red}</p>
                                    </div>
                                </div>

                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title text-center">SOBRE EL LABORATORIO</h3>
                                    </div>
                                    <div className="card-body">
                                        <strong><i className="fas fa-ambulance mr-1"></i> LABORATORIO</strong>

                                        <p className="text-muted">
                                            {nombre}
                                        </p>

                                        <hr />

                                        <strong><i className="fas fa-map-marker-alt mr-1"></i> {direccion}</strong>

                                        <p className="text-muted">Sucre Bolivia</p>

                                        <hr />

                                        <strong><i className="fas fa-phone mr-1"></i> {telefono}</strong>

                                        <p className="text-muted">TELEFONO FIJO</p>

                                        <hr />

                                        <strong><i className="fas fa-pencil-alt mr-1"></i> ESPECIALIDADES</strong>

                                        {
                                            area.map((a) => (
                                                <p className="text-muted">
                                                    <span className="tag tag-danger">{a.nombre}</span>
                                                </p>

                                            ))
                                        }

                                        <hr />

                                        <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>

                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 pt-5">
                                <div className="card ">
                                    <div className="card-header p-2">
                                        INTRODUZCA SUS DATOS
                                        {/* <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                                        </ul> */}
                                    </div>
                                    <div className="card-body ">
                                        <div className="tab-content">
                                            {/* <div className="tab-pane" id="settings"> */}
                                            <form className="form-horizontal">
                                                <div className="form-group row">
                                                    <label for="inputName" className="col-sm-2 col-form-label">Usuario</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuario
                                                            estado={username}
                                                            cambiarEstado={setUsername}
                                                            tipo={'text'}
                                                            name={'username'}
                                                            placeholder={'usuario'}
                                                            ExpresionRegular={INPUT.INPUT_USUARIO}
                                                            span={'fas fa-envelope'}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputEmail" className="col-sm-2 col-form-label">contraseña</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuario
                                                            estado={password}
                                                            cambiarEstado={setPassword}
                                                            tipo={'password'}
                                                            name={'password'}
                                                            placeholder={'contraseña'}
                                                            ExpresionRegular={INPUT.PASSWORD}
                                                            span={"fas fa-lock"}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">Cedula de Identidad</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={ci}
                                                            cambiarEstado={setCi}
                                                            name={'password'}
                                                            placeholder={'NOMBRE COMPLETO'}
                                                            ExpresionRegular={INPUT.CI}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">Nombre Completo</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={nombreU}
                                                            cambiarEstado={setNombreU}
                                                            name={'password'}
                                                            placeholder={'NOMBRE COMPLETO'}
                                                            ExpresionRegular={INPUT.NOMBRE_PERSONA}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">Apellido Paterno</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={apellidoPat}
                                                            cambiarEstado={setApellidoPat}
                                                            name={'apellidoPaterno'}
                                                            placeholder={'APELLIDO PARTERNO'}
                                                            ExpresionRegular={INPUT.NOMBRE_PERSONA}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">Apellido Materno</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={apellidoMat}
                                                            cambiarEstado={setApellidoMat}
                                                            name={'apelidoMat'}
                                                            placeholder={'APELLIDO MATERNO'}
                                                            ExpresionRegular={INPUT.NOMBRE_PERSONA}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">TELEF/Celular</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={telef}
                                                            cambiarEstado={setTelef}
                                                            name={'telef'}
                                                            placeholder={'TELEFONO/CELULAR'}
                                                            ExpresionRegular={INPUT.TELEFONO}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label for="inputName2" className="col-sm-2 col-form-label">Direccion</label>
                                                    <div className="col-sm-10">
                                                        <InputUsuarioRegistro
                                                            estado={direccionU}
                                                            cambiarEstado={setDireccionU}
                                                            name={'direccion'}
                                                            placeholder={'DIRECCION'}
                                                            ExpresionRegular={INPUT.DIRECCION}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="offset-sm-2 col-sm-10">
                                                        <button type="submit" className="btn btn-danger" onClick={guardar}>Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Registro;