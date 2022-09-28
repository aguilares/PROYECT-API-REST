
import pool from '../bdConfig.js'

export class HospitalSeguro {
    constructor(id, idSeguro, idHospital) {
        this._id = id;
        this._idSeguro = idSeguro;
        this._idHospital = idHospital;
    }
    //get
    get id() {
        return this._id 
    }

    get idSeguro() {
        return this._idSeguro
    }
    get idHospital() {
        return this._idHospital
    }

    //set
    set idHospital(idHospital) {
        this._idHospital = idHospital
    }

    set idSeguro(idSeguro) {
        this._idSeguro = idSeguro
    }


    // METODOS
    listar = async () => {
        const sql =
        `SELECT s.nombre as seguro, h.nombre as hospital FROM hospitalseguro hs 
        inner join hospital h on hs.idHospital = h.id
        inner join seguro s on hs.idSeguro = s.id`;
        const [rows] = await pool.query(sql)
        return rows
    }


    insertar = async (datos) => {
        const sqlExists =
            `SELECT * FROM hospitalseguro WHERE idSeguro = ${pool.escape(datos.idSeguro)}
            and idHospital = ${pool.escape(datos.idHospital)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const resultado = await pool.query("INSERT INTO hospitalseguro SET  ?", datos)
            return resultado
        } else {
            return {
                existe:1,
            }
        }
    }

    buscar = async (dato) => {
        const sql =
        `SELECT s.nombre as seguro, h.nombre as hospital FROM hospitalseguro hs 
        inner join hospital h on hs.idHospital = h.id
        inner join seguro s on hs.idSeguro = s.id WHERE s.nombre = ${pool.escape(dato)}`;
        const [rows] = await pool.query(sql)
        return rows
    }

    editar = async (datos) => {
        const sqlExists =
        `SELECT * FROM hospitalseguro WHERE idSeguro = ${pool.escape(datos.idSeguro)}
        and idHospital = ${pool.escape(datos.idHospital)}`;

        const [result] = await pool.query(sqlExists)

        if (result.length === 0) {
            const sql = `UPDATE hospitalseguro SET
            idSeguro = ${pool.escape(datos.idSeguro)},
            idHospital = ${pool.escape(datos.idHospital)},
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
        const sql = `delete from hospitalseguro 
        WHERE id =  ${pool.escape(id)}`;
        const [resultado] = await pool.query(sql)
        return resultado
    }
}