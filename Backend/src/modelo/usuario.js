
import pool from './bdConfig.js'

export class Usuario {
    constructor(id, idServicio, idRol, username, pass, nombre, apellidoPaterno, apellidoMaterno, telefono, direccion) {
        this._id = id;
        this._idServicio = idServicio;
        this._idRol = idRol;
        this._username = username;
        this._pass = pass;
        this._nombre = nombre;
        this._apellidoPaterno = apellidoPaterno;
        this._apellidoMaterno = apellidoMaterno;
        this._telefono = telefono;
        this._direccion = direccion;
    }
    //get
    get id() {
        return this._id
    }

    get idServicio() {
        return this._idServicio
    }

    get idRol() {
        return this._idRol
    }

    get username() {
        return this._username
    }
    get pass() {
        return this._pass
    }
    get nombre() {
        return this._nombre
    }
    get apellidoPaterno() {
        return this._apellidoPaterno
    }
    get apellidoMaterno() {
        return this._apellidoMaterno
    }
    get telefono() {
        return this._telefono
    }
    get direccion() {
        return this._direccion
    }


    //set
    set idServicio(idServicio) {
        this._idServicio = idServicio
    }

    set idRol(idRol) {
        this._idRol = idRol
    }

    set username(username) {
        this._username = username
    }

    set pass(pass) {
        this._pass = pass
    }

    set nombre(nombre) {
        this._nombre = nombre
    }

    set apellidoPaterno(apellidoPaterno) {
        this._apellidoPaterno = apellidoPaterno
    }

    set apellidoMaterno(apellidoMaterno) {
        this._apellidoMaterno = apellidoMaterno
    }
    set telefono(telefono) {
        this._telefono = telefono
    }

    set direccion(direccion) {
        this._direccion = direccion
    }

    // METODOS

    nuevos = async () => {
        const sql =
            `SELECT id,  username, ci, nombre, apellidoPaterno, 
            apellidoMaterno,telefono, direccion
            from usuario where validar = false ORDER by id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }

    listarSiguienteNuevos = async (id) => {
        const sql =
            `SELECT id,  username, ci, nombre, apellidoPaterno, 
            apellidoMaterno,telefono, direccion
            from usuario where validar = false and id<${pool.escape(id)} ORDER by id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }





    listar = async () => {
        const sql =
            `SELECT u.id,  s.id as idServicio,s.nombre as servicio, r.id as idRol,
            r.nombre as rol,  u.username, u.ci, u.nombre, u.apellidoPaterno, 
            u.apellidoMaterno,u.telefono, u.direccion
            from usuario u inner join servicio s on u.idServicio = s.id
            inner join rol r on u.idRol = r.id where u.validar = true ORDER by u.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }


    listarSiguiente = async (id) => {

        const sql =
            `SELECT u.id,  s.id as idServicio,s.nombre as servicio, r.id as idRol,
        r.nombre as rol,  u.username, u.ci, u.nombre, u.apellidoPaterno, 
        u.apellidoMaterno,u.telefono, u.direccion
        from usuario u inner join servicio s on u.idServicio = s.id
        inner join rol r on u.idRol = r.id where u.validar = true and u.id<${pool.escape(id)} ORDER by u.id DESC limit 8`;
        const [rows] = await pool.query(sql)
        return rows
    }



    listarRol = async () => {
        const sql =
            `SELECT id,nombre from rol`;
        const [rows] = await pool.query(sql)
        return rows
    }



    insertar = async (datos) => {

        const sqlexisteusername =
            `SELECT username from usuario where
        username = ${pool.escape(datos.username)}`;
        const [rows] = await pool.query(sqlexisteusername)

        if (rows.length === 0) {

            const sqlExistsUsuario = `SELECT * FROM usuario WHERE 
            ci = ${pool.escape(datos.ci)} `;
            const [result] = await pool.query(sqlExistsUsuario)

            if (result.length === 0) {
                const resultado = await pool.query("INSERT INTO usuario SET  ?", datos)
                return resultado
            } else {
                return {
                    existe: 1,
                }
            }
        } else {
            return {
                existe: 2,
            }
        }
    }

    buscar = async (dato) => {
        const sql =
            `SELECT id, ci, nombre, apellidoPaterno, 
            apellidoMaterno, telefono, direccion
            from usuario WHERE 
            nombre = ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }
    actulizarDatosGenerales = async (datos) => {
        const sqlExists = `SELECT * FROM usuario WHERE 
            ci = ${pool.escape(datos.ci)} 
            and id !=${pool.escape(datos.id)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const sql = `UPDATE usuario SET
                idServicio = ${pool.escape(datos.idServicio)},
                idRol = ${pool.escape(datos.idRol)},
                pass = ${pool.escape(datos.pass)},
                ci = ${pool.escape(datos.ci)},
                nombre = ${pool.escape(datos.nombre)},
                apellidoPaterno = ${pool.escape(datos.apellidoPaterno)},
                apellidoMaterno = ${pool.escape(datos.apellidoMaterno)},
                telefono= ${pool.escape(datos.telefono)},
                direccion = ${pool.escape(datos.direccion)},
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;

            const [resultado] = await pool.query(sql);
            return resultado
        } else {
            return {
                existe: 1,
            }
        }
    }


    actualizarRolServicios = async (datos) => {

        console.log(datos)
        const sql = `UPDATE usuario SET
                idServicio = ${pool.escape(datos.idServicios)},
                idRol = ${pool.escape(datos.idRol)},
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;
        const result = await pool.query(sql)
        console.log(result[0].affectedRows, 'datos rpimer result')
        if (result[0].affectedRows === 1) {
            console.log('ntro aqui')
            const ssql = `delete from sessiones
            WHERE idUsuario = ${pool.escape(datos.id)}`;
            const resultado = await pool.query(ssql)
            if (resultado[0].affectedRows === 1) {
                return await this.listar()
            }
        }

    }

    validar = async (datos) => {
        const sql = `UPDATE usuario SET
            idServicio = ${pool.escape(datos.idServicios)},
            idRol = ${pool.escape(datos.idRol)},
            validar = true,
            modificado = ${pool.escape(datos.modificado)},
            usuario = ${pool.escape(datos.usuario)}
            WHERE id = ${pool.escape(datos.id)}`;
        await pool.query(sql)
        return await this.nuevos()
    }

    eliminar = async (id) => {
        const sql = `delete from usuario
        WHERE id =  ${pool.escape(id)}`;
        await pool.query(sql)
        return await this.listar()
    }
    eliminarNuevos = async (id) => {
        const sql = `delete from usuario
        WHERE id =  ${pool.escape(id)}`;
        await pool.query(sql)
        return await this.nuevos()
    }
}