
import pool from '../bdConfig.js'

export class Hospital {
    constructor(id, red, nombre, telefono, direccion) {
        this._id = id;
        this._red = red;
        this._nombre = nombre;
        this._telefono = telefono;
        this._direccion = direccion
    }
    //get
    get id() {
        return this._id
    }
    get red() {
        return this._red
    }
    get nombre() {
        return this._nombre
    }
    get telefono() {
        return this._telefono
    }
    get direccion() {
        return this._direccion
    }

    //set
    set red(red) {
        this._red = red
    }
    set nombre(nombre) {
        this._nombre = nombre
    }
    set telefono(telefono) {
        this._telefono = telefono
    }
    set direccion(direccion) {
        this._direccion = direccion
    }

    // METODOS
    listar = async () => {
        const [rows] = await pool.query("SELECT * FROM hospital")
        return rows
    }


    insertar = async (datos) => {
        const sqlExists =
            `SELECT * FROM hospital WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO hospital SET  ?", datos)
            return {
                ...datos,
                msg: "OPERACION EXITOSA",
                numeroHospital: resultado.insertId
            }
        } else {
            return {
                msg: "EL HOSPITAL YA ESTA REGISTRADO"
            }
        }
    }

    buscar = async (dato) => {
        const sql = `SELECT * FROM hospital WHERE nombre = ${pool.escape(dato)} 
        or red = ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    editar = async (datos) => {
        const sqlExists =
            `SELECT * FROM hospital WHERE nombre = ${pool.escape(datos.nombre)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            // const resultado = await pool.query("INSERT INTO hospital SET  ?", datos)
            const sql = `UPDATE hospital SET
            red = ${pool.escape(datos.red)},
            nombre = ${pool.escape(datos.nombre)},
            telefono = ${pool.escape(datos.telefono)},
            direccion = ${pool.escape(datos.direccion)}
            WHERE id = ${pool.escape(datos.id)}`;
            const [resultado] = await pool.query(sql);
            // console.log(result)
            return {
                ...datos,
                msg: "OPERACION EXITOSA",
                numeroHospital: resultado.insertId
            }
        } else {
            return {
                msg: "EL HOSPITAL YA ESTA REGISTRADO"
            }
        }
    }

    borrar = async (id) => {
        const sql = `DELETE FROM hospital WHERE id =  ${pool.escape(id)}`;
        const [resultado] = await pool.query(sql)
        return resultado
    }
}