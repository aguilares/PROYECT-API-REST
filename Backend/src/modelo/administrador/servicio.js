
import pool from '../bdConfig.js'

export class Servicio {
    constructor(id, idArea, nombre) {
        this._id = id;
        this._idArea = idArea;
        this._nombre = nombre;
    }
    //get
    get id() {
        return this._id 
    }

    get idArea() {
        return this._idArea
    }
    get nombre() {
        return this._nombre
    }

    //set
    set idArea(idArea) {
        this._idArea = idArea
    }

    set nombre(nombre) {
        this._nombre = nombre
    }


    // METODOS
    listar = async () => {
        const sql =
        `SELECT s.id, s.nombre as servicio,a.nombre as area FROM servicio s 
        inner join area a on s.idArea = a.id`;
        const [rows] = await pool.query(sql)
        return rows
    }


    insertar = async (datos) => {
        const sqlExists =`SELECT * FROM servicio WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO servicio SET  ?", datos)
            return resultado
        } else {
            return {
                existe:1,
            }
        }
    }

    buscar = async (dato) => {
        const sql =
        `SELECT s.id, s.nombre as servicio, a.nombre as area FROM servicio s 
        inner join area a on s.idArea = a.id where s.nombre =${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    editar = async (datos) => {
        const sqlExists =
        `SELECT * FROM servicio WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const sql = `UPDATE servicio SET
            idArea = ${pool.escape(datos.idArea)},
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
        const sql = `delete from servicio 
        WHERE id =  ${pool.escape(id)}`;
        const [resultado] = await pool.query(sql)
        return resultado
    }
}