/**
 * Archivo principal
 * @module indexjs
 * @todo add CRUD: eventos
 */

/** Creacion del servidor express */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
// const jwt = require('express-jwt');


const app = express();

/** Base de Datos */
dbConnection();

/** Capa de Seguridad mas */
app.use(cors())

/** Directorio Publico (middleware)*/
app.use( express.static('public') );


/** Lectura y parseo del Body: mandar datos desde cliente */
app.use( express.json() );


/** Rutas : Autenticacion */
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/events/', require('./routes/events'));


// TODO: CRUD: eventos


 /** Escuchar el puerto */
 app.listen(process.env.PORT, () => {
     console.log(`Server corriendo en el puerto ${ 4000 } `);
 });

