/**
 * Controlador para la autenticacion
 * @module controllers/auth
 * 
 * @todo Averigurar como funciona -> new Usuario(req.body);
 */

const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

/** response: para tener la intellisense a disposicion 
 * @function createUser
 * @param { object} req request: informacion enviada por el cliente
 * @param { object} res response: respuesta de la peticion hacia el cliente
 * @returns Responde si existe o no el usuario, reenvia los datos si todo se realizo correctamente
*/
const createUser = async (req, res = response) => {
  
  /** Desestructuracion del body */
  const { email, password } = req.body;

  try {

    /** mandara una peticion a mongodb retornando los datos o null */
    let user = await Usuario.findOne({ email });

    /** En caso que mongodb detecte un usuario con el mismo email alertara */
    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con ese correo',
      });
    }

    /* TODO: averiguar como funciona esta seccion */
    user = new Usuario(req.body);

    /** Encriptacion de contrasenia */
    const salt = bcrypt.genSaltSync(  );
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    /** 
     * Generar JWT al crear usuario {@link generateJWT} 
     * */
    const token = await generateJWT( user.id, user.name );

    /* Validacion de datos usando express.validator ver validate-fields */

    /** Responder a la peticion createUser */
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mwg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {

    let user = await Usuario.findOne({ email });

    /** si usuario no existe lanzar una advertencia */
    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'email incorrecto',
      });
    }

    /** Confirmar contrasenias, desencripta y compara valores */
    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password Incorrecto'
      });
    }

    /** Generar el JWT al loguearse {@link generateJWT} */
    const token = await generateJWT( user.id, user.name );

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mwg: "Por favor hable con el administrador",
    });
  }

};

const renewToken = async(req, res = response) => {

  const { uid, name } = req;

  /** Generar un nuevo JWT y retornar {@link generateJWT} */
  const token = await generateJWT( uid, name );

  /** Responder a la peticion de renovacion de token */
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
