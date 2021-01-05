const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    /* Estructura de los datos tipos, requerido y la llave(unique) */
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

/** TODO: Averiguar porque la exportacion pasa por mongoose.model */
module.exports = model('Usuario', UsuarioSchema )