'use strict'

const express = require('express');
const routes = express.Router();
const permissionsController = require('../controllers/permissionsController');

routes.get('/', permissionsController.getAll);
routes.get('/actives', permissionsController.getActives);
routes.get('/:id', permissionsController.getById);
routes.post('/', permissionsController.create);
routes.put('/:id', permissionsController.update);
routes.delete('/:id', permissionsController.delete);

module.exports = routes;