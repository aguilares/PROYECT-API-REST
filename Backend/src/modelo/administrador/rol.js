
import pool from '../bdConfig.js'

export class Rol {
    constructor(id, nombre, numero) {
        this._id = id;
        this._nombre = nombre;
        this._numero = numero
    }
    //get
    get id() {
        return this._id
    }

    get nombre() {
        return this._nombre
    }
    get numero() {
        return this._numero
    }

    //set

    set nombre(nombre) {
        this._nombre = nombre
    }
    set numero(numero) {
        this._numero = numero
    }

    // METODOS
    listar = async () => {
        const sql =
            `SELECT id, nombre, numero FROM rol`;
        const [rows] = await pool.query(sql)
        return rows
    }


    insertar = async (datos) => {
        const sqlExists1 =
            `SELECT * FROM rol WHERE 
            nombre = ${pool.escape(datos.nombre)}`;
        const [result1] = await pool.query(sqlExists1)

        if (result1.length === 0) {

            const sqlExists2 = `SELECT * FROM rol WHERE 
            numero = ${pool.escape(datos.numero)}`;
            const [result2] = await pool.query(sqlExists2)

            if (result2.length === 0) {
                const resultado = await pool.query("INSERT INTO rol SET  ?", datos)
                return resultado
            }
            else {
                return {
                    existe: 1
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
            `SELECT id, nombre, numero from rol where nombre =  ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    editar = async (datos) => {

        const sqlExists =
            `SELECT * FROM rol WHERE 
            nombre = ${pool.escape(datos.nombre)}
            and id != ${pool.escape(datos.id)}`;
        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const sqlExists1 =
                `SELECT * FROM rol WHERE 
            numero = ${pool.escape(datos.numero)}
            and id != ${pool.escape(datos.id)}`;

            const [result1] = await pool.query(sqlExists1)

            if (result1.length === 0) {
                const sql = `UPDATE rol SET
                nombre = ${pool.escape(datos.nombre)},
                numero=${pool.escape(datos.numero)},
                modificado = ${pool.escape(datos.modificado)},
                usuario = ${pool.escape(datos.usuario)}
                WHERE id = ${pool.escape(datos.id)}`;

                const [resultado] = await pool.query(sql);
                return resultado
            }
            else{
                return{
                    existe:1
                }
            }

        } else {
            return {
                existe: 2,
            }
        }
    }

    borrar = async (id) => {
        const sql = `delete from rol
        WHERE id =  ${pool.escape(id)}`;
        const [resultado] = await pool.query(sql)
        return resultado
    }
}