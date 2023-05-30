
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../../middlewares/validate-fields');
const { validateJWT } = require('../../middlewares/validate-jwt');
const userController = require('../user/user.controller');

const router = Router();

/** validacion jwt, de esta linea para abajo */
router.use(validateJWT);

router.post(
    '/',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    userController.createUser
);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
