
import pool from '../bdConfig.js'

export class ItemServicio {
    constructor(id, idServicio, nombre) {
        this._id = id;
        this._idServicio = idServicio;
        this._nombre = nombre;
    }
    //get
    get id() {
        return this._id 
    }

    get idServicio() {
        return this._idServicio
    }
    get nombre() {
        return this._nombre
    }

    //set
    set idServicio(idServicio) {
        this._idServicio = idServicio
    }

    set nombre(nombre) {
        this._nombre = nombre
    }


    // METODOS
    listar = async () => {
        const sql =
        `SELECT ise.id, ise.nombre as itemservicio,s.nombre as servicio 
        FROM itemservicio ise inner join servicio s on ise.idServicio = s.id`;
        const [rows] = await pool.query(sql)
        return rows
    }


    insertar = async (datos) => {
        const sqlExists =`SELECT * FROM itemservicio WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO itemservicio SET  ?", datos)
            return resultado
        } else {
            return {
                existe:1,
            }
        }
    }

    buscar = async (dato) => {
        const sql =
        `SELECT ise.id, ise.nombre as itemservicio,s.nombre as servicio FROM itemservicio ise
        inner join servicio s on ise.idServicio = s.id where ise.nombre =${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    editar = async (datos) => {
        const sqlExists =
        `SELECT * FROM itemservicio WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const sql = `UPDATE itemservicio SET
            idServicio = ${pool.escape(datos.idServicio)},
            nombre = ${pool.escape(datos.nombre)},
            modificado = ${pool.escape(datos.modificado)},
            usuario = ${pool.escape(datos.usuario)}
            WHERE id = ${pool.escape(datos.id)}`;

            const [resultado] = await pool.query(sql);
            if(resultado.affectedRows === 0){
                return {
                    existe:0
                }
            }
            return resultado
        } else {
            return {
                existe:1,
            }
        }
    }

    borrar = async (id) => {
        const sql = `delete from itemservicio 
        WHERE id =  ${pool.escape(id)}`;
        const [resultado] = await pool.query(sql)
        return resultado
    }
}