import { Router } from "express"
import { Servicio } from "../../modelo/administrador/servicio.js"
import { insertar, editar, eliminar, buscar } from '../../validacion/administrador/servicio.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const servicio = new Servicio()

rutas.get("/all", async (req, res) => {
    try {
        const resultado = await servicio.listar()
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }

})

rutas.get("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await servicio.buscar(dato)
        if (resultado.length > 0) {
            return res.status(200).send(resultado)
        }
        else {
            return res.status(404).json({ msg: 'el servicio no existe' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

rutas.post("/insertar", insertar, async (req, res) => {

    const { idArea, nombre, creado, usuario } = req.body
    const datos = {
        idArea,
        nombre,
        creado,
        usuario
    }
    try {

        const resultado = await servicio.insertar(datos)
        if (resultado.existe === 1) {
            return res.status(403).json({ msg: 'ya existe el registro' })
        }
        return res.status(200).json({ msg: 'OPERACION EXITOSA' })

    } catch (error) {

        // console.log(error)
        return res.status(500).send(error)
    }
})

rutas.put("/editar", editar, async (req, res) => {

    const { id, idArea, nombre, modificado, usuario } = req.body
    const datos = {
        id,
        idArea,
        nombre,
        modificado,
        usuario
    }
    try {
        const resultado = await servicio.editar(datos)
        if (resultado.existe === 0)
            return res.status(404).json({ msg: 'El area no existe' })
        if (resultado.existe === 1) {
            return res.status(403).json({ msg: 'ya existe el registro' })
        }
        return res.status(200).json({ msg: "OPERACION EXITOSA" })

    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
})


rutas.delete("/borrar", eliminar, async (req, res) => {
    try {
        const id = req.body.id;
        const resultado = await servicio.borrar(id)
        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "EL SERVICIO NO EXISTE" });
        return res.status(200).json({ msg: "OPERACION EXITOSA" })
    } catch (error) {
        return res.status(500).send(error)
    }

})


export default rutas;