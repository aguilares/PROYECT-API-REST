
import pool from './bdConfig.js'

export class Solicitud {
    constructor(
        id, idItemServicio, idSeguro, idUsuarioSol, idPaciente,
        codigoSol, fecha, nhc, diagnostico, horaSol, resultadoRecibido,

        idUsuarioAdmin, estado, fechaHoraAutorizacion, eliminar, fechaHoraEliminado,

        recibidoLab, idUsuarioLab, fechaRecLab, horaRecLab, numMuestra, fechaHoraGenInforme,
        fechaAnalisis, procedenciaMuestra, fechaHoraObtMuestra,
        numIdentificacionLab, resultado, interpretacionResLab, condicionMuestra,
        condicionPaciente, farmacosPaciente, observacionLab, fechaHoraPublicacionRes,
        publisher
    ) {
        /// SOLICITANTE
        this._id = id;
        this._idItemServicio = idItemServicio;
        this._idSeguro = idSeguro;
        this._idUsuarioSol = idUsuarioSol;
        this._idPaciente = idPaciente;
        this._codigoSol = codigoSol;
        this._fecha = fecha;
        this._nhc = nhc;
        this._diagnostico = diagnostico;
        this._horaSol = horaSol;
        this._resultadoRecibido = resultadoRecibido;

        // ADMINISTRADOR

        this._idUsuarioAdmin = idUsuarioAdmin;
        this._estado = estado;
        this._fechaHoraAutorizacion = fechaHoraAutorizacion;
        this._eliminar = eliminar;
        this._fechaHoraEliminado = fechaHoraEliminado;
        // LABORATORISTA
        this._recibidoLab = recibidoLab;
        this._idUsuarioLab = idUsuarioLab;
        this._fechaRecLab = fechaRecLab;
        this._horaRecLab = horaRecLab;
        this._numeroMuestra = numMuestra;
        this._fechaHoraGenInforme = fechaHoraGenInforme;
        this._fechaAnalisis = fechaAnalisis;
        this._procedenciaMuestra = procedenciaMuestra;
        this._fechaHoraObtMuestra = fechaHoraObtMuestra;
        this._numIdentificacionLab = numIdentificacionLab;
        this._resultado = resultado;
        this._interpretacionResLab = interpretacionResLab;
        this._condicionMuestra = condicionMuestra;
        this._condicionPaciente = condicionPaciente;
        this._farmacosPaciente = farmacosPaciente;
        this._observacionLab = observacionLab;
        this._fechaHoraPublicacion = fechaHoraPublicacionRes;
        this._publisher = publisher;
    }
    //get
    get id() {
        return this._id
    }

    get idItemServicio() {
        return this._idItemServicio
    }
    get idSeguro() {
        return this._idSeguro
    }

    get idUsuarioSol() {
        return this._idUsuarioSol
    }

    get idPaciente() {
        return this._idPaciente
    }

    get codigoSol() {
        return this._codigoSol
    }

    get fecha() {
        return this._fecha
    }

    get nhc() {
        return this._nhc
    }

    get diagnostico() {
        return this._diagnostico
    }

    get horaSol() {
        return this._horaSol
    }

    get resultadoRecibido() {
        return this._resultadoRecibido
    }

    get idUsuarioAdmin() {
        return this._idUsuarioAdmin
    }

    get estado() {
        return this._estado
    }

    get fechaHoraAutorizacion() {
        return this._fechaHoraAutorizacion
    }

    get eliminar() {
        return this._eliminar
    }
    get fechaHoraEliminado() {
        return this._fechaHoraEliminado
    }


    get recibidoLab() {
        return this._recibidoLab
    }

    get idUsuarioLab() {
        return this._idUsuarioLab
    }

    get fechaRecLab() {
        return this._fechaRecLab
    }

    get horaRecLab() {
        return this._horaRecLab
    }

    get numMuestra() {
        return this._numeroMuestra
    }

