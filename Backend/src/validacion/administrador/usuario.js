import { check } from "express-validator"
import { validaciones } from "../headers.js"

export const insertar = [

    check('idServicio')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('idRol')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('username')
        .isLength({ min: 4 })
        .exists(),
    check('pass')
        .isLength({ min: 4 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellidoPaterno')
        .isLength({ min: 4 })
        .exists(),
    check('apellidoMaterno')
        .isLength({ min: 4 })
        .exists(),
    check('telefono')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .isString()
        .isLength({ min: 5, max: 100 }),
    check('creado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const editar = [
    check('id')
        .isLength({ min: 1 })
        .exists().isNumeric(),
    check('idServicio')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('idRol')
        .exists()
        .isLength({ min: 1 }).isNumeric(),
    check('pass')
        .isLength({ min: 4 })
        .exists(),
    check('nombre')
        .isLength({ min: 4 })
        .exists(),
    check('apellidoPaterno')
        .isLength({ min: 4 })
        .exists(),
    check('apellidoMaterno')
        .isLength({ min: 4 })
        .exists(),
    check('telefono')
        .exists()
        .isNumeric()
        .isLength({ min: 4, max: 25 }),
    check('direccion')
        .exists()
        .isString()
        .isLength({ min: 5, max: 100 }),
    check('modificado')
        .exists()
        .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    check('usuario')
        .exists()
        .isLength({ min: 1 }).isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const eliminar = [
    check('id').isLength({ min: 1 }).exists().isNumeric(),

    (req, res, next) => {
        validaciones(req, res, next)
    }
]

export const buscar = [
    check('dato').isLength({ min: 1 }).exists(),
    (req, res, next) => {
        validaciones(req, res, next)
    }
]

// buscar