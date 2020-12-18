/**
 * Validacion de los datos enviados por el usuario antes de  correr el codigo del servidor, Validacion de los campos enviados
 * @module middleware/validate-fiels
*/

const { response } = require('express');
const { validationResult } = require('express-validator');

/** Funcion para validar campos */
const validateFields= (req, res = response, next) => {

    /** Manejo de errores, verificacion antes de retornar datos */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next();
}

module.exports = {
    validateFields,
}