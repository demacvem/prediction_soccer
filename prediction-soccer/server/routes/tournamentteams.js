'use strict'

const express = require('express');
const routes = express.Router();
const tournamentTeamsController = require('../controllers/tournamentteamsController');

routes.get('/', tournamentTeamsController.getAll);
routes.get('/:id', tournamentTeamsController.getById);
routes.post('/', tournamentTeamsController.create);
routes.put('/:id', tournamentTeamsController.update);
routes.delete('/:id', tournamentTeamsController.delete);

module.exports = routes;