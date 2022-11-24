
import abandono from "../Auth/varEntorno"


// este algoritmo permite, identificar si el usuario a abandonado la pagina con la sesion abierta
//esto por temas de seguridad, una vez rebasado el tiempo de espera estableciado en unidades de tiempo (min), se redirccionara de manera automática 
// al login. 

const Inactivo = (auth) => {

    const tiempo1 = localStorage.getItem('tiempo')
    if (!tiempo1 || localStorage.getItem('token') == null){auth.logout()} // sino existe el cookie redireccionamos a la ventana login
    const tiempo2 = new Date().getMinutes()
    let dif = 0
    let aux1 = 0
    let aux2 = 0
    const maximo = 59
    const inicio = 0
    if ( tiempo1 === tiempo2) {
        dif = 0
    }
    if (tiempo2 > tiempo1) {
        dif = tiempo2 - tiempo1
    } if (tiempo1 > tiempo2) {
        aux1 = maximo - tiempo1  //  59 - 50 = 10
        aux2 = tiempo2 - inicio  //  5 - 0  = 5
        dif = aux2 - aux1
    }
    if (dif >= abandono.abandono) {  // el tiempo de abandono tolerado, se define en el archivo varEntorno en unidades de tiempo MINUTOS
        auth.logout()
    }
}



export default Inactivo;
