import {  useState } from "react";
import useAuth from "../Auth/useAuth";
import md5 from 'md5'
import { Link } from "react-router-dom";
import React from 'react';

import { InputUsuario } from '../componentes/elementos/input';


import { http } from "./http";

const Formulario = () => {

  const [usuario, setUsuario] = useState({ campo: '', valido: null })
  const [password, setPassword] = useState({ campo: '', valido: null })
  const [mensaje, setMensaje] = useState('')

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,30}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const auth = useAuth()

  const iniciarSesion = async (e) => {


    if ((usuario.valido === 'true' && password.valido === 'true')) {
      const pass = md5(password.campo)
      const user = usuario.campo;


      e.preventDefault()  //para que la pagina no se recargue

      try {
        await http(user, pass).then(json => {

          if (json.data.token != null) {
            localStorage.setItem('tiempo', new Date().getMinutes())
            const token = json.data.token
            localStorage.setItem("token", token)
            localStorage.setItem('username', json.data.username)
            localStorage.setItem('nombre', json.data.nombre)
            localStorage.setItem('apellido', json.data.apellido)
            localStorage.setItem('servicio', json.data.servicio)
            localStorage.setItem('rol', json.data.rol)
            localStorage.setItem('numRol', json.data.numRol)
            auth.login('ok')

          } else {
            alert("Datos incorrectos !!!") 
          }
        })
      } catch (error) {
        setMensaje('ERROR, INTENETE MAS TARDE')
      }
    } else {
      setMensaje('INTRODUZCA SUS DATOS')
    }
  }

  return (
    <>
      <div className="hold-transition login-page mt-0">
        <div className="row  ">
          <div className="col-1 col-sm-2 col-md-3 col-lg-4 "></div>
          <div className="col-11">
            <div className="login-box mt-0">
              <div className="card card-outline card-primary mt-0">
                <div className="card-header text-center">
                  <h4 className="login-box-msg"> <p> LABORATORIOS </p></h4>
                  {mensaje !== '' && <p className='text-danger' onClick={() => setMensaje('')}>{mensaje}</p>}
                </div>
                <div className=" card-body">
                  <p className="login-box-msg">inicie session</p>
                  <form >
                    <div className="mb-3">
                      <InputUsuario
                        estado={usuario}
                        cambiarEstado={setUsuario}
                        tipo="text"
                        name="user"
                        placeholder="Usuario"
                        ExpresionRegular={expresiones.usuario}
                        span="fas fa-envelope"
                      />
                    </div>
                    <div>
                      <InputUsuario
                        estado={password}
                        cambiarEstado={setPassword}
                        tipo="password"
                        name="pass"
                        placeholder="Contraseña"
                        ExpresionRegular={expresiones.password}
                        span="fas fa-lock"
                      />
                    </div>
                    <div className="row pt-3">
                      <div className=" col-lg-6">
                      </div>
                      <div className=" row pl-4 pr-0 col-12 col-lg-12 ">
                        <Link
                        to={'#'}
                          onClick={iniciarSesion}
                          className="btn btn-primary btn-block float-rigth"
                        >Ingresar
                        </Link>

                      </div>
                    </div>
                  </form>


                  <div className="card-header"></div>
                  <p className="text-left">
                    <Link to="#">olvidó su contraseña ?</Link>
                  </p>
                  <br></br>
   
                  <p className="text-left">
                    <Link to="/registrame" className="text-center">Solicite su cuenta ahora! </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Formulario;
