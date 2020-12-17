const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    /** firma los datos de una carga y envia con su llave  */
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {

        /* Si hay un error */
        if (err) {
          console.error(error);
          reject("No se pudo generar el token");
        }

        /* Si todo sale como se esperaba */
        resolve( token );

      }
    );
  });
};

module.exports = {
  generateJWT,
};
