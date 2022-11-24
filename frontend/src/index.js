import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'


// este archivo inicializa la pagina

ReactDOM.render( //rendizamos la aplicacion en pantalla
  // <React.StrictMode>
  <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <App />
    </MuiPickersUtilsProvider>
  </div>,
  // </React.StrictMode>, 
  document.getElementById('root') //se pone la pagina en la aplicacion react
);