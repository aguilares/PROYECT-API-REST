import { Router } from "express"
import { Hospital } from "../modelo/hospital.js"
import { insertar, editar } from '../validacion/hospital.js'
import multer from "multer"
import fs from 'fs'

import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const disktorage = multer.diskStorage({

    destination: path.join(__dirname, '../../imagenes'),
    filename: (req, file, cb) => {
        cb(null,  Date.now()+'-'+file.originalname)
    }
})
const fileUpload = multer({
    storage: disktorage
}).single('sello')


const rutas = Router()
const hospital = new Hospital()

rutas.post("/insertarImagen", fileUpload, async (req, res) => {
    const image = fs.readdirSync(path.join(__dirname, '../../imagenes'))

    return res.json(image)

})

rutas.post("/eliminarImagen", async (req, res) => {
    fs.unlinkSync(path.join(__dirname, '../../imagenes/'+req.body.imagen))
    const image = fs.readdirSync(path.join(__dirname, '../../imagenes'))
    return res.json(image)
})


rutas.post("/all", async (req, res) => {
    // console.log(req.body)
    try {

        const image = fs.readdirSync(path.join(__dirname, '../../imagenes'))
        // console.log(image)
        const resultado = await hospital.listar()
        return res.json({resultado:resultado, image:image})
    } catch (error) {
        return res.status(500).send(error)
    }

})


rutas.post("/insertar", insertar, async (req, res) => {

    const { red, nombre, telefono, direccion, creado, usuario } = req.body
    const datos = {
        red,
        nombre,
        telefono,
        direccion,
        creado,
        usuario
    }
    try {

        const resultado = await hospital.insertar(datos)
        if (resultado.existe === 1) {
            return res.json({ msg: 'ya existe el registro' })
        }
        return res.json({ ok: true })

    } catch (error) {
        return res.status(500).send(error)
    }
})

rutas.post("/actualizar", editar, async (req, res) => {

    const { id, red, nombre, telefono, direccion, modificado, usuario } = req.body
    const datos = {
        id,
        red,
        nombre,
        telefono,
        direccion,
        modificado,
        usuario
    }
    try {
        const resultado = await hospital.editar(datos)
        if (resultado.existe === 0)
            return res.json({ msg: 'NO EXSUTE EL AREA' })
        if (resultado.existe === 1) {
            return res.json({ msg: 'YA EXISTE EL REGISTRO' })
        }
        return res.json({ ok: true })


    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
})



export default rutas;