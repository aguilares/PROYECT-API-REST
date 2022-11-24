import { Router } from "express"
import { Usuario } from "../modelo/usuario.js"
import { eliminar, buscar, actualizarRolesServicios, siguiente ,validar} from '../validacion/usuario.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const usuarios = new Usuario() 

rutas.post("/nuevos", async (req, res) => {
    try {
        const resultado = await usuarios.nuevos()
        return res.json(resultado)
    } catch (error) {   
        return res.status(500).send(error)
    }
})

rutas.post("/siguientenuevosusuarios'",siguiente, async (req, res) => {

    let id = req.body.id
    try {
        const resultado = await usuarios.listarSiguienteNuevos(id)
        if(resultado.length>0)
            return res.json(resultado)
        else
            return res.json({stop:true})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})


rutas.post("/all", async (req, res) => {
    try {
        const resultado = await usuarios.listar()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/siguiente",siguiente, async (req, res) => {
// console.log('jola')
    let id = req.body.id
    try {
        const resultado = await usuarios.listarSiguiente(id)
        if(resultado.length>0)
            return res.json(resultado)
        else
            return res.json({stop:true})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})




rutas.post("/rol", async (req, res) => {
    try {
        const resultado = await usuarios.listarRol()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/ver", async (req, res) => {
    try {
        const id = req.body.id
        const resultado = await usuarios.ver(id)
        return res.json(resultado)
    } catch (error) {
        return res.send(error)
    }
})

rutas.post("/buscar", buscar, async (req, res) => {
    // console.log(req.body)
    const dato = req.body.dato
    try {
        const resultado = await usuarios.buscar(dato)
        return res.send(resultado)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})


rutas.post("/actualizar", actualizarRolesServicios, async (req, res) => {

    // console.log(req.body)
    const { id, idServicios, idRol, modificado, usuario } = req.body
    const datos = {
        id,
        idServicios,
        idRol,
        modificado,
        usuario
    }
    try {
        const resultado = await usuarios.actualizarRolServicios(datos)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})


rutas.post("/validar", validar, async (req, res) => {
    // console.log(req.body)
    try {
        const { id,idServicios,idRol, modificado, usuario } = req.body;
        const datos = {
            id, idServicios, idRol, modificado, usuario
        }
        const resultado = await usuarios.validar(datos)
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        return res.status(500)
    }

})

rutas.post("/eliminar", eliminar, async (req, res) => {
    console.log(req.body)

    try {
        const id = req.body.id;
        const resultado = await usuarios.eliminar(id)
        return res.json(resultado)
    } catch (error) {
        return res.status(500)
    }

})
rutas.post("/eliminarNuevo", eliminar, async (req, res) => {
    console.log(req.body)

    try {
        const id = req.body.id;
        const resultado = await usuarios.eliminarNuevos(id)
        return res.json(resultado)
    } catch (error) {
        return res.status(500)
    }

})


export default rutas;