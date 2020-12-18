const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    /* Estructura de los datos tipos, requerido y la llave(unique) */
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

/** TODO: Averiguar porque la exportacion pasa por mongoose.model */
module.exports = model('Usuario', UsuarioSchema )