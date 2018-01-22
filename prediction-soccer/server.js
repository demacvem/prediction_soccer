'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.DB, { useMongoClient: true })
    .then(data => {
        console.log("Conexion a la base de datos establecida");
        app.listen(config.PORT, () => {
            console.log(`Api rest corriendo en localhost:${config.PORT}`);
        });
    })
    .catch(err => console.log(`Ha ocurrido un error al conectar con MongoDB ${err}`));

    mongoose.Promise = global.Promise;

