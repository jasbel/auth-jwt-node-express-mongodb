const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
/** ver en JSON */
UserSchema.method('toJSON', function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

/** TODO: Averiguar porque la exportacion pasa por mongoose.model */
module.exports = model('User', UserSchema)