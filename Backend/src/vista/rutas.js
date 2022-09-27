import Express from "express";

// Admiministrador
import hospital from "../controlador/administrador/hospital.js";
import area from "../controlador/administrador/area.js";
import servicio from "../controlador/administrador/servicio.js";
import itemServicio from "../controlador/administrador/itemServicio.js";
import seguro from "../controlador/administrador/seguro.js";
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
rutas.use("/area",area)
rutas.use("/servicio",servicio)
rutas.use("/itemServicio",itemServicio)
rutas.use("/seguro",seguro)
rutas.use("/usuario",usuario)

// **********************************************************************************************************


export default rutas;