    get fechaHoraGenInforme() {
        return this._fechaHoraGenInforme
    }

    get fechaAnalisis() {
        return this._fechaAnalisis
    }

    get procedenciaMuestra() {
        return this._procedenciaMuestra
    }

    get fechaHoraObtMuestra() {
        return this._fechaHoraObtMuestra
    }

    get numIdentificacionLab() {
        return this._numIdentificacionLab
    }

    get resultado() {
        return this._resultado
    }

    get interpretacionResLab() {
        return this._interpretacionResLab
    }

    get condicionMuestra() {
        return this._condicionMuestra
    }

    get condicionPaciente() {
        return this._condicionPaciente
    }

    get farmacosPaciente() {
        return this._farmacosPaciente
    }

    get observacionLab() {
        return this._observacionLab
    }

    get fechaHoraPublicacionRes() {
        return this._fechaHoraPublicacion
    }

    get publisher() {
        return this._publisher
    }

    //set
    set idItemServicio(idItemServicio) {
        this._idItemServicio = idItemServicio
    }

    set idSeguro(idSeguro) {
        this._idSeguro = idSeguro
    }
    set idUsuarioSol(idUsuarioSol) {
        this._idUsuarioSol = idUsuarioSol
    }
    set idPaciente(idPaciente) {
        this._idPaciente = idPaciente
    }
    set codigoSol(codigoSol) {
        this._codigoSol = codigoSol
    }
    set fecha(fecha) {
        this._fecha = fecha
    }
    set nhc(nhc) {
        this._nhc = nhc
    }
    set diagnostico(diagnostico) {
        this._diagnostico = diagnostico
    }
    set horaSol(horaSol) {
        this._horaSol = horaSol
    }
    set resultadoRecibido(resultadoRecibido) {
        this._resultadoRecibido = resultadoRecibido
    }
    set idUsuarioAdmin(idUsuarioAdmin) {
        this._idUsuarioAdmin = idUsuarioAdmin
    }
    set estado(estado) {
        this._estado = estado
    }
    set fechaHoraAutorizacion(fechaHoraAutorizacion) {
        this._fechaHoraAutorizacion = fechaHoraAutorizacion
    }
    set eliminar(eliminar) {
        this._eliminar = eliminar
    }
    set fechaHoraEliminado(fechaHoraEliminado) {
        this._fechaHoraEliminado = fechaHoraEliminado
    }
    set recibidoLab(recibidoLab) {
        this._recibidoLab = recibidoLab
    }
    set idUsuarioLab(idUsuarioLab) {
        this._idUsuarioLab = idUsuarioLab
    }
    set fechaRecLab(fechaRecLab) {
        this._fechaRecLab = fechaRecLab
    }
    set horaRecLab(horaRecLab) {
        this._horaRecLab = horaRecLab
    }
    set numMuestra(numMuestra) {
        this._numeroMuestra = numMuestra
    }
    set fechaHoraGenInforme(fechaHoraGenInforme) {
        this._fechaHoraGenInforme = fechaHoraGenInforme
    }
    set fechaAnalisis(fechaAnalisis) {
        this._fechaAnalisis = fechaAnalisis
    }
    set procedenciaMuestra(procedenciaMuestra) {
        this._procedenciaMuestra = procedenciaMuestra
    }
    set fechaHoraObtMuestra(fechaHoraObtMuestra) {
        this._fechaHoraObtMuestra = fechaHoraObtMuestra
    }
    set numIdentificacionLab(numIdentificacionLab) {
        this._numIdentificacionLab = numIdentificacionLab
    }
    set resultado(resultado) {
        this._resultado = resultado
    }
    set interpretacionResLab(interpretacionResLab) {
        this._interpretacionResLab = interpretacionResLab
    }
    set condicionMuestra(condicionMuestra) {
        this._condicionMuestra = condicionMuestra
    }
    set condicionPaciente(condicionPaciente) {
        this.condicionPaciente = condicionPaciente
    }
    set farmacosPaciente(farmacosPaciente) {
        this._farmacosPaciente = farmacosPaciente
    }
    set observacionLab(observacionLab) {
        this._observacionLab = observacionLab
    }
    set fechaHoraPublicacionRes(fechaHoraPublicacionRes) {
        this._fechaHoraPublicacion = fechaHoraPublicacionRes
    }
    set publisher(publisher) {
        this._publisher = publisher
    }

