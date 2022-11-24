import { Router } from "express"
import { Solicitud } from "../modelo/solicitud.js"
import { sInsertar, sEditar, sEliminar, sBuscar, ver, autorizar, buscarFecha, informe, eliminarAdmin } from '../validacion/solicitud.js'

//const modelo from "../modelo/usuario.js"
// desde esta plantilla se importa las funcionalidades de los controladores de los modulos


const rutas = Router()
const solicitud = new Solicitud()


rutas.post("/listarS", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.listarS(req.body.usuario)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})



rutas.post("/countS", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.countS(req.body.usuario)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})



rutas.post("/buscarS", sBuscar, async (req, res) => {
    // console.log(req.body)
    const { dato, usuario } = req.body
    const dato1 = {
        dato,
        usuario
    }
    try {
        const resultado = await solicitud.buscarS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/buscarfechaS", buscarFecha, async (req, res) => {
    // console.log(req.body)
    const { fecha, usuario } = req.body
    const dato1 = {
        fecha,
        usuario
    }
    try {
        const resultado = await solicitud.buscarFechaS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/preanaliticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.preanaliticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/analiticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.analiticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/postanaliticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.postanaliticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

rutas.post("/listarexamen", async (req, res) => {
    if (req.body.examen.length > 0) {
        let c = 0
        let data = []
        try {
            req.body.examen.forEach(async id => {
                const result = await solicitud.listarExamen(id)

                c = c+1

                result.forEach(i => {
                    data.push(i.id)
                })

                if (req.body.examen.length === c) {
                    return res.json(data)
                }
                
            })

        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
})

rutas.post("/registrarS", sInsertar, async (req, res) => {

    // console.log(req.body)
    if (req.body.examen?.length > 0) {


        // console.log(codigoSol)
        const { fecha, hora, diagnostico, seguro, usuario, paciente } = req.body
        let ids = []
        try {

            let c = 0
            await req.body.examen.forEach(async id => {
                const datos = {
                    idItemServicio: id,
                    idSeguro: seguro,
                    idUsuarioSol: usuario,
                    idPaciente: paciente,
                    fecha,
                    diagnostico,
                    horaSol: hora
                }

                await solicitud.insertarS(datos)
                    .then(async j => {
                        ids.push(j[0].insertId)
                        let codigo = 'S-' + j[0].insertId + usuario
                        if (j.affectedRows !== 0) {
                            c++
                            if (req.body.examen.length === c) {
                                await solicitud.actualizarCodigo(ids, codigo)
                                return res.json({ codigo: codigo })
                            }
                        } else {
                            return res.json({ msg: 'REVISE BIEN LA INFORMACION' })
                        }
                    })
            })

        } catch (error) {
            console.log(error)
            return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
        }
    }
})


rutas.post("/actualizarS", sEditar, async (req, res) => {

    // console.log(req.body)}
    if (req.body.examen?.length > 0) {
        // console.log(codigoSol)
        const { codigoSol, fecha, hora, diagnostico, seguro, usuario, paciente } = req.body

        try {
            const result = await solicitud.eliminarS(codigoSol)
            // console.log(result)
            let c = 0
            if (result.affectedRows > 0) {
                await req.body.examen.forEach(id => {
                    const datos = {
                        idItemServicio: id,
                        idSeguro: seguro,
                        idUsuarioSol: usuario,
                        idPaciente: paciente,
                        codigoSol,
                        fecha,
                        diagnostico,
                        horaSol: hora
                    }
                    solicitud.insertarS(datos).then(j => {
                        if (j.affectedRows !== 0) {
                            c++
                            if (req.body.examen.length === c) {
                                solicitud.verSolicitud(codigoSol).then(data => {
                                    return res.json(data)
                                })
                            }
                        } else {
                            return res.json({ msg: 'REVISE BIEN LA INFORMACION' })
                        }
                    })
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
        }
    }
})


rutas.post("/eliminarS", sEliminar, async (req, res) => {
    try {
        const dato = req.body.codigoSol;
        solicitud.eliminarS(dato).then(x => {
            // console.log(x)
            if (x.affectedRows !== 0) {
                solicitud.listarS(req.body.usuario).then(data => {
                    return res.json(data)
                })
            }
            else {
                return res.json({ msg: 'REVISE BIEN LA INFORMACION' })
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }

})

rutas.post("/genInforme", informe, async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    const { codigoSol, fecha } = req.body
    const dato = {
        codigoSol, fecha
    }
    try {
        const resultado = await solicitud.generarInformeS(dato)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})












// ADIMINISTRADOR
rutas.post("/listarA", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.listarA()
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})

rutas.post("/ver", ver, async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.verSolicitud(req.body.dato)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})
rutas.post("/countA", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.countA()
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})

rutas.post("/autorizar", autorizar, async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    const { codigoSol, usuario, fecha } = req.body
    let dato = {
        codigoSol,
        usuario,
        fecha
    }
    // console.log(dato.codigoSol)
    try {
        const resultado = await solicitud.autorizarSolicitud(dato)
        // throw new error()
        // console.log('retorno despues de autorizar. ',resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})

rutas.post("/eliminarA", eliminarAdmin, async (req, res) => {
    // console.log(req.body)
    try {
        const { codigoSol, texto } = req.body;
        const datos = {
            codigoSol,
            observacion: texto
        }

        const result = await solicitud.eliminarA(datos)
        // console.log(result)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})



rutas.post("/buscarA", sBuscar, async (req, res) => {
    // console.log(req.body)
    const { dato } = req.body
    const dato1 = {
        dato,
    }
    try {
        const resultado = await solicitud.buscarA(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/buscarfechaA", buscarFecha, async (req, res) => {
    // console.log(req.body)
    const { fecha } = req.body
    const dato1 = {
        fecha,
    }
    try {
        const resultado = await solicitud.buscarFechaA(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/preanaliticoA", async (req, res) => {
    // console.log(req.body)

    try {
        const resultado = await solicitud.preanaliticoA()
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/analiticoA", async (req, res) => {
    // console.log(req.body)

    try {
        const resultado = await solicitud.analiticoA()
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/postanaliticoA", async (req, res) => {

    try {
        const resultado = await solicitud.postanaliticoA()
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77



rutas.post("/listarL", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.listarL(req.body.idServicio1)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})





rutas.post("/listarexamenL", async (req, res) => {
    console.log('datos alterados en la verificacion jjjjjj: ', req.body.array)
    if (req.body.array.length > 0) {
        try {
            let a = []
            let c = 0
            await req.body.array.map(async e => (

                await solicitud.listarExamen(e)
                    .then(async j => {
                        a.push(j)
                        c++
                        if (req.body.array.length === c) {

                            console.log(a, 'antes')
                            return res.json(a)
                        }
                    })
            ))

        } catch (error) {
            console.log(error)
            return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
        }
    }
})






rutas.post("/countL", async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.countL(req.body.idServicio1)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})



rutas.post("/buscarS", sBuscar, async (req, res) => {
    // console.log(req.body)
    const { dato, usuario } = req.body
    const dato1 = {
        dato,
        usuario
    }
    try {
        const resultado = await solicitud.buscarS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/buscarfechaS", buscarFecha, async (req, res) => {
    // console.log(req.body)
    const { fecha, usuario } = req.body
    const dato1 = {
        fecha,
        usuario
    }
    try {
        const resultado = await solicitud.buscarFechaS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/preanaliticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.preanaliticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/analiticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.analiticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})
rutas.post("/postanaliticoS", async (req, res) => {
    // console.log(req.body)
    const { usuario } = req.body
    const dato1 = {
        usuario
    }
    try {
        const resultado = await solicitud.postanaliticoS(dato1)
        // console.log(resultado)
        return res.json(resultado)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

})

rutas.post("/verL", ver, async (req, res) => {
    // console.log('datos alterados en la verificacion jjjjjj: ', req.body)
    try {
        const resultado = await solicitud.verSolicitudL(req.body.dato)
        // throw new error()
        // console.log(resultado)
        return res.json(resultado)
    } catch (error) {
        console.log(error)
        return res.json({ msg: 'INTENTE NUEVAMENTE MAS TARDE' })
    }
})
export default rutas;