import { Router } from "express"
import { Hospital } from "../../modelo/hospital.js"
import { Area } from '../../modelo/area.js'
import {Usuario} from '../../modelo/usuario.js'
import { insertar} from '../../validacion/usuario.js'


//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const hospital = new Hospital()
const area = new Area()

const usuario = new Usuario()


rutas.get("/registrarme", insertar, async (req, res) => {

    // console.log('datos: ',req.query)
    const { username, pass, ci, nombre, apellidoPaterno,
        apellidoMaterno, telefono, direccion, creado } = req.query
    const datos = {
        username,
        pass,
        ci,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        direccion,
        creado,
    }
    try {
        const resultado = await usuario.insertar(datos)
        if (resultado.existe === 1) {
            return res.json({ msg: 'la persona ya esta registrado' })
        }
        if (resultado.existe === 2) {
            return res.json({ msg: 'El nombre de usuario ya esta registrado' })
        }
        return res.json({ ok: true })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})


















rutas.get("/hospital", async (req, res) => {

    try {
        const resultado = await hospital.listarParaRegistro()
        console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }

})

rutas.get("/areas", async (req, res) => {
    try {
        const resultado = await area.listarPublico()
        return res.json(resultado)
    } catch (error) {
        return res.status(500).send(error)
    }

})



export default rutas;