import { Router } from "express"
import { Rol } from "../../modelo/administrador/rol.js"
import { insertar, eliminar, buscar, editarNombre, editarNumero } from '../../validacion/administrador/rol.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const rol = new Rol()

rutas.get("/all", async (req, res) => {
    try {
        const resultado = await rol.listar()
        return res.status(200).json(resultado)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

rutas.get("/buscar", buscar, async (req, res) => {
    const dato = req.body.dato
    try {
        const resultado = await rol.buscar(dato)
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

    const { nombre,numero, creado, usuario } = req.body
    const datos = {
        nombre,
        numero,
        creado,
        usuario
    }
    try {

        const resultado = await rol.insertar(datos)
        if(resultado.existe===1){
            return res.status(403).json({msg:'ya existe el numero de rol'})
        }
        if(resultado.existe===2){
            return res.status(403).json({msg:'ya existe el rol'})
        }
        return res.status(200).json({msg:'OPERACION EXITOSA'})

    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
})

rutas.put("/editar", editarNombre, async (req, res) => {

    const { id,nombre, numero, modificado, usuario } = req.body
    const datos = {
        id,
        nombre,
        numero,
        modificado,
        usuario
    }
    try {
        const resultado = await rol.editar(datos)
        if(resultado.existe === 1)
            return res.status(403).json({ msg:'YA EXISTE EL NUMERO DEL ROL'})
        if(resultado.existe ===2){
            return res.status(403).json({msg:'YA EXITE ESTE ROL'})
        }
        return res.status(200).json({msg:"OPERACION EXITOSA"})
    
    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
})

rutas.delete("/borrar", eliminar, async (req, res) => {
    try {
        const id = req.body.id;
        const resultado = await rol.borrar(id)
        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "ROL NO EXISTENTE" });
        return res.status(200).json({ msg: "OPERACION EXITOSA" })
    } catch (error) {
        return res.status(500).send(error)
    }
})


export default rutas;