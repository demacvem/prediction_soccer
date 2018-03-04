'use strict'

const express = require('express');
const routes = express.Router();
const matchesController = require('../controllers/matchesController');

routes.get('/', matchesController.getAll);
routes.get('/:id', matchesController.getById);
routes.post('/', matchesController.create);
routes.put('/:id', matchesController.update);
routes.delete('/:id', matchesController.delete);

module.exports = routes;