    // METODOS SOLICITANTE
    // caso de uso listar Solicitud
    listarServicios = async () => {
        const sql =
            `select s.id, s.nombre from 
                servicio s 
                inner join area a on s.idArea = a.id
                where a.laboratorio = true`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarItemServicios = async (id) => {
        const sql =
            `select itm.id, itm.nombre as item from itemServicio itm 
            inner join servicio s on itm.idServicio = s.id
            inner join area a on s.idArea = a.id
            where a.laboratorio = true  and itm.encabezado = true and s.id = ${pool.escape(id)}`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarExamen = async (dato) => {
        const sql =
            `select id from itemservicio where codigo = (select codigo from itemservicio WHERE id = ${pool.escape(dato)})`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarS = async (dato) => {
        // console.log(dato)
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            WHERE s.fecha <= NOW() AND s.fecha >= date_add(NOW(), INTERVAL -51 DAY) and s.eliminar = false and 
            s.idUsuarioSol = ${pool.escape(dato)} and item.encabezado = 1
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }
    countS = async (dato) => {
        const sql =
            `SELECT estado FROM solicitud where eliminar = false and idUsuarioSol =  ${pool.escape(dato)} GROUP by codigoSol`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }

    buscarS = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemservicio ism on s.idItemServicio = ism.id
            where s.idUsuarioSol =${pool.escape(dato.usuario)}
            and s.eliminar = false and ism.encabezado = true
            and (s.codigoSol = ${pool.escape(dato.dato)}
            or p.nhc = ${pool.escape(dato.dato)}
            or p.ci = ${pool.escape(dato.dato)}
            or p.nombre = ${pool.escape(dato.dato)}
            or p.apellidoPaterno = ${pool.escape(dato.dato)}
            or p.apellidoMaterno = ${pool.escape(dato.dato)}
            or ism.nombre = ${pool.escape(dato.dato)})
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    buscarFechaS = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where s.idUsuarioSol =${pool.escape(dato.usuario)}
            and s.eliminar = false and item.encabezado = true
            and s.fecha = ${pool.escape(dato.fecha)}
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    preanaliticoS = async (dato) => {
        // console.log(dato)
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where s.idUsuarioSol =${pool.escape(dato.usuario)}
            and s.eliminar = false and item.encabezado = true
            and s.estado = 0
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }
    analiticoS = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where s.idUsuarioSol =${pool.escape(dato.usuario)}
            and s.eliminar = false and item.encabezado = true
            and s.estado = 1 and s.recibidolab = 1
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    postanaliticoS = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where s.idUsuarioSol =${pool.escape(dato.usuario)}
            and s.eliminar = false and item.encabezado = true
            and s.estado = 1 and s.recibidoLab = 1 and s.publisher = 1
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }




    insertarS = async (datos) => {
        // console.log(datos)
        const sqlExists = `SELECT * FROM solicitud WHERE codigoSol = ${pool.escape(datos.codigoSol)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO solicitud SET  ?", datos)
            return resultado
        } else {
            return {
                existe: 1,
            }
        }
    }
    actualizarCodigoS = async (datos) => {
        // console.log(datos)
        const sqlExists = `SELECT * FROM solicitud WHERE codigoSol = ${pool.escape(datos.codigoSol)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO solicitud SET  ?", datos)
            return resultado
        } else {
            return {
                existe: 1,
            }
        }
    }


    actualizarCodigo = async (id, codigo) => {
        // console.log('actualizando codigo: ', id, codigo)
        let c = 0
        id.forEach(async ids => {
            const sql = `UPDATE solicitud SET
            codigoSol = ${pool.escape(codigo)}
            WHERE id = ${pool.escape(ids)}`;
            await pool.query(sql)
                .then(async j => {
                    let afectados = j[0].affectedRows
                    if (afectados > 0) {
                        c++
                        if (id.length === c) {
                            return

                        }
                    }
                })

        })
    }



    eliminarS = async (dato) => {
        // console.log(dato)
        const sql = `delete from solicitud
        WHERE codigoSol =  ${pool.escape(dato)}
        and estado = false and recibidoLab = false and publisher = false`;
        const [resultado] = await pool.query(sql)
        return resultado
    }


    generarInformeS = async (dato) => {
        const sql =
            `SELECT s.id, s.fecha,
            upper(concat(p.nombre ,' ', p.apellidoPaterno, ' ', p.apellidoMaterno)) as paciente, p.nhc, 					p.fechaNac, p.sexo, 
			upper(concat(u.nombre," " ,u.apellidoPaterno," ", u.apellidoMaterno )) as solicitante,
            s.fechaHoraPublicacionRes, s.numIdentificacionLab,

            
            ism.nombre as prueba, ism.encabezado, ism.codigo,
            s.procedenciaMuestra, s.condicionMuestra,s.condicionPaciente,  s.interpretacionResLab, s.farmacosPaciente, s.observacionLab, 
			s.resultado, i.unidad,  i.intervalo, s.firma,i.metodologia


            FROM solicitud s 
            inner join itemServicio ism on s.idItemServicio = ism.id
            inner join paciente p on s.idPaciente = p.id
            inner join usuario u on s.idUsuarioSol = u.id
            inner join intervalo i on s.idIntervalo = i.id
            where s.codigoSol =  ${pool.escape(dato.codigoSol)}
        	and s.publisher = true order BY ism.encabezado DESC`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        if (rows.length > 0) {
            const sql = `UPDATE solicitud SET
            resultadoRecibido = true,
            fechaGenInforme = ${pool.escape(dato.fecha)}
            WHERE codigoSol = ${pool.escape(dato.codigoSol)}`;

            const [resultado] = await pool.query(sql);
            const sql_  = `Select red, nombre, direccion, telefono from hospital`;
            const hospital = await pool.query(sql_)
            if (resultado.affectedRows > 0) {
                return [rows, hospital]
            }
        }
    }










    verSolicitud = async (dato) => {
        // console.log('ver solicitud',dato)

        const sql =
            `SELECT  DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha, s.horaSol,
            idPaciente, p.ci,DATE_FORMAT(p.fechaNac, "%Y-%m-%d") as fechaNac, p.sexo,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,
            p.nhc, s.codigoSol,s.resultadoRecibido, s.estado, s.fechaHoraAutorizacion,
            s.recibidoLab,s.fechaRecLab,s.horaRecLab, s.fechaGenInforme,s.fechaHoraPublicacionRes, s.publisher,
            s.diagnostico,
            
            upper(concat(u.nombre, " ",u.apellidoPaterno, " " , u.apellidoMaterno)) as solicitante,
            item.id as idItemServicio, item.nombre as servicioSolicitado, item.encabezado,
            ser.id as idServicio, 
            seg.id as idSeguro, seg.nombre as seguro
            
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join usuario u on s.idUsuarioSol = u.id
            
            inner join itemservicio item on s.idItemServicio = item.id
            inner join servicio ser on item.idServicio = ser.id
            inner join seguro seg on s.idSeguro = seg.id
            WHERE s.codigoSol = ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)

        // console.log('model ver solitud. ',rows)
        return rows
    }































    // ADMINISTRADOR

    countA = async () => {
        const sql =
            `SELECT estado FROM solicitud where eliminar = false GROUP by codigoSol`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }


    listarA = async () => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on item.id = s.idItemServicio
            WHERE s.fecha <= NOW() AND s.fecha >= date_add(NOW(), INTERVAL -51 DAY) and s.eliminar = false and item.encabezado = true
            GROUP BY s.codigoSol order by s.id DESC;`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }

    autorizarSolicitud = async (dato) => {
        // console.log(dato)
        const sql = `UPDATE solicitud SET
        idUsuarioAdmin = ${pool.escape(dato.usuario)},

        estado = true,
        fechaHoraAutorizacion = ${pool.escape(dato.fecha)},        
        firma = "${dato.sello}"
        WHERE codigoSol = ${pool.escape(dato.codigoSol)}`;
        await pool.query(sql);
        // console.log(await this.verSolicitud(dato.codigoSol))
        return await this.verSolicitud(dato.codigoSol)
    }
    eliminarA = async (dato) => {
        // console.log(dato)
        const sql = `UPDATE solicitud SET
        idUsuarioAdmin = ${pool.escape(dato.usuario)},
        observacion = ${pool.escape(dato.observacion)},
        eliminar = true
        WHERE codigoSol = ${pool.escape(dato.codigoSol)}`;
        await pool.query(sql);
        // console.log(await this.verSolicitud(dato.codigoSol))
        return await this.listarA()
    }


    buscarA = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemservicio ism on s.idItemServicio = ism.id
            where  s.eliminar = false and ism.encabezado = true
            and (s.codigoSol = ${pool.escape(dato.dato)}
            or p.nhc = ${pool.escape(dato.dato)}
            or p.ci = ${pool.escape(dato.dato)}
            or p.nombre = ${pool.escape(dato.dato)}
            or p.apellidoPaterno = ${pool.escape(dato.dato)}
            or p.apellidoMaterno = ${pool.escape(dato.dato)}
            or ism.nombre = ${pool.escape(dato.dato)})
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    buscarFechaA = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where  s.eliminar = false and item.encabezado = true
            and s.fecha = ${pool.escape(dato.fecha)}
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    preanaliticoA = async () => {
        // console.log(dato)
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where  s.eliminar = false and item.encabezado = true
            and s.estado = 0
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }
    analiticoA = async () => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where s.eliminar = false and item.encabezado = true
            and s.estado = 1 and s.recibidolab = 1
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    postanaliticoA = async () => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
            p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join itemServicio item on s.idItemServicio = item.id
            where 
             s.eliminar = false and item.encabezado = true
            and s.estado = 1 and s.recibidoLab = 1 and s.publisher = 1
            GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }





    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    listarL = async (servicio) => {
        // console.log(dato)
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol,s.estado, s.recibidoLab, s.resultadoRecibido
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio item on s.idItemServicio = item.id
        inner join servicio se on item.idServicio = se.id
        WHERE s.eliminar = false and 
        se.id = ${pool.escape(servicio)}  and item.encabezado = true and s.estado = 1
        GROUP BY s.codigoSol order by s.id DESC  LIMIT 10`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }
    countL = async (dato) => {
        const sql =
            `SELECT estado FROM solicitud s 
            inner join itemservicio item on s.idItemServicio = item.id 
            inner join servicio se on item.idServicio = se.id 
            WHERE s.eliminar = FALSE AND se.id = ${pool.escape(dato)}
            GROUP BY s.codigoSol`;
        const [rows] = await pool.query(sql)
        // console.log(rows)
        return rows
    }

    buscarL = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol, s.resultadoRecibido, s.estado,s.recibidoLab
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio ism on s.idItemServicio = ism.id
        where s.idUsuarioSol =${pool.escape(dato.usuario)}
        and s.eliminar = false and item.encabezado = true
        and (s.codigoSol = ${pool.escape(dato.dato)}
        or p.nhc = ${pool.escape(dato.dato)}
        or p.ci = ${pool.escape(dato.dato)}
        or p.nombre = ${pool.escape(dato.dato)}
        or p.apellidoPaterno = ${pool.escape(dato.dato)}
        or p.apellidoMaterno = ${pool.escape(dato.dato)}
        or ism.nombre = ${pool.escape(dato.dato)})
        GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    buscarFechaL = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol,s.resultadoRecibido, s.estado,s.recibidoLab
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio ism on s.idItemServicio = ism.id
        where s.idUsuarioSol =${pool.escape(dato.usuario)}
        and s.eliminar = false and item.encabezado = true
        and s.fecha = ${pool.escape(dato.fecha)}
        GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }


    preanaliticoL = async (dato) => {
        // console.log(dato)
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol, s.estado, s.recibidoLab, s.resultadoRecibido
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio ism on s.idItemServicio = ism.id
        where s.idUsuarioSol =${pool.escape(dato.usuario)}
        and s.eliminar = false and item.encabezado = true
        and s.estado = 0
        GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }
    analiticoL = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol, s.estado, s.recibidoLab, s.resultadoRecibido
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio ism on s.idItemServicio = ism.id
        where s.idUsuarioSol =${pool.escape(dato.usuario)}
        and s.eliminar = false and item.encabezado = true
        and s.estado = 1 and s.recibidolab = 1
        GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }

    postanaliticoL = async (dato) => {
        const sql =
            `SELECT  COUNT(*) as cantidad, s.id,DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha,p.ci,
        upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente,s.diagnostico,
        p.nhc,s.codigoSol, s.estado, s.recibidoLab, s.resultadoRecibido
        FROM solicitud s 
        inner join paciente p on s.idPaciente = p.id
        inner join itemservicio ism on s.idItemServicio = ism.id
        where s.idUsuarioSol =${pool.escape(dato.usuario)}
        and s.eliminar = false and item.encabezado = true
        and s.estado = 1 and s.recibidoLab = 1 and s.publisher = 1
        GROUP BY s.codigoSol order by s.id DESC`;
        const [rows] = await pool.query(sql)
        return rows
    }



    verSolicitudL = async (dato) => {
        // console.log('ver solicitud',dato)

        const sql =
            `SELECT i.id as intervalo,i.descripcion, s.id, DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha, s.horaSol,
            idPaciente, p.ci,DATE_FORMAT(p.fechaNac, "%Y-%m-%d") as fechaNac, p.sexo,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente, p.ci,
            p.nhc, s.codigoSol,s.resultadoRecibido,  s.fechaHoraAutorizacion,
            s.fechaRecLab,s.horaRecLab, s.fechaGenInforme,s.fechaHoraPublicacionRes, s.publisher,s.resultadoRecibido,
            s.diagnostico,
            
            upper(concat(u.nombre, " ",u.apellidoPaterno, " " , u.apellidoMaterno)) as solicitante,
            item.id as idItemServicio, item.nombre as servicioSolicitado, item.encabezado, item.codigo,
            ser.id as idServicio, 
            seg.id as idSeguro, seg.nombre as seguro,
            s.numMuestra, s.procedenciaMuestra, s.fechaHoraObtMuestra, s.numIdentificacionLab,
            s.resultado, s.interpretacionResLab, s.condicionMuestra, s.	condicionPaciente,
            s.farmacosPaciente, s.observacionLab, s.fechaAnalisis,
            se.nombre as servicio
            
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join usuario u on s.idUsuarioSol = u.id
            
            inner join itemservicio item on s.idItemServicio = item.id
            inner join servicio ser on item.idServicio = ser.id
            inner join seguro seg on s.idSeguro = seg.id
            inner join servicio se on item.idServicio = se.id
            LEFT join  intervalo i on s.idIntervalo = i.id
            WHERE s.codigoSol = ${pool.escape(dato)} order by s.id ASC`;
        const [rows] = await pool.query(sql)
    //   console.log(rows,'modelo')
        return rows
    }

    verSolicitudUpdate = async (dato) => {
        // console.log('ver solicitud',dato)

        const sql =
            `SELECT i.id as intervalo,i.descripcion, s.id, DATE_FORMAT(s.fecha, "%Y-%m-%d") as fecha, s.horaSol,
            idPaciente, p.ci,DATE_FORMAT(p.fechaNac, "%Y-%m-%d") as fechaNac, p.sexo,
            upper(concat(p.nombre, " ",p.apellidoPaterno, " " , p.apellidoMaterno)) as paciente, p.ci,
            p.nhc, s.codigoSol,s.resultadoRecibido,  s.fechaHoraAutorizacion,
            s.fechaRecLab,s.horaRecLab, s.fechaGenInforme,s.fechaHoraPublicacionRes, s.publisher,s.resultadoRecibido,
            s.diagnostico,
            
            upper(concat(u.nombre, " ",u.apellidoPaterno, " " , u.apellidoMaterno)) as solicitante,
            item.id as idItemServicio, item.nombre as servicioSolicitado, item.encabezado, item.codigo,
            ser.id as idServicio, 
            seg.id as idSeguro, seg.nombre as seguro,
            s.numMuestra, s.procedenciaMuestra, s.fechaHoraObtMuestra, s.numIdentificacionLab,
            s.resultado, s.interpretacionResLab, s.condicionMuestra, s.	condicionPaciente,
            s.farmacosPaciente, s.observacionLab, s.fechaAnalisis,
            se.nombre as servicio
            
            FROM solicitud s 
            inner join paciente p on s.idPaciente = p.id
            inner join usuario u on s.idUsuarioSol = u.id
            
            inner join itemservicio item on s.idItemServicio = item.id
            inner join servicio ser on item.idServicio = ser.id
            inner join seguro seg on s.idSeguro = seg.id
            inner join servicio se on item.idServicio = se.id
            LEFT join  intervalo i on s.idIntervalo = i.id
            WHERE s.codigoSol = ${pool.escape(dato.codigoSol)} order by s.id ASC`;
        const [rows] = await pool.query(sql)
        if(rows.length>0){
            const sql = `UPDATE solicitud SET
            recibidoLab = true,
            idUsuarioLab  = ${pool.escape(dato.usuario)},
            fechaRecLab = ${pool.escape(dato.fecha)},
            horaRecLab = ${pool.escape(dato.fecha)}
            WHERE codigoSol = ${pool.escape(dato.codigoSol)}`;

            const [resultado] = await pool.query(sql);
            if (resultado.affectedRows > 0) {
                return rows
            }
        }
    }

    guardarResutados = async (solicitud, usuario, fechaHoraPublicacionRes) => {

        const sql = `UPDATE solicitud SET
            idUsuarioLab  = ${pool.escape(usuario)},
            idIntervalo = ${pool.escape(solicitud.intervalo)},
            numMuestra = ${pool.escape(solicitud.numMuestra)},
            fechaAnalisis = ${pool.escape(solicitud.fechaAnalisis)},
            procedenciaMuestra = ${pool.escape(solicitud.procedenciaMuestra)},
            numIdentificacionLab = ${pool.escape(solicitud.numIdentificacionLab)},
            resultado = ${pool.escape(solicitud.resultado)},
            interpretacionResLab = ${pool.escape(solicitud.interpretacionResLab)},
            condicionMuestra = ${pool.escape(solicitud.condicionMuestra)},
            condicionPaciente = ${pool.escape(solicitud.condicionPaciente)},
            farmacosPaciente = ${pool.escape(solicitud.farmacosPaciente)},
            observacionLab = ${pool.escape(solicitud.observacionLab)},
            fechaHoraPublicacionRes = ${pool.escape(fechaHoraPublicacionRes)},
            publisher = true
            WHERE id = ${pool.escape(solicitud.id)} and resultadoRecibido = false`;
        const final = await pool.query(sql);
        return final
    }


}
