import { Router } from "express"
import { HospitalSeguro } from "../../modelo/administrador/hospitalSeguro.js"
import { insertar, editar, eliminar, buscar } from '../../validacion/administrador/hospitalSeguro.js'


const rutas = Router()
const hospitalSeguro = new HospitalSeguro()

rutas.get("/all", async (req, res) => {
    try {
        const resultado = await hospitalSeguro.listar()
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.get("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await hospitalSeguro.buscar(dato)
        if (resultado.length > 0) {
            return res.status(200).send(resultado)
        }
        else {
            return res.status(404).json({ msg: 'el hospital no existe' })
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }

})

rutas.post("/insertar", insertar, async (req, res) => {

    const { idSeguro, idHospital, creado, usuario } = req.body
    const datos = {
        idSeguro,
        idHospital,
        creado,
        usuario
    }
    try {

        const resultado = await hospitalSeguro.insertar(datos)

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

    const { id, idSeguro, idHospital, modificado, usuario } = req.body
    const datos = {
        id,
        idSeguro,
        idHospital,
        modificado,
        usuario
    }
    try {
        const resultado = await hospitalSeguro.editar(datos)
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
        const resultado = await hospitalSeguro.borrar(id)
        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "LA ASIGNACION NO EXISTE" });
        return res.status(200).json({ msg: "OPERACION EXITOSA" })
    } catch (error) {
        return res.status(500).send(error)
    }
})

export default rutas;