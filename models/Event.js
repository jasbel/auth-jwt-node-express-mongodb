const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    /* Estructura de los datos tipos, requerido y la llave(unique) */
    //     type: String,
    //     require: true,
    // },
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});
/** ver en JSON */
EventoSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

/** TODO: Averiguar porque la exportacion pasa por mongoose.model */
module.exports = model('Evento', EventoSchema )