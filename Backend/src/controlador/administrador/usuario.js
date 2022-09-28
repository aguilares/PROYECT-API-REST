import { Router } from "express"
import { Usuario } from "../../modelo/administrador/usuario.js"
import { insertar, editar, eliminar, buscar } from '../../validacion/administrador/usuario.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const usuarios = new Usuario()

rutas.get("/all", async (req, res) => {
    try {
        const resultado = await usuarios.listar()
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }

})

rutas.get("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await usuarios.buscar(dato)
        if (resultado.length > 0) {
            return res.status(200).send(resultado)
        }
        else {
            return res.status(404).json({ msg: 'el hospital no existe' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

rutas.post("/insertar", insertar, async (req, res) => {

    const { idServicio, idRol, username, pass, nombre, apellidoPaterno,
        apellidoMaterno, telefono, direccion, creado, usuario } = req.body
    const datos = {
        idServicio,
        idRol,
        username,
        pass,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        direccion,
        creado,
        usuario
    }
    try {
        const resultado = await usuarios.insertar(datos)
        if (resultado.existe === 1) {
            return res.status(403).json({ msg: 'ya existe el registro' })
        }
        if(resultado.existe ===2){
            return res.status(403).json({ msg: 'El nombre de usuario ya esta registrado' })
        }
        return res.status(200).json({ msg: 'OPERACION EXITOSA' })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

rutas.put("/editar", editar, async (req, res) => {

    const { id, idServicio, idRol,pass, nombre, apellidoPaterno, apellidoMaterno, telefono, direccion, modificado, usuario } = req.body
    const datos = {
        id,
        idServicio,
        idRol,
        pass,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        direccion,
        modificado,
        usuario
    }
    try {
        const resultado = await usuarios.editar(datos)
        if (resultado.existe === 0)
            return res.status(404).json({ msg: 'El area no existe' })
        if (resultado.existe === 1) {
            return res.status(403).json({ msg: 'ya existe el registro' })
        }
        if(resultado.affectedRows === 0){
            return res.status(500).send(error)
        }
        else{
            return res.status(200).json({ msg: "OPERACION EXITOSA" })
        }

    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
})


rutas.delete("/borrar", eliminar, async (req, res) => {
    try {
        const id = req.body.id;
        const resultado = await usuarios.borrar(id)
        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "EL HOSPITAL NO EXISTE" });
        return res.status(200).json({ msg: "OPERACION EXITOSA" })
    } catch (error) {
        return res.status(500).send(error)
    }

})


export default rutas;