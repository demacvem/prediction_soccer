'use strict'

const express = require('express');
const routes = express.Router();
const tournamentGroupsController = require('../controllers/tournamentGroupsController');

routes.get('/', tournamentGroupsController.getAll);
routes.get('/:id', tournamentGroupsController.getById);
routes.post('/', tournamentGroupsController.create);
routes.put('/:id', tournamentGroupsController.update);
routes.delete('/:id', tournamentGroupsController.delete);

module.exports = routes;