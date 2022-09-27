import { Router } from "express"
import { Hospital } from "../../modelo/administrador/hospital.js"
import { insertar, editar, eliminar, buscar } from '../../validacion/administrador/hospital.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const hospital = new Hospital()

rutas.get("/all", async (req, res) => {
    try {
        const resultado = await hospital.listar()
        res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }

})

rutas.get("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await hospital.buscar(dato)
        if (resultado.length > 0) {
            return res.send(resultado)
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

    const { red, nombre, telefono, direccion } = req.body
    const datos = {
        red,
        nombre,
        telefono,
        direccion
    }
    try {

        const resultado = await hospital.insertar(datos)
        return res.send(resultado)

    } catch (error) {

        console.log(error)
        return res.status(500).send(error)
    }
})

rutas.put("/editar", editar, async (req, res) => {

    const { id, red, nombre, telefono, direccion } = req.body
    const datos = {
        id,
        red,
        nombre,
        telefono,
        direccion
    }
    try {
        const resultado = await hospital.editar(datos)
        if(resultado.affectedRows === 0)
            return res.status(404).json({msg:'El hospital no existe'})
        return res.send(resultado)
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})


rutas.delete("/borrar", eliminar, async (req, res) => {
    try {
        const id = req.body.id;
        const resultado = await hospital.borrar(id)
        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "EL HOSPITAL NO EXISTE" });
        return res.json({ msg: "OPERACION EXITOSA" })
    } catch (error) {
        return res.status(500).send(error)
    }

})


export default rutas;