import Express from "express";

// Admiministrador
import hospital from "../controlador/administrador/hospital.js";
import seguro from "../controlador/administrador/seguro.js";
import hospitalseguro from '../controlador/administrador/hospitalSeguro.js'
import area from "../controlador/administrador/area.js";
import servicio from "../controlador/administrador/servicio.js";
import itemServicio from "../controlador/administrador/itemServicio.js";
import rol from '../controlador/administrador/rol.js'
import usuario from "../controlador/administrador/usuario.js"; 

const rutas = Express();

// +*********************************************************** login****************************************
rutas.get("/",(req,res)=>{
    res.send("HOLA QUE TAL")

})
// **********************************************************************************************************
                                    // RUTAS DE LA APLICACION
// ******************************************************** BLOQUE ADMINISTRADOR***************************
rutas.use("/hospital",hospital)
rutas.use("/seguro",seguro)
rutas.use('/hospitalseguro', hospitalseguro)
rutas.use("/area",area)
rutas.use("/servicio",servicio)
rutas.use("/itemservicio",itemServicio)
rutas.use("/rol",rol)
rutas.use("/usuario",usuario)

// **********************************************************************************************************


export default rutas;