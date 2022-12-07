import express from "express";
import pool from '../modelo/bdConfig.js'
import { KEY } from '../config.js'

import jwt from 'jsonwebtoken'
// Admiministrador
import hospital from "../controlador/hospital.js";
import seguro from "../controlador/seguro.js";
import hospitalseguro from '../controlador/hospitalSeguro.js'
import area from "../controlador/area.js";
import servicio from "../controlador/servicio.js";
import itemServicio from "../controlador/itemServicio.js";
import usuario from "../controlador/usuario.js";
//funciones disponibles para el administrador, solicitante y hasta para el laboratorista
import paciente from '../controlador/paciente.js'
import solicitud from '../controlador/solicitud.js'
import intervalo from '../controlador/intervalo.js'

// archivos publicos
import rutasPublicas from "../controlador/Public/public.js";

const rutas = express();

// +*********************************************************** login****************************************

// ruta de autentidicacion
rutas.get('/', async (req, res) => {
    // console.log("datos de la consulta: ", req.query)

    try {
        const sql = ` SELECT id, nombre, apellidoPaterno, apellidoMaterno, username
        from usuario 
        WHERE username = ${pool.escape(req.query.user)} and pass = ${pool.escape(req.query.pass)} and validar = 1`;

        const [result] = await pool.query(sql)

        console.log("datos de la consulta: ", result)

        if (result.length === 1) {
            var d = new Date();
            let fecha = d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
            const payload = {
                "usuario": result[0].username,
                "ap1": result[0].apellidoPaterno,
                "ap2": result[0].apellidoMaterno,
                "name": result[0].nombre,
                'fecha': fecha
            }
            const token = jwt.sign(payload, KEY, {
                expiresIn: "1d"
            })

            const idUsuario = result[0].id

            const datos = {
                idUsuario,
                fecha,
                token
            }

            const [sesion] = await pool.query(`INSERT INTO sessiones SET ?`, datos)
            // console.log('dentro del bloque', sesion)

            if (sesion.insertId > 0) {
                // console.log('dentro del bloquesss', sesion)

                const sqlInfo = `SELECT UPPER(r.nombre) as rol, r.numero as numRol,
                    u.username, concat(UPPER(left(u.nombre,1)),LOWER(SUBSTRING(u.nombre,2))) as nombre, 
                    concat(UPPER(left(u.apellidoPaterno,1)),LOWER(SUBSTRING(u.apellidoMaterno,2))) as apellido, 
                    UPPER(s.nombre) AS servicio
                    from usuario u
                    inner join servicio s on u.idServicio = s.id
                    inner join rol r on u.idRol = r.id
                    where u.username = ${pool.escape(req.query.user)} and u.pass = ${pool.escape(req.query.pass)}`;
                const [info] = await pool.query(sqlInfo)
                // console.log("datos de la consulta: ", info[0])

                return res.json({
                    'token': token,
                    'username': info[0].username,
                    'nombre': info[0].nombre,
                    'apellido': info[0].apellido,
                    'servicio': info[0].servicio,
                    'rol': info[0].rol,
                    'numRol': info[0].numRol
                })
            }
            else {
                return res.json({ msg: 'ERROR' })
            }
        }
        else {
            res.json({ msg: 'DATOS INCORRECTOS' })
        }
    } catch (error) {
        console.log("error en la ejeccion: ", error)
    }
})

rutas.post('/logout', (req, res) => {
    pool.query('DELETE FROM sessiones where token = ? ', [req.body.token])
})




//VERIFICACION DE LA SESION QUE ESTA ALMACENADA EN LA BD
const verificacion = express();


verificacion.use((req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearetoken = bearerHeader.split(" ")[1];
        // console.log('pasa la primera condicional, se ha obtenido los encabezados', bearetoken )

        jwt.verify(bearetoken, KEY, async (errtoken, authData) => {
            if (errtoken) {
                // console.log('error en la verificacion token alterado: ', bearetoken)
                pool.query('delete from sessiones where token = ?', [bearetoken])
                return res.json({ ok: false })
            }

            // console.log('pasa la verificacion del token', bearetoken)
            const sql = `SELECT u.id, r.numero, se.id as idServicio from sessiones s 
            inner join usuario u on s.idUsuario = u.id
            inner join rol r on u.idRol = r.id
            inner join servicio se on se.id = u.idServicio
            where s.token  = ${pool.escape(bearetoken)} and u.validar = true`;
            const [result] = await pool.query(sql)
            if (result.length > 0) {
                req.body.usuario = await result[0].id
                req.body.rol = await result[0].numero
                req.body.idServicio1 = await result[0].idServicio
                next()
            }
            else {
                return res.json({ ok: false })
            }
        })

    }
    else {
        return res.json({ ok: false, msg: 'datos del client' })
    }
})

const roles = (req, res, next) => {
    console.log('cuerpo de req', req.body)
    if (req.body.rol == 2)
        next()
    return
}
rutas.post('/verificar', verificacion)




// **********************************************************************************************************
// RUTAS DE LA APLICACION
// ******************************************************** BLOQUE ADMINISTRADOR***************************
rutas.use('/public', rutasPublicas)



rutas.use("/laboratorio", verificacion, hospital)
rutas.use("/seguro", verificacion, seguro)
rutas.use('/hospitalseguro', hospitalseguro)
rutas.use("/area", verificacion, area)
rutas.use("/servicio", verificacion, servicio)
rutas.use("/itemservicio", verificacion, itemServicio)
rutas.use("/usuario", verificacion, usuario)

// ****************************************************TODOS ADMIN, SOL, LAB**********************************
rutas.use("/paciente", verificacion, paciente)
rutas.use("/solicitud", verificacion, solicitud)
rutas.use("/intervalo", verificacion, intervalo)



export default rutas;