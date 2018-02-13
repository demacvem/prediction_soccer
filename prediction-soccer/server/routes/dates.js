'use strict'

const express = require('express');
const routes = express.Router();
const datesController = require('../controllers/datesController');

routes.get('/', datesController.getAll);
routes.get('/:id', datesController.getById);
routes.post('/', datesController.create);
routes.put('/:id', datesController.update);
routes.delete('/:id', datesController.delete);

module.exports = routes;
