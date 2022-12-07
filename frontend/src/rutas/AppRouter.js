import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Check from './check';
import Formulario from '../login/login'
// import Registro from '../login/registro'
import React from 'react';

import PublicRoute from './publicRoute';

// import Nav from '../componentes/home';
import Usuario from '../componentes/usuario';
import Servicios from '../componentes/servicios';
import ItemServicio from '../componentes/itemServicio';
import Laboratorio from '../componentes/laboratorio';
import Paciente from '../componentes/paciente';

import AtorizarSolicitud from '../componentes/autorizarSolicitud';
import RegistrarSolicitud from '../componentes/registrarSolicitud';
import Resultado from '../componentes/resultados';

import Registrame from '../componentes/registrarme'

import Informaciones from '../componentes/informacion'

import E500 from './e500'
// import FormularioL from '../componentes/solicitud/formulario';



export default function AppRouter() {

  return (

    <BrowserRouter>
      <div>
        {/* <Nav /> */}

        <Switch>
          <PublicRoute exact path="/" component={Formulario} />
          <PublicRoute exact path="/registrame" component={Registrame} />


              <Check exact path='/autorizarsolicitud' component={AtorizarSolicitud} />
              <Check exact path='/usuarios' component={Usuario} />
              <Check exact path='/servicio' component={Servicios} />
              <Check exact path='/laboratorio' component={Laboratorio} />
              <Check exact path='/informacion' component={Informaciones} />



              <Check exact path='/registrarsolicitud' component={RegistrarSolicitud} />
              <Check exact path='/paciente' component={Paciente} />

              <Check exact path='/resultados' component={Resultado} />
              <Check exact path='/itemservicio' component={ItemServicio} />


          <Route exact path="*" component={E500} />

        </Switch>
      </div>
    </BrowserRouter>

  )
}

