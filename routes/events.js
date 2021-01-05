/**
 * Event Routes
 * /api/events/
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

/** validacion jwt, de esta linea para abajo */
router.use( validateJWT );

/** Obtencion de eventos, antes deven ser validados por jwt,  */
router.get('/', getEventos );

/** Crear un nuevo evento */
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es Obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es Obligatorio').custom( isDate ),
        validateFields
    ],
    crearEvento
);

/** Actualizar evento */
router.put('/:id', actualizarEvento);


/** Borrar evento */
router.delete('/:id', eliminarEvento);

module.exports = router;
