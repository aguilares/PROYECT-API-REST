import { Router } from "express"

//const modelo from "../modelo/usuario.js"
const rutas = Router()

rutas.get("/all")
rutas.post("/insertar")
rutas.put("/editar")
rutas.delete("/eliminar")

export default usuario;