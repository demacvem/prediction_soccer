'use strict'

const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Probando ruta'});
});

module.exports = routes;