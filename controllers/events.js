const { response } = require('express');
const Evento = require('../models/Event');

const getEventos = async ( req, res = response ) => {

    /** Evento.find buscara todos los eventos
     * populate devuelve los valores del documento (user) y como segundo parametros mostrar como se requiera*/
    const eventos = await Evento.find()
        .populate('user','name');

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async ( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventSave = await evento.save()

        res.json({
            ok: true,
            evento: eventSave
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Comuniquece con el Administrador'
        })
    }
}

const actualizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        // console.log(eventoId)
        
        /** Verificando que el id es buscado y encontrado */
        const evento = await Evento.findById( eventoId )

        if (!evento) {
            return  res.status(404).json({
                ok: false,
                msg: 'Evento no existente por el id'
            })
        }

        /** un usuario diferente no puede modificar el evento */
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        /** modificar el documento con el id especificado, e; 3er valor indica que devuelva con el documento ya actualizado */
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {

        //TODO: Mejorar este codigo implemente la hora y archivo que fallo para guardarlo en algun lugar, como consolog
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
        })
    }

}

const eliminarEvento = async ( req, res = response ) => {

    /** ID del evento */
    const eventoId = req.params.id;
    /** Id del usuario */
    const uid = req.uid;

    try {
        /** Verificar si el evento existe */
        const evento = await Evento.findById( eventoId )

        /** en caso de que el evento no existiera */
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existente por el id'
            })
        }

        /** un usuario diferente no puede eliminar el evento */
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Eliminar este evento'
            });
        }
        /** modificar el documento con el id especificado, e; 3er valor indica que devuelva con el documento ya actualizado */
        const eventoDelete = await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
        });

    } catch (error) {

        //TODO: Mejorar este codigo implemente la hora y archivo que fallo para guardarlo en algun lugar, como consolog
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
        })
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}
